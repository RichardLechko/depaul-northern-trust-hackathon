import React, { useState, useEffect, useCallback } from "react";
import { IoRefresh } from "react-icons/io5";

const Currency = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [startCurrency, setStartCurrency] = useState("USD");
  const [endCurrency, setEndCurrency] = useState("EUR");
  const [firstCurrVal, setFirstCurrVal] = useState("");
  const [secondCurrVal, setSecondCurrVal] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});
  const [error, setError] = useState(null);

  const apiUrl = "https://react-resume-api.vercel.app/api/currency";

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyData();
  }, [apiUrl]);

  const convertCurr = useCallback(() => {
    if (!exchangeRates[startCurrency] || !exchangeRates[endCurrency]) {
      setSecondCurrVal("");
      return;
    }

    const firstCurr = parseFloat(firstCurrVal);
    if (isNaN(firstCurr) || !isFinite(firstCurr)) {
      setSecondCurrVal("");
      return;
    }

    const rate = exchangeRates[endCurrency] / exchangeRates[startCurrency];
    const result = firstCurr * rate;

    setSecondCurrVal(
      result.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }, [firstCurrVal, startCurrency, endCurrency, exchangeRates]);

  const handleFlip = () => {
    const tempCurrency = startCurrency;
    setStartCurrency(endCurrency);
    setEndCurrency(tempCurrency);
  };

  useEffect(() => {
    convertCurr();
  }, [firstCurrVal, startCurrency, endCurrency, exchangeRates, convertCurr]);

  return (
    <div>
      
      <h1 className="text-3xl font-bold mt-12 text-center">
        Real-Time Currency Converter
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center h-[50vh]">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-auto md:mb-0">
            <form className="flex flex-col">
              <div className="outline-1 outline-black outline-double mb-2 flex flex-col md:flex-row">
                <input
                  type="text"
                  name="currency-startVal"
                  id="currency-startVal"
                  className="text-lg md:text-xl font-bold text-center p-3 md:p-[15px] border-b-2 md:border-b-0 md:border-r-2 border-black max-[375px]:p-1 max-[375px]:text-base"
                  value={firstCurrVal}
                  onChange={(e) => setFirstCurrVal(e.target.value)}
                />

                <select
                  className="text-lg md:text-xl font-bold text-center p-3 md:p-[15px] max-[375px]:p-1 max-[375px]:text-base"
                  name="currency-start"
                  id="currency-start"
                  value={startCurrency}
                  onChange={(e) => setStartCurrency(e.target.value)}
                >
                  <option value="USD">United States Dollar</option>
                  <option value="AUD">Australian Dollar</option>

                  <option value="CAD">Canada Dollar</option>

                  <option value="EUR">Euro</option>
                  <option value="GBP">Great British Pound</option>

                  <option value="JPY">Japan Yen</option>
                </select>
              </div>
              <div className="outline-1 outline-black outline-double mb-2 flex flex-col md:flex-row">
                <input
                  type="text"
                  name="currency-endVal"
                  id="currency-endVal"
                  className="text-lg md:text-xl font-bold text-center p-3 md:p-[15px] border-b-2 md:border-b-0 md:border-r-2 border-black max-[375px]:p-1 max-[375px]:text-base"
                  value={secondCurrVal}
                  readOnly
                />
                <select
                  className="text-lg md:text-xl font-bold text-center p-3 md:p-[15px] max-[375px]:p-1 max-[375px]:text-base"
                  name="currency-end"
                  id="currency-end"
                  value={endCurrency}
                  onChange={(e) => setEndCurrency(e.target.value)}
                  readOnly
                >
                  <option value="USD">United States Dollar</option>
                  <option value="AUD">Australian Dollar</option>

                  <option value="CAD">Canada Dollar</option>

                  <option value="EUR">Euro</option>
                  <option value="GBP">Great British Pound</option>

                  <option value="JPY">Japan Yen</option>                </select>
              </div>
            </form>
          </div>
          <div className="flex-grow flex justify-center items-center mt-4 max-md:mt-0 ">
            <i
              id="flip-icon"
              className="rotate-90 hover:cursor-pointer p-4 text-[4rem] max-[375px]:text-[3rem]"
              onClick={handleFlip}
            >
              <IoRefresh />
            </i>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4 md:mt-0">{error}</p>}
      </div>
    </div>
  );
};

export default Currency;
