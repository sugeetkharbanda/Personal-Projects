from pathlib import Path
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.inspection import permutation_importance
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    RocCurveDisplay,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "data" / "raw" / "HR Analysis Dataset.csv"
OUTPUT_FIGURES = PROJECT_ROOT / "outputs" / "figures"
OUTPUT_TABLES = PROJECT_ROOT / "outputs" / "tables"
OUTPUT_FIGURES.mkdir(parents=True, exist_ok=True)
OUTPUT_TABLES.mkdir(parents=True, exist_ok=True)


def clean_currency(series: pd.Series) -> pd.Series:
    return (
        series.astype(str)
        .str.replace(r"[^0-9.\-]", "", regex=True)
        .replace("", np.nan)
        .astype(float)
    )


def load_and_clean_data(path: Path = DATA_PATH) -> pd.DataFrame:
    df = pd.read_csv(path)

    currency_columns = ["DailyRate", "HourlyRate", "MonthlyIncome", "MonthlyRate"]
    for col in currency_columns:
        if col in df.columns:
            df[col] = clean_currency(df[col])

    if "YearsWithCurrManager" in df.columns:
        df["YearsWithCurrManager"] = df["YearsWithCurrManager"].fillna(df["YearsWithCurrManager"].median())

    return df


def build_pipeline(X: pd.DataFrame) -> Pipeline:
    categorical_columns = X.select_dtypes(include="object").columns.tolist()
    numeric_columns = [col for col in X.columns if col not in categorical_columns]

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "num",
                Pipeline(
                    steps=[
                        ("imputer", SimpleImputer(strategy="median")),
                        ("scaler", StandardScaler()),
                    ]
                ),
                numeric_columns,
            ),
            (
                "cat",
                Pipeline(
                    steps=[
                        ("imputer", SimpleImputer(strategy="most_frequent")),
                        ("encoder", OneHotEncoder(handle_unknown="ignore")),
                    ]
                ),
                categorical_columns,
            ),
        ]
    )

    model = LogisticRegression(
        max_iter=3000,
        class_weight="balanced",
        random_state=42,
    )

    return Pipeline(steps=[("preprocessor", preprocessor), ("model", model)])


def save_attrition_rate_chart(df: pd.DataFrame) -> None:
    attrition_rate = (
        df.groupby("OverTime")["Attrition"]
        .apply(lambda x: (x == "Yes").mean() * 100)
        .sort_values(ascending=False)
    )
    ax = attrition_rate.plot(kind="bar", figsize=(8, 5))
    ax.set_title("Attrition Rate by Overtime Status")
    ax.set_xlabel("OverTime")
    ax.set_ylabel("Attrition Rate (%)")
    plt.tight_layout()
    plt.savefig(OUTPUT_FIGURES / "attrition_rate_by_overtime.png", dpi=300)
    plt.close()

    income_by_attrition = df.groupby("Attrition")["MonthlyIncome"].median().sort_values()
    ax = income_by_attrition.plot(kind="bar", figsize=(8, 5))
    ax.set_title("Median Monthly Income by Attrition")
    ax.set_xlabel("Attrition")
    ax.set_ylabel("Median Monthly Income")
    plt.tight_layout()
    plt.savefig(OUTPUT_FIGURES / "median_income_by_attrition.png", dpi=300)
    plt.close()


def evaluate_model(pipeline: Pipeline, X_test: pd.DataFrame, y_test: pd.Series) -> dict:
    y_pred = pipeline.predict(X_test)
    y_prob = pipeline.predict_proba(X_test)[:, 1]

    metrics = {
        "accuracy": round(accuracy_score(y_test, y_pred), 4),
        "precision": round(precision_score(y_test, y_pred), 4),
        "recall": round(recall_score(y_test, y_pred), 4),
        "f1_score": round(f1_score(y_test, y_pred), 4),
        "roc_auc": round(roc_auc_score(y_test, y_prob), 4),
        "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
        "classification_report": classification_report(y_test, y_pred, output_dict=True),
    }

    RocCurveDisplay.from_predictions(y_test, y_prob)
    plt.title("ROC Curve - Attrition Prediction")
    plt.tight_layout()
    plt.savefig(OUTPUT_FIGURES / "roc_curve.png", dpi=300)
    plt.close()

    return metrics


def get_feature_importance(pipeline: Pipeline, X_test: pd.DataFrame, y_test: pd.Series) -> pd.DataFrame:
    result = permutation_importance(
        pipeline,
        X_test,
        y_test,
        n_repeats=10,
        random_state=42,
        scoring="roc_auc",
    )

    importance_df = pd.DataFrame(
        {
            "feature": X_test.columns,
            "importance_mean": result.importances_mean,
            "importance_std": result.importances_std,
        }
    ).sort_values("importance_mean", ascending=False)

    return importance_df


def run_analysis() -> None:
    df = load_and_clean_data()

    save_attrition_rate_chart(df)

    target = (df["Attrition"] == "Yes").astype(int)
    drop_cols = [c for c in ["Attrition", "EmpID", "EmployeeCount", "StandardHours"] if c in df.columns]
    features = df.drop(columns=drop_cols)

    X_train, X_test, y_train, y_test = train_test_split(
        features,
        target,
        test_size=0.2,
        random_state=42,
        stratify=target,
    )

    pipeline = build_pipeline(features)
    pipeline.fit(X_train, y_train)

    metrics = evaluate_model(pipeline, X_test, y_test)
    importance_df = get_feature_importance(pipeline, X_test, y_test)

    importance_df.to_csv(OUTPUT_TABLES / "feature_importance.csv", index=False)

    top_10 = importance_df.head(10).sort_values("importance_mean")
    plt.figure(figsize=(10, 6))
    plt.barh(top_10["feature"], top_10["importance_mean"])
    plt.title("Top 10 Drivers of Attrition (Permutation Importance)")
    plt.xlabel("Mean Importance (ROC-AUC decrease)")
    plt.tight_layout()
    plt.savefig(OUTPUT_FIGURES / "top_10_attrition_drivers.png", dpi=300)
    plt.close()

    summary = {
        "dataset_shape": list(df.shape),
        "attrition_rate_percent": round(target.mean() * 100, 2),
        "top_attrition_drivers": importance_df.head(10).to_dict(orient="records"),
        "metrics": metrics,
    }

    with open(OUTPUT_TABLES / "model_summary.json", "w") as f:
        json.dump(summary, f, indent=2)

    print("Analysis complete. Outputs saved to the outputs/ folder.")


if __name__ == "__main__":
    run_analysis()
