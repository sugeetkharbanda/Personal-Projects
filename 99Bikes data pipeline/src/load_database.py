
import pandas as pd
import sqlite3
from pathlib import Path

DATA_PATH = Path("data/processed/cleaned_sales_data.csv")
DB_PATH = Path("retail_sales.db")

def load_db():
    df = pd.read_csv(DATA_PATH)
    conn = sqlite3.connect(DB_PATH)
    df.to_sql("sales_transactions", conn, if_exists="replace", index=False)
    conn.commit()
    conn.close()
    print("Loaded to DB")

if __name__=="__main__":
    load_db()
