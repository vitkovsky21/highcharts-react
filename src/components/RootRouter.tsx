import { Routes, Route } from "react-router-dom";
import ViewPage from "../pages/View";
import ErrorBoundary from "./ErrorBoundary";
import { SETTINGS_URL, VIEW_URL } from "../utils/constants";
import SettingsPage from "../pages/Settings";

const RootRouter = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path={VIEW_URL} element={<ViewPage />} />
          <Route path={SETTINGS_URL} element={<SettingsPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default RootRouter;
