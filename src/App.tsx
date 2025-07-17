import BookingCalendar from "./components/BookingCalendar";
import LeftSection from "./components/LeftSection";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-300 px-6 py-12 flex justify-center">
      <div className="min-w-[75%]  flex flex-col lg:flex-row gap-12 items-center justify-between">
        {/* LEFT SECTION */}
        <LeftSection />
        {/* RIGHT SECTION */}
        <BookingCalendar />
      </div>
    </div>
  );
}

export default App;
