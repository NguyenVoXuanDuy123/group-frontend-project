import EnvVars from "@/constants/EnvVars";
import { setModalMessage } from "@/redux/slices/errorModalSlice";
import { AppDispatch } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type RegisterProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Register = ({ setIsLogin }: RegisterProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      dispatch(
        setModalMessage({
          message: "Please fill in all fields",
          type: "error",
        })
      );
      return;
    }

    if (password !== confirmPassword) {
      dispatch(
        setModalMessage({
          message: "Passwords do not match",
          type: "error",
        })
      );
      return;
    }

    try {
      const response = await fetch(EnvVars.API_URL + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          confirmPassword,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        dispatch(
          setModalMessage({
            message: error.message,
            type: "error",
          })
        );
        return;
      }
      dispatch(
        setModalMessage({
          message: "Account created successfully",
          type: "success",
        })
      );
      setIsLogin(true);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dispatch(
        setModalMessage({
          message: "An error occurred, please refresh and try again",
          type: "error",
        })
      );
    }
  };

  return (
    <div className="w-1/2 p-8 bg-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
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
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create new account
            </button>

            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
