import Carousel from "./Carousel";

const MainPage = () => {
  return (
    <>
      <div className="hero bg-blue-500 text-white p-10 text-center">
        <h1 className="text-4xl font-bold">Welcome to Your Data Hub</h1>
        <p className="mt-4 text-lg">
          Explore, analyze, and visualize data with ease.
        </p>
        <a
          href="/converter"
          className="mt-6 inline-block bg-red-400 text-white py-2 px-4 rounded"
        >
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
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold z-10">
          Your Application Awaits!
        </h1>
      </div>
      <div className="p-4">
        <p className="text-center text-sm text-gray-600">
          Photo by{" "}
          <a
            href="https://unsplash.com/@nkdsn?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nick Kelly
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/photos/a-group-of-people-walking-down-a-street-next-to-tall-buildings-XIhHDVmANvk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </p>
        <p className="text-center text-sm text-gray-600">
          Photo by{" "}
          <a
            href="https://unsplash.com/@tungstenrising?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tungsten Rising
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/photos/looking-through-a-window-at-a-tall-building-wxLDZJ1Zgoo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </p>
      </div>
      <div className="testimonials p-10">
        <h2 className="text-2xl font-bold text-center">What Our Users Say</h2>
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
          <p>Visualize insights with our powerful charts.</p>
          <a href="/data" className="text-blue-500">
            View Tools
          </a>
        </div>
      </div>
    </>
  );
};

export default MainPage;
