import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Loading from "./components/Loading";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const Home = lazy(() => import("./pages/Home"));
const Favorite = lazy(() => import("./pages/Favorite"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>
);
