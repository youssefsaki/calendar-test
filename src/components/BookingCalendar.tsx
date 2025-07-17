import React, { useState, useMemo } from "react";

// Each day has a numeric date and optionally a price
interface Day {
  date: number;
  price: number | null;
}

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Static mock data for April 
const calendarData: Day[][] = [
  [
    { date: 1, price: 20 },
    { date: 2, price: 10 },
    { date: 3, price: 10 },
    { date: 4, price: 10 },
    { date: 5, price: 10 },
    { date: 6, price: null },
    { date: 7, price: null },
  ],
  [
    { date: 8, price: 20 },
    { date: 9, price: null },
    { date: 10, price: null },
    { date: 11, price: 10 },
    { date: 12, price: 10 },
    { date: 13, price: 30 },
    { date: 14, price: 40 },
  ],
  [
    { date: 15, price: 20 },
    { date: 16, price: 10 },
    { date: 17, price: 10 },
    { date: 18, price: 10 },
    { date: 19, price: null },
    { date: 20, price: null },
    { date: 21, price: 40 },
  ],
  [
    { date: 22, price: 20 },
    { date: 23, price: 10 },
    { date: 24, price: 10 },
    { date: 25, price: 10 },
    { date: 26, price: 10 },
    { date: 27, price: 30 },
    { date: 28, price: null },
  ],
  [
    { date: 29, price: null },
    { date: 30, price: 10 },
  ]
];

const BookingCalendar: React.FC = () => {
  // Using Set to avoid duplicate dates 
  const [selectedDates, setSelectedDates] = useState<Set<number>>(new Set());

  // Used this for visual feedback 
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  const handleSelect = (date: number, price: number | null) => {
    if (price === null) return;

    setSelectedDates(prev => {
      const updated = new Set(prev);
      if (updated.has(date)) {
        updated.delete(date);
      } else {
        updated.add(date);
      }
      return updated;
    });
  };

  // Using useMemo here to avoid unnecessary recalculations this keeps performance smooth even if the calendar becomes larger or more dynamic later
  const total = useMemo(() => {
    return calendarData
      .flat()
      .filter(day => selectedDates.has(day.date))
      .reduce((sum, day) => sum + (day.price ?? 0), 0);
  }, [selectedDates]);

  const renderDayCell = (
    date: number,
    price: number | null,
    isSelected: boolean,
    isDisabled: boolean,
    i: number
  ) => {
    const baseStyle = "h-16 flex flex-col items-center justify-center rounded-md text-sm transition-all duration-200";
    const selectedStyle = isSelected ? "bg-purple-600 text-white hover:text-black scale-105" : "bg-gray-100";
    const disabledStyle = isDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-purple-100 hover:shadow";
    const hoverStyle = hoveredDate === date ? "ring-2 ring-purple-400" : "";

    return (
      <button
        key={`${i}-${date}`}
        onClick={() => handleSelect(date, price)}
        onMouseEnter={() => setHoveredDate(date)}
        onMouseLeave={() => setHoveredDate(null)}
        disabled={isDisabled}
        className={`${baseStyle} ${selectedStyle} ${disabledStyle} ${hoverStyle}`}
        aria-label={`Date ${date} ${price ? `at $${price}` : "not available"}`}
      >
        <span>{date}</span>
        {price !== null && <span className="text-xs">${price}</span>}
      </button>
    );
  };

  return (
    <main className="w-full lg:w-8/12 max-w-lg mx-auto lg:mx-0">
      {/* Calendar wrapper */}
      <section className="bg-white p-8 rounded-2xl shadow-2xl w-full">
        
        {/* Calendar header */}
        <header className="text-center mb-4">
          <h2 className="text-2xl font-bold">Online Booking</h2>
          <p className="text-sm text-gray-500">APRIL 2025</p>
        </header>

        <div className="grid grid-cols-7 gap-2">
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="font-semibold text-xs text-center text-gray-600">
              {day}
            </div>
          ))}

          {calendarData.map((week, i) =>
            week.map(({ date, price }) => {
              const isSelected = selectedDates.has(date);
              const isDisabled = price === null;
              return renderDayCell(date, price, isSelected, isDisabled, i);
            })
          )}
        </div>

        {/* Calculated TheTotal price summary updates based on the selected dates */}
        <footer className="mt-6 text-center">
          <p className="font-medium text-gray-700">
            Total for {selectedDates.size} night{selectedDates.size !== 1 && "s"}
          </p>
          <p className="text-2xl font-bold text-purple-600">${total}</p>
        </footer>
      </section>
    </main>
  );
};

export default BookingCalendar;
