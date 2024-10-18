import React, { useState, useEffect } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";

function Test() {
  const [trades, setTrades] = useState([]);
  const [balances, setBalances] = useState({
    USD: null,
    EUR: 0,
    GBP: 0,
    JPY: 0,
    AUD: 0,
    CAD: 0,
  });

  const addTrade = (trade) => {
    setTrades((prevTrades) => [...prevTrades, trade]);
    setBalances((prevBalances) => {
      const newBalances = { ...prevBalances };
      const { baseCurrency, targetCurrency, amount, exchangeRate } = trade;

      // Deduct from the base currency
      newBalances[baseCurrency] -= amount;

      // Add to the target currency with a spread adjustment (to simulate real-world spread)
      const adjustedExchangeRate = exchangeRate * 0.995; // Simulating a 0.5% spread loss
      newBalances[targetCurrency] += parseFloat(
        (amount * adjustedExchangeRate).toFixed(2)
      );

      return newBalances;
    });
  };

  return (
    <div className="container mx-auto my-5 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-4">
        FX Trade Execution Simulator
      </h1>
      {balances.USD === null ? (
        <InitialBalanceForm setBalances={setBalances} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Balances balances={balances} />
          <TradeForm addTrade={addTrade} balances={balances} />
        </div>
      )}
      {balances.USD !== null && (
        <div className="mt-4">
          <Portfolio trades={trades} />
        </div>
      )}
    </div>
  );
}

function InitialBalanceForm({ setBalances }) {
  const [initialBalance, setInitialBalance] = useState("");

  const handleSetBalance = () => {
    if (initialBalance && parseFloat(initialBalance) > 0) {
      const balance = parseFloat(initialBalance);
      setBalances((prevBalances) => ({ ...prevBalances, USD: balance }));
    }
  };

  return (
    <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Set Initial USD Balance</h2>
      <div>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full mb-3"
          placeholder="Enter initial USD balance"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSetBalance(); // Call the function when Enter is pressed
            }
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleSetBalance}
        >
          Set Balance
        </button>
      </div>
    </div>
  );
}

