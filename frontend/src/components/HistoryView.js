import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoryViewer({ asin }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/history/${asin}`);
        setHistory(data.history || []);
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    }
    fetchHistory();
  }, [asin]);

  return (
    <div style={{ marginTop: '40px' }}>
      <h3>📜 Optimization History ({asin})</h3>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.id}>
              <strong>{item.optimized_title}</strong> — {new Date(item.optimization_date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryViewer;
