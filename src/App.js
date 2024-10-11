import { routes } from "./routes";
import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import "./App.scss";

function App() {
  function RouteLayout({ path }) {
    const element = useRoutes(path);
    return element;
  }
  return (
    <>
      <Suspense
        fallback={
          <div className="loading">
            <div className="loading_box"></div>
          </div>
        }
      >
        <RouteLayout path={routes()} />
      </Suspense>
    </>
  );
}

export default App;
