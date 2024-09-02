export default function BannedPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Account Banned
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            We regret to inform you that your account has been banned for
            violating our community guidelines.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Ban details:
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Violation of community guidelines</li>
                    <li>Multiple reports from other users</li>
                    <li>Inappropriate content or behavior</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            <p>
              If you believe this ban was issued in error or would like to
              appeal, please contact our support team. We will review your case
              and respond within 3-5 business days.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
