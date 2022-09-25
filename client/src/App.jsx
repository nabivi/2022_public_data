import React from "react"
import { Route, Routes } from "react-router-dom"
import ClassifierPage from "./pages/Classifier"
import LoginPage from "./pages/Login"
import MenuPage from "./pages/Menu"
import SignupPage from "./pages/Signup"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="classifier" element={<ClassifierPage />} />
      </Routes>
    </div>
  )
}

export default App;
