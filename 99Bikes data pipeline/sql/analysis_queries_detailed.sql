-- Detailed business insights queries for the 99 Bikes retail ETL project
-- Tested against SQLite using the cleaned approved-transactions table: sales_transactions


-- 01 Overall Kpis
SELECT
    COUNT(*) AS approved_transactions,
    COUNT(DISTINCT customer_id) AS unique_customers,
    COUNT(DISTINCT product_id) AS unique_products,
    ROUND(SUM(list_price), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS overall_profit_margin,
    ROUND(AVG(list_price), 2) AS avg_order_value
FROM sales_transactions;

-- 02 Order Status Healthcheck
WITH order_health AS (
    SELECT
        order_status,
        COUNT(*) AS orders,
        SUM(list_price) AS revenue
    FROM (
        SELECT * FROM sales_transactions
        UNION ALL
        SELECT * FROM sales_transactions WHERE 0
    )
    GROUP BY order_status
)
SELECT * FROM order_health;

-- 03 Monthly Revenue Profit And Mom Growth
WITH monthly AS (
    SELECT
        year,
        month,
        month_name,
        ROUND(SUM(list_price), 2) AS revenue,
        ROUND(SUM(profit), 2) AS profit,
        COUNT(*) AS orders
    FROM sales_transactions
    GROUP BY year, month, month_name
)
SELECT
    year,
    month,
    month_name,
    revenue,
    profit,
    orders,
    ROUND(
        100.0 * (revenue - LAG(revenue) OVER (ORDER BY year, month))
        / NULLIF(LAG(revenue) OVER (ORDER BY year, month), 0), 2
    ) AS revenue_mom_growth_pct
FROM monthly
ORDER BY year, month;

-- 04 Peak And Low Months
WITH monthly AS (
    SELECT
        year,
        month,
        month_name,
        SUM(list_price) AS revenue,
        SUM(profit) AS profit,
        COUNT(*) AS orders
    FROM sales_transactions
    GROUP BY year, month, month_name
)
SELECT
    year,
    month,
    month_name,
    ROUND(revenue, 2) AS revenue,
    ROUND(profit, 2) AS profit,
    orders,
    CASE
        WHEN revenue = (SELECT MAX(revenue) FROM monthly) THEN 'Peak Month'
        WHEN revenue = (SELECT MIN(revenue) FROM monthly) THEN 'Lowest Month'
    END AS month_flag
FROM monthly
WHERE revenue = (SELECT MAX(revenue) FROM monthly)
   OR revenue = (SELECT MIN(revenue) FROM monthly)
ORDER BY revenue DESC;

-- 05 Channel Mix And Profitability
SELECT
    online_order_channel,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(AVG(list_price), 2) AS avg_order_value,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS profit_margin,
    ROUND(100.0 * SUM(list_price) / (SELECT SUM(list_price) FROM sales_transactions), 2) AS revenue_share_pct
FROM sales_transactions
GROUP BY online_order_channel
ORDER BY revenue DESC;

-- 06 Brand Revenue Profit And Margin
SELECT
    brand,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS profit_margin,
    ROUND(AVG(list_price), 2) AS avg_selling_price
FROM sales_transactions
GROUP BY brand
ORDER BY revenue DESC;

-- 07 Brand Rank By Revenue And Margin
WITH brand_perf AS (
    SELECT
        brand,
        SUM(list_price) AS revenue,
        SUM(profit) AS profit,
        SUM(profit) * 1.0 / SUM(list_price) AS profit_margin
    FROM sales_transactions
    GROUP BY brand
)
SELECT
    brand,
    ROUND(revenue, 2) AS revenue,
    ROUND(profit, 2) AS profit,
    ROUND(profit_margin, 4) AS profit_margin,
    DENSE_RANK() OVER (ORDER BY revenue DESC) AS revenue_rank,
    DENSE_RANK() OVER (ORDER BY profit_margin DESC) AS margin_rank
FROM brand_perf
ORDER BY revenue_rank, margin_rank;

-- 08 Product Line Concentration And Mix
SELECT
    product_line,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS profit_margin,
    ROUND(100.0 * SUM(list_price) / (SELECT SUM(list_price) FROM sales_transactions), 2) AS revenue_share_pct
FROM sales_transactions
GROUP BY product_line
ORDER BY revenue DESC;

-- 09 Product Line By Class Size Margin Matrix
SELECT
    product_line,
    product_class,
    product_size,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS profit_margin
FROM sales_transactions
GROUP BY product_line, product_class, product_size
HAVING orders >= 100
ORDER BY profit_margin DESC, revenue DESC;

-- 10 High Revenue Low Margin Segments
WITH segment_perf AS (
    SELECT
        product_line,
        product_class,
        product_size,
        COUNT(*) AS orders,
        SUM(list_price) AS revenue,
        SUM(profit) AS profit,
        SUM(profit) * 1.0 / SUM(list_price) AS profit_margin
    FROM sales_transactions
    GROUP BY product_line, product_class, product_size
)
SELECT
    product_line,
    product_class,
    product_size,
    orders,
    ROUND(revenue, 2) AS revenue,
    ROUND(profit, 2) AS profit,
    ROUND(profit_margin, 4) AS profit_margin
FROM segment_perf
WHERE revenue >= (SELECT AVG(revenue) FROM segment_perf)
  AND profit_margin < 0.20
ORDER BY revenue DESC;

-- 11 Top 15 Products By Revenue
SELECT
    product_id,
    brand,
    product_line,
    product_class,
    product_size,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS profit_margin
FROM sales_transactions
GROUP BY product_id, brand, product_line, product_class, product_size
ORDER BY revenue DESC
LIMIT 15;

-- 12 Top 15 Products By Profit
SELECT
    product_id,
    brand,
    product_line,
    product_class,
    product_size,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS profit_margin
FROM sales_transactions
GROUP BY product_id, brand, product_line, product_class, product_size
ORDER BY profit DESC
LIMIT 15;

-- 13 Pareto Top 20Pct Customers
WITH customer_perf AS (
    SELECT
        customer_id,
        SUM(list_price) AS revenue,
        SUM(profit) AS profit,
        COUNT(*) AS orders,
        ROW_NUMBER() OVER (ORDER BY SUM(list_price) DESC) AS rn,
        COUNT(*) OVER () AS total_customers
    FROM sales_transactions
    GROUP BY customer_id
),
threshold AS (
    SELECT CAST(CEIL(total_customers * 0.20) AS INT) AS top_n
    FROM customer_perf
    LIMIT 1
)
SELECT
    'Top 20% Customers' AS segment,
    COUNT(*) AS customers,
    ROUND(SUM(revenue), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(100.0 * SUM(revenue) / (SELECT SUM(revenue) FROM customer_perf), 2) AS revenue_share_pct
FROM customer_perf
WHERE rn <= (SELECT top_n FROM threshold)
UNION ALL
SELECT
    'Bottom 80% Customers' AS segment,
    COUNT(*) AS customers,
    ROUND(SUM(revenue), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(100.0 * SUM(revenue) / (SELECT SUM(revenue) FROM customer_perf), 2) AS revenue_share_pct
FROM customer_perf
WHERE rn > (SELECT top_n FROM threshold);

-- 14 Customer Frequency Segments
WITH customer_orders AS (
    SELECT
        customer_id,
        COUNT(*) AS orders,
        SUM(list_price) AS revenue,
        SUM(profit) AS profit
    FROM sales_transactions
    GROUP BY customer_id
),
segmented AS (
    SELECT
        CASE
            WHEN orders BETWEEN 1 AND 2 THEN '1-2 orders'
            WHEN orders BETWEEN 3 AND 5 THEN '3-5 orders'
            WHEN orders BETWEEN 6 AND 8 THEN '6-8 orders'
            ELSE '9+ orders'
        END AS frequency_band,
        revenue,
        profit,
        orders
    FROM customer_orders
)
SELECT
    frequency_band,
    COUNT(*) AS customers,
    ROUND(SUM(revenue), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(AVG(revenue / orders), 2) AS avg_order_value,
    ROUND(100.0 * SUM(revenue) / (SELECT SUM(list_price) FROM sales_transactions), 2) AS revenue_share_pct
FROM segmented
GROUP BY frequency_band
ORDER BY
    CASE frequency_band
        WHEN '1-2 orders' THEN 1
        WHEN '3-5 orders' THEN 2
        WHEN '6-8 orders' THEN 3
        ELSE 4
    END;

-- 15 Repeat Customer Rate
WITH customer_orders AS (
    SELECT customer_id, COUNT(*) AS orders
    FROM sales_transactions
    GROUP BY customer_id
)
SELECT
    COUNT(*) AS customers,
    SUM(CASE WHEN orders > 1 THEN 1 ELSE 0 END) AS repeat_customers,
    ROUND(100.0 * SUM(CASE WHEN orders > 1 THEN 1 ELSE 0 END) / COUNT(*), 2) AS repeat_customer_rate_pct,
    SUM(CASE WHEN orders = 1 THEN 1 ELSE 0 END) AS one_time_customers
FROM customer_orders;

-- 16 Recency And Customer Value
WITH customer_value AS (
    SELECT
        customer_id,
        COUNT(*) AS orders,
        SUM(list_price) AS revenue,
        SUM(profit) AS profit,
        MAX(transaction_date) AS last_purchase_date
    FROM sales_transactions
    GROUP BY customer_id
),
enriched AS (
    SELECT
        customer_id,
        orders,
        revenue,
        profit,
        CAST(julianday((SELECT MAX(transaction_date) FROM sales_transactions)) - julianday(last_purchase_date) AS INT) AS recency_days
    FROM customer_value
)
SELECT
    CASE
        WHEN recency_days <= 30 THEN 'Active (<=30d)'
        WHEN recency_days <= 90 THEN 'Warm (31-90d)'
        ELSE 'Cold (>90d)'
    END AS recency_band,
    COUNT(*) AS customers,
    ROUND(SUM(revenue), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(AVG(orders), 2) AS avg_orders_per_customer
FROM enriched
GROUP BY recency_band
ORDER BY avg_orders_per_customer DESC;

-- 17 Product Age Profitability
WITH age_bands AS (
    SELECT
        CASE
            WHEN product_age_years < 2 THEN 'Newer than 2 years'
            WHEN product_age_years < 4 THEN '2-4 years'
            WHEN product_age_years < 6 THEN '4-6 years'
            ELSE 'Older than 6 years'
        END AS product_age_band,
        list_price,
        profit
    FROM sales_transactions
)
SELECT
    product_age_band,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS profit_margin
FROM age_bands
GROUP BY product_age_band
ORDER BY profit_margin DESC;

-- 18 Monthly Product Line Mix
SELECT
    month,
    month_name,
    product_line,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(100.0 * SUM(list_price) /
        SUM(SUM(list_price)) OVER (PARTITION BY month), 2) AS monthly_mix_pct
FROM sales_transactions
GROUP BY month, month_name, product_line
ORDER BY month, revenue DESC;

-- 19 Brand Within Line Performance
SELECT
    product_line,
    brand,
    COUNT(*) AS orders,
    ROUND(SUM(list_price), 2) AS revenue,
    ROUND(SUM(profit), 2) AS profit,
    ROUND(SUM(profit) * 1.0 / SUM(list_price), 4) AS profit_margin,
    DENSE_RANK() OVER (
        PARTITION BY product_line
        ORDER BY SUM(list_price) DESC
    ) AS revenue_rank_within_line,
    DENSE_RANK() OVER (
        PARTITION BY product_line
        ORDER BY SUM(profit) * 1.0 / SUM(list_price) DESC
    ) AS margin_rank_within_line
FROM sales_transactions
GROUP BY product_line, brand
ORDER BY product_line, revenue_rank_within_line;

-- 20 Top Products Share Of Revenue
WITH product_perf AS (
    SELECT
        product_id,
        SUM(list_price) AS revenue,
        ROW_NUMBER() OVER (ORDER BY SUM(list_price) DESC) AS rn
    FROM sales_transactions
    GROUP BY product_id
)
SELECT
    COUNT(*) AS top_products_count,
    ROUND(SUM(revenue), 2) AS top_products_revenue,
    ROUND(100.0 * SUM(revenue) / (SELECT SUM(list_price) FROM sales_transactions), 2) AS revenue_share_pct
FROM product_perf
WHERE rn <= 10;
