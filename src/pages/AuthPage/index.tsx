import { useState } from "react";
import loginPicture from "@/assets/image/LoginPicture.png";
import Login from "@/pages/AuthPage/Login";
import Register from "@/pages/AuthPage/Register";
import LogoWithName from "@/components/Common/LogoWithName";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white relative">
      <div className="absolute left-6 top-8">
        <LogoWithName />
      </div>
      <div className="flex w-3/4 h-[600px]  rounded-lg overflow-hidden">
        {/* Left side - Image */}
        <div className="w-1/2 bg-cover bg-center">
          <img className="mt-2" src={loginPicture} alt="" />
        </div>
        {/* Right side - Form */}
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
