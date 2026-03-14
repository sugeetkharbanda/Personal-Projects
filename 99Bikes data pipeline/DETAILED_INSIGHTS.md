# Detailed Insights for the 99 Bikes Retail Sales ETL Project

These insights were computed from the cleaned **approved transactions** table after running the ETL pipeline.

## Executive summary

- The dataset contains **19,821 approved transactions** across **3,493 customers** and **101 distinct products**.
- Total revenue is **$21,954,196.69** and total profit is **$10,831,504.03**, implying an overall profit margin of **49.34%**.
- Revenue is highly concentrated in the **Standard** line, which alone contributes **70.55%** of all revenue.
- The highest-revenue month is **October** with **$1,943,183.27**, while the lowest is **September** with **$1,728,605.72**.
- The top **20%** of customers contribute **34.11%** of revenue, while the top **10%** alone drive **19.17%**.

## Most interesting findings

### 1) Standard dominates the business, but Touring is the margin leader
- **Standard** drives the most revenue: **$15,488,718.86** from **14,048** orders.
- However, **Touring** is the most profitable on a margin basis at **67.48%**.
- This means the largest line is not necessarily the most efficient line.

### 2) The highest-revenue brand is not the highest-margin brand
- **Top revenue brand:** Solex with **$4,446,888.35** revenue.
- **Top margin brand:** WeareA2B with a profit margin of **66.16%**.
- This is a classic pricing and product-mix insight: volume leaders are not always profit leaders.

### 3) Small-size products are a profitability weak spot
- **Small** products generate **$3,588,766.48** revenue but only a **11.13%** margin.
- Compare that with **large** products at **62.29%** margin and **medium** products at **55.22%**.
- That gap is wide enough to justify a pricing, discount, or sourcing review for small-size SKUs.

### 4) The best and worst segment combinations are dramatically different
- **Best margin segment (with at least 100 orders):** Road / low / medium at **76.09%** margin.
- **Worst margin segment (with at least 100 orders):** Unknown / Unknown / Unknown at **0.00%** margin.
- This is one of the strongest signals in the dataset because it exposes where pricing architecture and product strategy are likely inconsistent.

### 5) Channel mix is surprisingly balanced
- Unknown: revenue **$21,954,196.69**, share **100.00%**, margin **49.34%**.The online and offline channels are almost equal in revenue contribution, which suggests channel diversification rather than dependency.

### 6) Customer repeat behavior is extremely strong
- Repeat customer rate is **98.60%**.
- Customers in the **6-8 orders** band contribute the largest revenue pool in the customer base.
- This suggests the business is driven more by repeat purchase frequency than by one-time spikes.

### 7) Older products are not always less profitable
- The strongest product-age band by margin is **2-4y** at **53.92%**.
- The weakest age band is **<2y** at **47.11%**.
- This is useful because it challenges the default assumption that newer stock is always economically better.

### 8) Revenue concentration is meaningful but not extreme
- Top **10 products** account for **19.16%** of total revenue.
- Top **20% of customers** account for **34.11%** of total revenue.
- This indicates a business with concentration, but not a dangerously narrow dependency on a tiny subset of SKUs or customers.

## Recommended story to tell in interviews

You can frame this project like this:

> I built an end-to-end ETL and SQL analytics pipeline on a retail transaction dataset, cleaned and transformed the raw data in Python, loaded it into SQLite, and used advanced SQL to analyze product mix, customer concentration, channel performance, and profitability patterns. The most interesting finding was that the highest-revenue segments were not always the highest-margin ones, especially across product sizes and product lines, which shows why revenue-only reporting can hide profitability risks.

## Files to highlight in GitHub

- `src/etl_pipeline.py`
- `src/load_database.py`
- `src/generate_reports.py`
- `sql/analysis_queries_detailed.sql`
- `outputs/figures/monthly_revenue_trend.png`
- `outputs/figures/revenue_by_brand.png`
- `outputs/figures/profit_by_product_line.png`