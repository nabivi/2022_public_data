import React from "react"
import { Route, Routes } from "react-router-dom"
import ClassifierPage from "./pages/Classifier"
import LoginPage from "./pages/Login"
import MainPage from "./pages/Main"
import MyInfoPage from "./pages/MyInfo"
import SignupPage from "./pages/Signup"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="classifier" element={<ClassifierPage />} />
        <Route path="myinfo" element={<MyInfoPage />} />
      </Routes>
    </div>
  )
}

export default App;
