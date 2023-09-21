import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./feature/authentication/Login";
import JoinNow from "./feature/authentication/JoinNow";
import MainLayout from "./ui/MainLayout";
import SideMenu from "./ui/SideMenu";
import Form from "./feature/form/Form";
import CityContextProvider from "./contexts/CityContext";
import PageNotFound from "./ui/PageNotFound";
import SingleCity from "./feature/city/SingleCity";
import AuthenticationContextProvider from "./contexts/Authentication";
import ProtectedRoute from "./feature/authentication/ProtectedRoute";
export default function App() {
  return (
    <AuthenticationContextProvider>
      <CityContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="join-now" element={<JoinNow />} />
            <Route
              path="map"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="location" />} />
              <Route path="location" element={<SideMenu />} />
              <Route path="location/:id" element={<SingleCity />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CityContextProvider>
    </AuthenticationContextProvider>
  );
}
