import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-9xl font-extrabold text-gray-800 animate-pulse">
            404
          </h1>
          <h2 className="text-4xl font-bold text-gray-700">Page Not Found</h2>
          <p className="text-xl text-gray-600">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
