import React, { lazy, Suspense } from "react";
import "./App.css";
import Loader from "./components/Loader";

const SqlQueryExecutor = lazy(() => import("./pages/SqlQueryExecutor"));


function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <SqlQueryExecutor />
      </Suspense>
    </div>
  );
}

export default App;
