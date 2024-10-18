// src/components/CustomCalendar.js
import React, { useState, useEffect } from "react";

const CustomCalendar = ({ onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDays = (month, year) => {
    const days = [];
    const totalDays = daysInMonth(month, year);
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDays(currentDate.getMonth(), currentDate.getFullYear());

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onChange(date); // Notify parent component
  };

  return (
    <div className="border rounded p-4">
      <div className="flex justify-between mb-2">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2 className="text-xl">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {days.map((day) => (
          <div
            key={day}
            className={`p-2 cursor-pointer ${
              day.toDateString() === selectedDate.toDateString()
                ? "bg-blue-200"
                : ""
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
