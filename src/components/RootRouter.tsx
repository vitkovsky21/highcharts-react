import { Routes, Route } from "react-router-dom";
import ViewPage from "../pages/View";
import ErrorBoundary from "./ErrorBoundary";
import { VIEW_URL } from "../utils/constants";

const RootRouter = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path={VIEW_URL} element={<ViewPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default RootRouter;
