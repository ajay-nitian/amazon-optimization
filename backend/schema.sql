CREATE TABLE IF NOT EXISTS Optimizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asin VARCHAR(50),
  original_title TEXT,
  original_bullets TEXT,
  original_description TEXT,
  optimized_title TEXT,
  optimized_bullets TEXT,
  optimized_description TEXT,
  optimized_keywords TEXT,
  optimization_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
