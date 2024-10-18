// src/TravelCurrencyApp.js

import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const base_url = "https://v6.exchangerate-api.com/v6";

const TravelCurrencyApp = () => {
  const [homeCurrency, setHomeCurrency] = useState("USD");
  const [destinationCurrency, setDestinationCurrency] = useState("JPY");
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [predictions, setPredictions] = useState([]);
  const [allPredictions, setAllPredictions] = useState([]); // New state for all predictions

  const fetchRealTimeExchangeRate = async (fromCurrency, toCurrency) => {
    try {
      const response = await axios.get(
        `${base_url}/111/latest/${fromCurrency}`
      );
      const conversionRate = response.data.conversion_rates[toCurrency];
      if (!conversionRate) throw new Error("No conversion rate found");
      return conversionRate;
    } catch (error) {
      alert(`Failed to fetch exchange rate: ${error.message}`);
      return null;
    }
  };

  const predictExchangeRate = (baseCurrency, targetCurrency, numDays) => {
    const predictions = [];
    let currentRate = 1;

    for (let i = 0; i < numDays; i++) {
      const predictedRate = currentRate * (1 + (Math.random() - 0.5) * 0.05);
      predictions.push(predictedRate);
      currentRate = predictedRate;
    }

    return predictions;
  };

  const handlePredict = async () => {
    const realTimeRate = await fetchRealTimeExchangeRate(
      homeCurrency,
      destinationCurrency
    );
    if (realTimeRate === null) return;

    const predictedRates = predictExchangeRate(
      homeCurrency,
      destinationCurrency,
      duration
    );

    const predictionsData = predictedRates.map((rate, index) => {
      const travelDay = moment(startDate)
        .add(index, "days")
        .format("YYYY-MM-DD");
      return {
        date: travelDay,
        rate,
        favorable: rate < realTimeRate * 0.98,
        leastFavorable: rate > realTimeRate * 1.02, // Added condition for least favorable
      };
    });

    const topFavorableRates = predictionsData
      .filter((prediction) => prediction.favorable || prediction.leastFavorable)
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 5); // Top 5 rates based on favorability

    setPredictions(topFavorableRates);
    setAllPredictions(predictionsData); // Store all predictions
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Travel Currency Prediction Tool
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <label className="block">
          Home Country:
          <select
            value={homeCurrency}
            onChange={(e) => setHomeCurrency(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
          </select>
        </label>
        <label className="block">
          Destination Country:
          <select
            value={destinationCurrency}
            onChange={(e) => setDestinationCurrency(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          >
            <option value="JPY">JPY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          Travel Start Date:
          <div className="mt-1 relative">
            <Calendar
              onChange={setStartDate}
              value={startDate}
              className="w-full border-none" // Ensures no extra borders or padding
            />
          </div>
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          Travel Duration (days):
          <input
            type="number"
            value={duration > 0 ? duration : ""}
            onChange={(e) => {
              const value = e.target.value;
              setDuration(value === "" ? 0 : Number(value));
            }}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
      </div>
      <button
        onClick={handlePredict}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Predict Best Travel Dates
      </button>
      <div className="mt-4">
        {predictions.map(({ date, rate, favorable, leastFavorable }) => (
          <div
            key={date}
            className={`py-2 px-4 my-1 rounded ${
              favorable
                ? "bg-green-100"
                : leastFavorable
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          >
            Day {date}: Rate = {rate.toFixed(4)} (
            {favorable
              ? "Favorable"
              : leastFavorable
              ? "Least Favorable"
              : "Not Favorable"}
            )
          </div>
        ))}
      </div>
      {allPredictions.length > 0 && (
        <div className="mt-6">
          <Bar
            data={{
              labels: allPredictions.map((p) => p.date),
              datasets: [
                {
                  label: "Predicted Rates",
                  data: allPredictions.map((p) => p.rate),
                  backgroundColor: allPredictions.map((p) =>
                    p.favorable
                      ? "rgba(34, 197, 94, 1)"
                      : p.leastFavorable
                      ? "rgba(254, 202, 4, 1)"
                      : "rgba(239, 68, 68, 1)"
                  ),
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Currency Rate Predictions",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TravelCurrencyApp;
