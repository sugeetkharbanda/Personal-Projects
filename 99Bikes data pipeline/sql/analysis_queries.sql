
SELECT SUM(list_price) total_revenue FROM sales_transactions;

SELECT brand,SUM(list_price) revenue
FROM sales_transactions
GROUP BY brand
ORDER BY revenue DESC;

SELECT year,month,SUM(list_price) revenue
FROM sales_transactions
GROUP BY year,month
ORDER BY year,month;
