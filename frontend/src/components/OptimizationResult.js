// frontend/src/components/OptimizationResult.js
import React from "react";

function OptimizationResult({ result }) {
  if (!result) return null;

  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Original Listing */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#e8f6e8",
          padding: "15px",
          borderRadius: "8px",
          maxWidth: "45%",
        }}
      >
        <h3 style={{ color: "#e65100" }}>🟠 Original Listing</h3>

        <p>
          <strong>Title:</strong> {result.original_title}
        </p>
        <p>
          <strong>Description:</strong> {result.original_description}
        </p>
        {result.original_bullets && (
          <>
            <strong>Bullet Points:</strong>
            <ul>
              {result.original_bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Optimized Listing */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#e8f6e8",
          padding: "15px",
          borderRadius: "8px",
          maxWidth: "45%",
        }}
      >
        <h3 style={{ color: "#2e7d32" }}>🟢 Optimized Listing</h3>

        <p>
          <strong>Title:</strong> {result.optimized_title}
        </p>
        <p>
          <strong>Description:</strong> {result.optimized_description}
        </p>
        {result.optimized_bullets && (
          <>
            <strong>Bullet Points:</strong>
            <ul>
              {result.optimized_bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </>
        )}
        <p>
          <strong>Keywords:</strong> {result.optimized_keywords}
        </p>
      </div>
    </div>
  );
}

export default OptimizationResult;
