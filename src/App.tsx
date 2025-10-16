import { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import SignInScreen from "@/pages/sign-in-screen";
import SignUpScreen from "@/pages/sign-up-screen";
import HomeScreen from "./pages/home-screen";
import ManageUsersScreen from "./pages/manage-user-screen";
import PersonalPreferenceScreen from "./pages/personal-preference-screen";
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/manage-users" element={<ManageUsersScreen />} />
          <Route
            path="/personal-preference"
            element={<PersonalPreferenceScreen />}
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
