import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BaseLayout, Home, Login, NoPage, Profile, Register } from "@/pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/accounts/login" element={<Login />} />
        <Route path="/accounts/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
