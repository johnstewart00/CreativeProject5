import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddPlayer from "./pages/AddPlayer";
import MoreStats from "./pages/MoreStats";
import './App.css';



function App() {
  // setup state

  // render results
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="AddPlayer" element={<AddPlayer />} />
          <Route path="MoreStats" element={<MoreStats />} />
          <Route path="*" element={<Navigate to="/" />}  />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;