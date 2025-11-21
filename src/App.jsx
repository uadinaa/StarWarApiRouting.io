import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

function App() {
  return (
      <div>
          <Header />
          <main style={{ padding: "20px" }}>
              <Outlet /> {}
          </main>
      </div>
  )
}

export default App;