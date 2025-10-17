import React, { useState } from "react";
import axios from "axios";
import OptimizationResult from "./OptimizationResult";

function OptimizationForm({ asin, setAsin, onOptimizationComplete }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptimize = async () => {
    if (!asin) {
      alert("Please enter a valid ASIN.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/api/optimize", { asin });

      if (response.data && response.data.optimized) {
        const resultData = {
          original_title: response.data.saved?.original_title || "N/A",
          original_description: response.data.saved?.original_description || "N/A",
          optimized_title: response.data.optimized.optimized_title,
          optimized_description: response.data.optimized.optimized_description,
          optimized_keywords: response.data.optimized.optimized_keywords,
        };
        setResult(resultData);
      } else {
        alert("Optimization completed, but no result returned from server.");
      }

      if (onOptimizationComplete) onOptimizationComplete();
    } catch (error) {
      console.error("❌ Optimization failed:", error);
      alert("Optimization failed. Check backend logs for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Amazon Listing Optimizer</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Amazon ASIN"
          value={asin}
          onChange={(e) => setAsin(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "5px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleOptimize}
          disabled={loading}
          style={{
            padding: "6px 12px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Optimizing..." : "Optimize Listing"}
        </button>
      </div>

      {/* ✅ Use OptimizationResult (not ResultDisplay) */}
      {result && <OptimizationResult result={result} />}
    </div>
  );
}

export default OptimizationForm;
