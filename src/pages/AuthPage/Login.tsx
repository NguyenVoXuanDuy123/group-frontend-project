import { fetchApi } from "@/helpers/fetchApi";
import { introspectUser } from "@/redux/slices/authSlice";
import { setModalMessage } from "@/redux/slices/errorModalSlice";
import { AppDispatch } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type LoginProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setIsLogin }: LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !password) {
      dispatch(
        setModalMessage({
          message: "Please fill in all fields",
          type: "error",
        })
      );
      return;
    }

    setIsLoading(true);
    const response = await fetchApi("/api/auth/login", "POST", dispatch, {
      username,
      password,
    });

    if (response?.status === "success") {
      await dispatch(introspectUser({ dispatch }));
    }
    setIsLoading(false);
  };

  return (
    <div className="w-1/2 p-8 bg-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className="text-blue-500 hover:underline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
