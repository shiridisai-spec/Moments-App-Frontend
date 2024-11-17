"use client";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-200 to-pink-100 text-gray-900">
      {/* Hero Section */}
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-700">
          Welcome to Momento
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-700">
          A place to capture, share, and relive your cherished moments. Whether
          it's a smile, a celebration, or a memory, keep them all in one
          beautiful space.
        </p>

        {/* Buttons */}
        <div className="space-x-4">
          <a
            href="/register"
            className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-full shadow-lg border-2 border-purple-300 hover:bg-purple-100 transition duration-300"
          >
            Register Now - Start Your Journey
          </a>
          <a
            href="/login"
            className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-full shadow-lg hover:bg-purple-800 transition duration-300"
          >
            Login - Continue Creating Moments
          </a>
        </div>
      </div>

      {/* Decorative Section */}
      <div className="mt-12 w-full flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vbWVudHN8ZW58MHx8fHwxNjkwMjExMjU0&ixlib=rb-1.2.1&q=80&w=1080"
          alt="Cherished moments illustration"
          className="rounded-xl shadow-xl w-full max-w-xs md:max-w-lg object-cover"
        />
      </div>
    </div>
  );
};

export default HomePage;
