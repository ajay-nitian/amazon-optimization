import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoryViewer({ asin }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      if (!asin) return;
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/history/${asin}`
        );
        setHistory(data.history || []);
      } catch (err) {
        console.error('❌ Failed to load history:', err);
      }
    }
    fetchHistory();
  }, [asin]);

  return (
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      <h3>📜 Optimization History ({asin})</h3>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {history.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              <strong>{item.optimized_title}</strong>
              <br />
              <small>{new Date(item.optimization_date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryViewer;
