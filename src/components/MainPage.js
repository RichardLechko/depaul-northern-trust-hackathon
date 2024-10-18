import Carousel from "./Carousel";

const MainPage = () => {
    return(
        <>
        <div className="hero bg-blue-500 text-white p-10 text-center">
  <h1 className="text-4xl font-bold">Welcome to Your Data Hub</h1>
  <p className="mt-4 text-lg">Explore, analyze, and visualize data with ease.</p>
  <a href="/converter" className="mt-6 inline-block bg-red-400 text-white py-2 px-4 rounded">
    Start Converting Now
  </a>
</div>
<div className="features grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
  <div className="feature bg-gray-200 p-6 rounded shadow-md">
    <h2 className="font-bold text-xl">Currency Conversion</h2>
    <p>Quickly convert currencies with real-time rates.</p>
  </div>
  <div className="feature bg-gray-200 p-6 rounded shadow-md">
    <h2 className="font-bold text-xl">Data Simulation</h2>
    <p>Simulate different financial scenarios easily.</p>
  </div>
  <div className="feature bg-gray-200 p-6 rounded shadow-md">
    <h2 className="font-bold text-xl">Data Visualization</h2>
    <p>Visualize your data insights with interactive charts.</p>
  </div>
</div>

<div className="bg-cover bg-center h-64" style={{ backgroundImage: "url('path/to/your/image.jpg')" }}>
  <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
    <h1 className="text-white text-4xl font-bold">Your Application Awaits!</h1>
  </div>
</div>

<div className="testimonials p-10">
  
  <h2 className="text-2xl font-bold text-center">What Our Users Say</h2>
  <Carousel />
  
</div>

<div className="cta-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
  <div className="card bg-white p-6 rounded shadow-lg">
    <h3 className="font-bold text-lg">Try Our Currency Converter</h3>
    <p>Convert currencies in real-time with accurate rates.</p>
    <a href="/converter" className="text-blue-500">Learn more</a>
  </div>
  <div className="card bg-white p-6 rounded shadow-lg">
    <h3 className="font-bold text-lg">Explore Data Simulation</h3>
    <p>Simulate various financial scenarios easily.</p>
    <a href="/simulator" className="text-blue-500">Get Started</a>
  </div>
  <div className="card bg-white p-6 rounded shadow-lg">
    <h3 className="font-bold text-lg">Data Visualization Tools</h3>
    <p>Visualize insights with our powerful charts.</p>
    <a href="/data" className="text-blue-500">View Tools</a>
  </div>
</div>
        </>
    );
};

export default MainPage;