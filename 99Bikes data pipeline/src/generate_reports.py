
import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

DB_PATH = Path("retail_sales.db")
OUT_TABLE = Path("outputs/tables")
OUT_FIG = Path("outputs/figures")

OUT_TABLE.mkdir(parents=True,exist_ok=True)
OUT_FIG.mkdir(parents=True,exist_ok=True)

def run_reports():
    conn = sqlite3.connect(DB_PATH)

    monthly = pd.read_sql(
        "SELECT year,month,SUM(list_price) revenue,SUM(profit) profit FROM sales_transactions GROUP BY year,month ORDER BY year,month",
        conn
    )

    brand = pd.read_sql(
        "SELECT brand,SUM(list_price) revenue FROM sales_transactions GROUP BY brand ORDER BY revenue DESC",
        conn
    )

    brand = brand.dropna()

    monthly.to_csv(OUT_TABLE/"monthly_sales.csv",index=False)
    brand.to_csv(OUT_TABLE/"brand_sales.csv",index=False)

    plt.figure()
    plt.plot(monthly["revenue"])
    plt.title("Monthly Revenue Trend")
    plt.savefig(OUT_FIG/"monthly_revenue_trend.png")
    plt.close()

    plt.figure()
    plt.bar(brand["brand"].astype(str),brand["revenue"])
    plt.xticks(rotation=45)
    plt.title("Revenue by Brand")
    plt.tight_layout()
    plt.savefig(OUT_FIG/"revenue_by_brand.png")
    plt.close()

    conn.close()
    print("Reports generated")

if __name__=="__main__":
    run_reports()
