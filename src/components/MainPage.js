import Carousel from "./Carousel";

const MainPage = () => {
  return (
    <>
      <div className="hero bg-blue-500 text-white p-10 text-center">
        <h1 className="text-4xl font-bold">Welcome to World Link Forex Hub</h1>
        <p className="mt-4 text-lg">
          Explore, analyze, and visualize financial data with ease.
        </p>
        
      </div>
      <div className="features grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
        <div className="feature bg-gray-200 p-6 rounded shadow-md">
          <h2 className="font-bold text-xl pb-2">Currency Conversion</h2>
          <p>Quickly convert currencies with real-time rates.</p>
        </div>
        <div className="feature bg-gray-200 p-6 rounded shadow-md">
          <h2 className="font-bold text-xl pb-2">FX Trade Simulator</h2>
          <p>Simulate different financial scenarios easily.</p>
        </div>
        <div className="feature bg-gray-200 p-6 rounded shadow-md">
          <h2 className="font-bold text-xl pb-2">Forex Future View</h2>
          <p>Visualize our data insights with interactive charts.</p>
        </div>
      </div>
      <div className="relative h-64 overflow-hidden">
        <div
          className="bg-cover bg-center h-full absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
            backgroundImage: "url('/image1.jpg')",
            backgroundColor: "red",
          }}
        ></div>
        <div
          className="bg-cover bg-center h-full absolute inset-0"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 40% 100%, 60% 0)",
            backgroundImage: "url('/image2.jpg')",
            backgroundColor: "blue",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold z-10 mx-auto text-center max-[768px]:text-3xl max-[425px]:text-xl">
          Empowering Your Global Financial Decisions
        </h1>
      </div>
      
      <div className="testimonials p-10 max-[640px]:p-4 mt-10">
        <h2 className="text-2xl font-bold text-center">What Our Clients Say</h2>
        <Carousel />
      </div>

      <div className="cta-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
        <div className="card bg-white p-6 rounded shadow-lg">
          <h3 className="font-bold text-lg">Try Our Currency Converter</h3>
          <p>Convert currencies in real-time with accurate rates.</p>
          <a href="/converter" className="text-blue-500">
            Learn more
          </a>
        </div>
        <div className="card bg-white p-6 rounded shadow-lg">
          <h3 className="font-bold text-lg">Explore Data Simulation</h3>
          <p>Simulate various financial scenarios easily.</p>
          <a href="/simulator" className="text-blue-500">
            Get Started
          </a>
        </div>
        <div className="card bg-white p-6 rounded shadow-lg">
          <h3 className="font-bold text-lg">Data Visualization Tools</h3>
          <p>Visualize our predictive financial data.</p>
          <a href="/data" className="text-blue-500">
            View Tools
          </a>
        </div>
      </div>
    </>
  );
};

export default MainPage;
