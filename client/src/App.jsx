import React from "react"
import { Route, Routes } from "react-router-dom"
import ClassifierPage from "./pages/Classifier"
import MenuPage from "./pages/Menu"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/classifier" element={<ClassifierPage />} />
      </Routes>
    </div>
  )
}

export default App;
