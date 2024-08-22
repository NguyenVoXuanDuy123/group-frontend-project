import React, { useState } from 'react';
import loginPicture from '../assets/image/LoginPicture.png';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex w-3/4 rounded-lg overflow-hidden">
        {/* Left side - Image */}
        <div className="w-1/2 flex items-center justify-center">
          <img 
            className="object-cover h-full w-full" 
            src={loginPicture} 
            alt="Login" 
          />
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 p-8 bg-white flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? 'Login' : 'Register'}
            </h2>
            {isLogin ? (
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                  <input type="text" placeholder="Username" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                  <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</button>
                  <button type="button" onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline">Register</button>
                </div>
              </form>
            ) : (
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                  <input type="text" placeholder="First Name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                  <input type="text" placeholder="Last Name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                  <input type="text" placeholder="Username" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                  <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                  <input type="password" placeholder="Confirm Password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</button>
                  <button type="button" onClick={() => setIsLogin(true)} className="text-blue-500 hover:underline">Login</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


