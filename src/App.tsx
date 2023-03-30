import { Route, Routes } from "react-router-dom";
import { AppPage } from "./main/pages/AppPage";
import { ErrorPage } from "./main/pages/ErrorPage";
import { GamePage } from "./main/pages/GamePage";
import { LandingPage } from "./main/pages/LandingPage";
import { ProtectedRoute } from "./main/pages/ProtectedRoute";
import { Root } from "./main/pages/Root";
import "./App.css";

function App() {
  return (
    <div className="App flex flex-col">
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/register" element={<LandingPage />} />
          <Route path="/app" element={<ProtectedRoute />}>
            <Route index element={<AppPage />} />
            <Route path="games/:id" element={<GamePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
