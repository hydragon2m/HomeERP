'use client';

import React, { useState } from 'react';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  title?: string;
}

export function Calendar({
  onDateSelect,
  selectedDate = new Date(),
  title = 'Lịch',
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect?.(date);
  };

  const days = Array.from({ length: daysInMonth(currentMonth) }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth(currentMonth) });
  const monthName = currentMonth.toLocaleDateString('vi-VN', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            ←
          </button>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthName}
          </h4>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            →
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const isSelected =
              day === selectedDate.getDate() &&
              currentMonth.getMonth() === selectedDate.getMonth() &&
              currentMonth.getFullYear() === selectedDate.getFullYear();

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`
                  p-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
