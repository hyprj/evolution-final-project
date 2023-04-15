import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./main/pages/Dashboard";
import { ErrorPage } from "./main/pages/ErrorPage";
import { LandingPage } from "./main/pages/LandingPage";
import ProtectedRoute from "./main/pages/ProtectedRoute";
import { Root } from "./main/pages/Root";
import { LoginPage } from "./main/pages/LoginPage";
import { RegisterPage } from "./main/pages/RegisterPage";
import { GamesPage } from "./main/pages/games";
import { RoulettePage } from "./main/pages/roulette-page";
import "./App.css";

function App() {
  return (
    <div className="App flex flex-col">
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/app" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="games">
              <Route index element={<GamesPage />} />
              <Route path="roulette" element={<RoulettePage />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
