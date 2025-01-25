import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  TrendingUp, 
  DollarSign, 
  Trash2, 
  Edit2, 
  Plus,
  BarChart2,
  Briefcase,
  AlertCircle
} from "lucide-react";
import './App.css'; // Import the CSS file

function App() {
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({ stockName: "", ticker: "", buyPrice: "", quantity: "" });
  const [totalValue, setTotalValue] = useState(0);
  const [topPerformingStock, setTopPerformingStock] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    calculateTotalValue();
    findTopPerformingStock();
  }, [stocks]);

  const fetchStocks = async () => {
    const response = await axios.get("http://localhost:5000/api/stocks");
    setStocks(response.data);
  };

  const fetchStockPrice = async (ticker) => {
    const response = await axios.get(`https://api.example.com/stock/${ticker}`);
    return response.data.price;
  };

  const calculateTotalValue = async () => {
    let value = 0;
    for (let stock of stocks) {
      const currentPrice = await fetchStockPrice(stock.ticker);
      value += currentPrice * stock.quantity;
    }
    setTotalValue(value);
  };

  const findTopPerformingStock = async () => {
    let topStock = null;
    let highestValue = 0;

    for (let stock of stocks) {
      const currentPrice = await fetchStockPrice(stock.ticker);
      const stockValue = currentPrice * stock.quantity;
      if (stockValue > highestValue) {
        highestValue = stockValue;
        topStock = stock;
      }
    }
    setTopPerformingStock(topStock);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/stocks/add", form);
    setForm({ stockName: "", ticker: "", buyPrice: "", quantity: "" });
    setIsFormVisible(false);
    fetchStocks();
  };

  const handleEdit = async (id) => {
    const stock = stocks.find((stock) => stock._id === id);
    setForm({ stockName: stock.stockName, ticker: stock.ticker, buyPrice: stock.buyPrice, quantity: stock.quantity });
    setIsFormVisible(true);
    await axios.delete(`http://localhost:5000/api/stocks/delete/${id}`);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/stocks/delete/${id}`);
    fetchStocks();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="flex items-center">
          <Briefcase className="h-8 w-8 text-indigo-600 mr-3" />
          <h1>Portfolio Tracker</h1>
        </div>
        <button
          onClick={() => setIsFormVisible(true)}
          className="header-button"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Stock
        </button>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <DollarSign className="h-6 w-6 text-green-500 mr-2" />
            <h3>Total Value</h3>
          </div>
          <p className="card-content">${totalValue.toFixed(2)}</p>
        </div>

        <div className="card">
          <div className="card-header">
            <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
            <h3>Top Performer</h3>
          </div>
          {topPerformingStock ? (
            <p className="card-content">
              {topPerformingStock.stockName} ({topPerformingStock.ticker})
            </p>
          ) : (
            <p>No stocks added yet</p>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <BarChart2 className="h-6 w-6 text-purple-500 mr-2" />
            <h3>Total Stocks</h3>
          </div>
          <p className="card-content">{stocks.length}</p>
        </div>
      </div>

      {isFormVisible && (
        <div className="form-modal">
          <div className="form-modal-content">
            <h2>{form.stockName ? "Edit Stock" : "Add New Stock"}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Stock Name</label>
                <input
                  className="form-input"
                  value={form.stockName}
                  onChange={(e) => setForm({ ...form, stockName: e.target.value })}
                />
              </div>
              <div>
                <label>Ticker Symbol</label>
                <input
                  className="form-input"
                  value={form.ticker}
                  onChange={(e) => setForm({ ...form, ticker: e.target.value })}
                />
              </div>
              <div>
                <label>Buy Price</label>
                <input
                  className="form-input"
                  type="number"
                  value={form.buyPrice}
                  onChange={(e) => setForm({ ...form, buyPrice: e.target.value })}
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  className="form-input"
                  type="number"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="submit">
                  {form.stockName ? "Update Stock" : "Add Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="stock-list">
        <div className="stock-list-header">
          <h2>Your Stocks</h2>
        </div>
        {stocks.length === 0 ? (
          <div className="no-stocks">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <p>No stocks in your portfolio yet</p>
          </div>
        ) : (
          <ul>
            {stocks.map((stock) => (
              <li key={stock._id} className="stock-item">
                <div className="stock-item-header">
                  <h3>{stock.stockName}</h3>
                  <span className="stock-ticker">{stock.ticker}</span>
                  <span>{stock.quantity} shares @ ${stock.buyPrice}</span>
                </div>
                <div className="stock-item-actions">
                  <button onClick={() => handleEdit(stock._id)}>
                    <Edit2 />
                  </button>
                  <button onClick={() => handleDelete(stock._id)}>
                    <Trash2 />
                  </button>
                </div>
                <div className="stock-item-footer">
                  ${(stock.buyPrice * stock.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
