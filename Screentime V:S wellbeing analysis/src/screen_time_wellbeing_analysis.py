from pathlib import Path
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import statsmodels.formula.api as smf
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "data" / "raw" / "Social Media Emotions Analysis.xlsx"
OUTPUT_FIGURES = PROJECT_ROOT / "outputs" / "figures"
OUTPUT_TABLES = PROJECT_ROOT / "outputs" / "tables"
OUTPUT_FIGURES.mkdir(parents=True, exist_ok=True)
OUTPUT_TABLES.mkdir(parents=True, exist_ok=True)


def load_cleaned_data(path: Path = DATA_PATH) -> pd.DataFrame:
    df = pd.read_excel(path, sheet_name="Cleaned Data")
    df = df.loc[:, ~df.columns.astype(str).str.contains("^Unnamed")]
    return df


def create_visuals(df: pd.DataFrame) -> None:
    avg_usage = (
        df.groupby("Dominant_Emotion")["Daily_Usage_Time (minutes)"]
        .mean()
        .sort_values(ascending=False)
    )
    ax = avg_usage.plot(kind="bar", figsize=(10, 5))
    ax.set_title("Average Daily Screen Time by Dominant Emotion")
    ax.set_xlabel("Dominant Emotion")
    ax.set_ylabel("Average Daily Usage Time (minutes)")
    plt.tight_layout()
    plt.savefig(OUTPUT_FIGURES / "avg_screen_time_by_emotion.png", dpi=300)
    plt.close()

    platform_usage = (
        df.groupby("Platform")["Daily_Usage_Time (minutes)"]
        .mean()
        .sort_values(ascending=False)
    )
    ax = platform_usage.plot(kind="bar", figsize=(8, 5))
    ax.set_title("Average Daily Screen Time by Platform")
    ax.set_xlabel("Platform")
    ax.set_ylabel("Average Daily Usage Time (minutes)")
    plt.tight_layout()
    plt.savefig(OUTPUT_FIGURES / "avg_screen_time_by_platform.png", dpi=300)
    plt.close()


def create_coefficient_plots(logit_coeff: pd.DataFrame, linear_coeff: pd.DataFrame) -> None:
    logit_plot = (
        logit_coeff.loc[~logit_coeff["feature"].isin(["Intercept"])]
        .sort_values("coefficient", key=lambda s: s.abs(), ascending=False)
        .head(10)
        .sort_values("coefficient")
    )
    plt.figure(figsize=(10, 6))
    plt.barh(logit_plot["feature"], logit_plot["coefficient"])
    plt.title("Top Logistic Regression Coefficients")
    plt.xlabel("Coefficient")
    plt.tight_layout()
    plt.savefig(OUTPUT_FIGURES / "regression_coefficient_plot.png", dpi=300)
    plt.close()

    linear_plot = (
        linear_coeff.loc[~linear_coeff["feature"].isin(["Intercept"])]
        .sort_values("coefficient", key=lambda s: s.abs(), ascending=False)
        .head(10)
        .sort_values("coefficient")
    )
    plt.figure(figsize=(10, 6))
    plt.barh(linear_plot["feature"], linear_plot["coefficient"])
    plt.title("Top Linear Regression Coefficients")
    plt.xlabel("Coefficient")
    plt.tight_layout()
    plt.savefig(OUTPUT_FIGURES / "linear_regression_coefficient_plot.png", dpi=300)
    plt.close()


def run_models(df: pd.DataFrame) -> dict:
    logistic_formula = '''
        Happiness_Emotion ~ Q("Daily_Usage_Time (minutes)") + Age
        + Likes_Received_Per_Day + Comments_Received_Per_Day
        + Messages_Sent_Per_Day + Posts_Per_Day
    '''
    logit_model = smf.logit(logistic_formula, data=df).fit(disp=False)

    linear_formula = '''
        Q("Daily_Usage_Time (minutes)") ~ Happiness_Emotion + Age
        + Likes_Received_Per_Day + Comments_Received_Per_Day
        + Messages_Sent_Per_Day + Posts_Per_Day
        + C(Platform) + C(Gender)
    '''
    linear_model = smf.ols(linear_formula, data=df).fit()

    X = df[
        [
            "Daily_Usage_Time (minutes)",
            "Age",
            "Likes_Received_Per_Day",
            "Comments_Received_Per_Day",
            "Messages_Sent_Per_Day",
            "Posts_Per_Day",
        ]
    ]
    y = df["Happiness_Emotion"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    clf = LogisticRegression(max_iter=2000)
    clf.fit(X_train, y_train)
    y_prob = clf.predict_proba(X_test)[:, 1]
    y_pred = clf.predict(X_test)

    metrics = {
        "logistic_accuracy": round(accuracy_score(y_test, y_pred), 4),
        "logistic_f1": round(f1_score(y_test, y_pred), 4),
        "logistic_roc_auc": round(roc_auc_score(y_test, y_prob), 4),
        "logistic_classification_report": classification_report(y_test, y_pred, output_dict=True),
        "statsmodels_logit_pseudo_r2": round(logit_model.prsquared, 4),
        "linear_r_squared": round(linear_model.rsquared, 4),
        "linear_adj_r_squared": round(linear_model.rsquared_adj, 4),
    }

    logit_coeff = (
        pd.DataFrame(
            {
                "feature": logit_model.params.index,
                "coefficient": logit_model.params.values,
                "p_value": logit_model.pvalues.values,
                "odds_ratio": np.exp(logit_model.params.values),
            }
        )
        .sort_values("p_value")
    )
    linear_coeff = (
        pd.DataFrame(
            {
                "feature": linear_model.params.index,
                "coefficient": linear_model.params.values,
                "p_value": linear_model.pvalues.values,
            }
        )
        .sort_values("p_value")
    )

    logit_coeff.to_csv(OUTPUT_TABLES / "logistic_coefficients.csv", index=False)
    linear_coeff.to_csv(OUTPUT_TABLES / "linear_coefficients.csv", index=False)
    create_coefficient_plots(logit_coeff, linear_coeff)

    summary = {
        "dataset_shape": list(df.shape),
        "average_daily_usage_minutes": round(df['Daily_Usage_Time (minutes)'].mean(), 2),
        "happiness_share_percent": round(df['Happiness_Emotion'].mean() * 100, 2),
        "metrics": metrics,
    }
    with open(OUTPUT_TABLES / "model_summary.json", "w") as f:
        json.dump(summary, f, indent=2)

    return {"logit": logit_model, "linear": linear_model, "metrics": metrics}


def main() -> None:
    df = load_cleaned_data()
    create_visuals(df)
    results = run_models(df)
    print("Analysis complete. Outputs saved to the outputs/ folder.")
    print(results["metrics"])


if __name__ == "__main__":
    main()
