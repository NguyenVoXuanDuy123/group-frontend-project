import MessageModal from "@/components/Modal/MessageModal";
import { useAuth } from "@/hooks/useAuth";
import { AuthPage, BaseLayout, Home, NoPage } from "@/pages";
import ProfileLayout from "@/pages/layout/ProfileLayout";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

function ProtectedRoute() {
  const { status, isAuthenticated } = useAuth();

  if (status === "firstLoading") {
    return;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="/:username/*" element={<ProfileLayout />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Global Modals, will trigger from anywhere when dispatch action */}
      <MessageModal />
    </Provider>
  );
}
