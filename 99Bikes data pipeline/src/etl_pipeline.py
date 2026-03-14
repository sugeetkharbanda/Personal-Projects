
import pandas as pd
from pathlib import Path

RAW_PATH = Path("data/raw/99Bikers_Raw_data.xlsx")
OUTPUT_PATH = Path("data/processed/cleaned_sales_data.csv")

def run_etl():
    df = pd.read_excel(RAW_PATH)
    df.columns = df.columns.str.strip().str.lower().str.replace(" ","_")
    df["transaction_date"] = pd.to_datetime(df["transaction_date"], errors="coerce")
    df["list_price"] = pd.to_numeric(df["list_price"], errors="coerce")
    df["standard_cost"] = pd.to_numeric(df["standard_cost"], errors="coerce")
    df["profit"] = df["list_price"] - df["standard_cost"]
    df["year"] = df["transaction_date"].dt.year
    df["month"] = df["transaction_date"].dt.month
    df = df[df["order_status"]=="Approved"]
    df = df.drop_duplicates()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(OUTPUT_PATH, index=False)
    print("ETL complete")

if __name__=="__main__":
    run_etl()
