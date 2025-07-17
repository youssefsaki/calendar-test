// Left content section of the booking UI
// I gave it a responsive width to make sure it adjusts well between mobile and desktop.
// Text is centered on mobile, and left-aligned on larger screens for readability.
const LeftSection = () => {
  return (
    <section className="w-full lg:w-6/12 text-center lg:text-left space-y-6">
      
      <h1 className="text-white text-5xl lg:text-6xl font-bold leading-tight">
        Booking Calendar 
        <span className="block">+ Pricing</span>
      </h1>

      <p className="text-[1.1rem] leading-relaxed max-w-md mx-auto lg:mx-0">
        Click on dates to add to or subtract from the total price and number of nights.
      </p>
    </section>
  );
};

export default LeftSection;
