import React, { useState } from "react";
import "./App.css";
import OptimizationForm from "./components/OptimizationForm";
import HistoryView from "./components/HistoryView";

function App() {
  const [asin, setAsin] = useState("");

  return (
    <div className="App">
      <header className="app-header">
        <h1>🛍️ Amazon Listing Optimizer</h1>
        <p>Enter an ASIN to enhance, compare, and optimize your Amazon listings using AI.</p>
      </header>

      <OptimizationForm asin={asin} setAsin={setAsin} />
      {asin && <HistoryView asin={asin} />}
    </div>
  );
}

export default App;