function Balances({ balances }) {
  const formatMoney = (value) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Current Balances</h2>
      <ul className="space-y-2">
        {Object.entries(balances).map(([currency, balance]) => (
          <li key={currency} className="flex justify-between items-center">
            <span>
              {currency === "USD"
                ? "$"
                : currency === "EUR"
                ? "€"
                : currency === "GBP"
                ? "£"
                : currency === "JPY"
                ? "¥"
                : currency === "AUD"
                ? "A$"
                : "C$"}
            </span>
            <span>{formatMoney(balance)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TradeForm({ addTrade, balances }) {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (baseCurrency && targetCurrency) {
        try {
          const response = await axios.get(
            `https://api.1forge.com/quotes?pairs=${baseCurrency}/${targetCurrency}&api_key=${API_KEY}`
          );
          const selectedPair = response.data.find(
            (pair) => pair.s === `${baseCurrency}/${targetCurrency}`
          );
          if (selectedPair) {
            setExchangeRate(selectedPair.p);
            setError(null);
            setPreview(null);
          } else {
            setExchangeRate(null);
            setError("Unable to find the selected currency pair.");
          }
        } catch (error) {
          setError("Unable to fetch exchange rate. Please try again later.");
          setExchangeRate(null);
        }
      } else {
        setExchangeRate(null);
        setError(null);
      }
    };

    if (baseCurrency && targetCurrency) {
      fetchExchangeRate();
    }
  }, [baseCurrency, targetCurrency, API_KEY]);

  useEffect(() => {
    if (baseCurrency && targetCurrency && amount && exchangeRate) {
      const tradeAmount = parseFloat(amount);

      if (balances[baseCurrency] >= tradeAmount) {
        const adjustedExchangeRate = exchangeRate * 0.995; // Simulating a 0.5% spread loss for preview
        setPreview({
          baseCurrency,
          targetCurrency,
          newBaseBalance: (balances[baseCurrency] - tradeAmount).toFixed(2),
          newTargetBalance: (
            balances[targetCurrency] +
            tradeAmount * adjustedExchangeRate
          ).toFixed(2),
          baseChange: -tradeAmount,
          targetChange: (tradeAmount * adjustedExchangeRate).toFixed(2),
        });
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [baseCurrency, targetCurrency, amount, exchangeRate, balances]);

  const handleTrade = () => {
    if (baseCurrency && targetCurrency && amount && exchangeRate) {
      const tradeAmount = parseFloat(amount);

      if (balances[baseCurrency] >= tradeAmount) {
        addTrade({
          baseCurrency,
          targetCurrency,
          amount: tradeAmount,
          exchangeRate: parseFloat(exchangeRate.toFixed(4)),
        });
        setBaseCurrency("");
        setTargetCurrency("");
        setAmount("");
        setExchangeRate(null);
        setError(null);
        setPreview(null);
      } else {
        setError("Insufficient balance to execute this trade.");
      }
    }
  };

  return (
    <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Place a Trade</h2>
      <div>
        <label className="block mb-1">Select Base Currency</label>
        <select
          className="border border-gray-300 rounded-md p-2 w-full mb-3"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          <option value="">Select Base Currency</option>
          {["USD", "EUR", "GBP", "JPY", "AUD", "CAD"].map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Select Target Currency</label>
        <select
          className="border border-gray-300 rounded-md p-2 w-full mb-3"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          <option value="">Select Target Currency</option>
          {["USD", "EUR", "GBP", "JPY", "AUD", "CAD"]
            .filter((currency) => currency !== baseCurrency)
            .map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Amount</label>
        <NumericFormat
          className="border border-gray-300 rounded-md p-2 w-full mb-3"
          thousandSeparator={true}
          decimalScale={2}
          fixedDecimalScale={true}
          placeholder="Enter amount"
          value={amount}
          onValueChange={(values) => setAmount(values.value)}
        />
      </div>
      {exchangeRate && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 mb-3">
          Current Exchange Rate: {exchangeRate}{" "}
          <span className="font-semibold">
            ({baseCurrency} to {targetCurrency})
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-3">
          {error}
        </div>
      )}
      {preview && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 mb-3">
          <h3 className="font-semibold mb-1">Preview Trade:</h3>
          <p>
            {preview.baseChange < 0
              ? `-${Math.abs(preview.baseChange).toLocaleString()} ${
                  preview.baseCurrency
                }`
              : `${Math.abs(preview.baseChange).toLocaleString()} ${
                  preview.baseCurrency
                }`}{" "}
            ➜ New Balance: {preview.newBaseBalance} {preview.baseCurrency}
          </p>
          <p>
            {preview.targetChange < 0
              ? `+${Math.abs(preview.targetChange).toLocaleString()} ${
                  preview.targetCurrency
                }`
              : `${Math.abs(preview.targetChange).toLocaleString()} ${
                  preview.targetCurrency
                }`}{" "}
            ➜ New Balance: {preview.newTargetBalance} {preview.targetCurrency}
          </p>
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={handleTrade}
      >
        Execute Trade
      </button>
    </div>
  );
}

function Portfolio({ trades }) {
  return (
    <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Trade History</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Trade</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Rate</th>
            <th className="border border-gray-300 p-2">Base Currency</th>
            <th className="border border-gray-300 p-2">Target Currency</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{`${trade.baseCurrency} ➜ ${trade.targetCurrency}`}</td>
              <td className="border border-gray-300 p-2">{trade.amount}</td>
              <td className="border border-gray-300 p-2">
                {trade.exchangeRate}
              </td>
              <td className="border border-gray-300 p-2">
                {trade.baseCurrency}
              </td>
              <td className="border border-gray-300 p-2">
                {trade.targetCurrency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Test;
