import React, { useMemo, useState, createContext } from "react";

import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import Header from "../components/Header";
import QueryExecutor from "../components/QueryExecutor";
import LeftBar from "../components/LeftBar";
import DataTable from "../components/DataTable";

export const QueryContext = createContext({
  query: "",
  setQuery: () => {},
  savedQueries: [],
  setSavedQueries: () => {},
  recentExecutedQueries: [],
  setRecentExecutedQueries: () => {},
  result: [],
  setResult: () => {},
  isExecuting: false,
  setIsExecuting: () => {},
});

function SqlQueryExecutor() {
  const [query, setQuery] = useState("");
  const [savedQueries, setSavedQueries] = useState([]);
  const [recentExecutedQueries, setRecentExecutedQueries] = useState([]);
  const [result, setResult] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const queryContextValue = useMemo(
    () => ({
      query,
      setQuery,
      savedQueries,
      setSavedQueries,
      recentExecutedQueries,
      setRecentExecutedQueries,
      result,
      setResult,
      isExecuting,
      setIsExecuting,
    }),
    [
      query,
      setQuery,
      savedQueries,
      setSavedQueries,
      recentExecutedQueries,
      setRecentExecutedQueries,
      result,
      setResult,
      isExecuting,
      setIsExecuting,
    ]
  );

  return (
    <QueryContext.Provider value={queryContextValue}>
      <ToastContainer />
      <div
        style={{
          display: "grid",
          grid: `
              " header header   " max-content
              " left executor   " 1fr
              " left  output  " 1fr
              / 1fr   2.6fr
            `,
        }}
      >
        <div style={{ gridArea: "header" }}>
          <Header />
        </div>
        <div style={{ gridArea: "left" }}>
          <LeftBar />
        </div>
        <div style={{ gridArea: "executor" }}>
          <QueryExecutor />
        </div>
        <div style={{ gridArea: "output" }}>
          <DataTable />
        </div>
      </div>
    </QueryContext.Provider>
  );
}

export default SqlQueryExecutor;
