import { PlaylistProvider } from "./context/PlaylistContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";

function App() {
  return (
    <PlaylistProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/AppPage" element={<AppPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </PlaylistProvider>
  );
}

export default App;
