import { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import SignInScreen from "@/pages/sign-in-screen";
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInScreen />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
