import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons/faFileExcel";
import { QueryContext } from "../pages/SqlQueryExecutor";
import { CSVLink } from "react-csv";
import { toast, Bounce } from "react-toastify";
import { STYLES } from "./STYLES";

const DataTable = () => {
  const { result, isExecuting } = useContext(QueryContext);

  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState([]);

  const [colDefs, setColDefs] = useState();

  const { BUTTON } = STYLES;

  useEffect(() => {
    if (isExecuting) {
      setRowData([]);
      setColDefs([]);
    } else if (result.length > 0) {
      setColDefs(
        Object.keys(result[0]).map((key) => ({
          field: key,
        }))
      );
      setRowData(result);

      setTimeout(() => gridApi?.sizeColumnsToFit(), 0);
    } else {
      setRowData([]);
      setColDefs([]);
    }
  }, [result, isExecuting, setRowData, setColDefs, gridApi]);

  const onGridReady = useCallback(({ api }) => {
    setGridApi(api);
  }, []);

  const exportAsCsv = useCallback(() => {
    toast("🥳 File Downloading...", {
      position: "top-right",
      autoClose: 3000,
      type: "sucess",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }, []);

  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>Output:</div>
        <CSVLink style={BUTTON} data={result} onClick={exportAsCsv}>
          <FontAwesomeIcon onClick={exportAsCsv} icon={faFileExcel} /> Export as
          CSV
        </CSVLink>
      </div>
      <div
        style={{
          [`--ag-header-background-color`]: "#c7d2fe",
          [`--ag-odd-row-background-color`]: `#eef2ff`,
          height: "100%",
          display: `${rowData.length > 0 ? "block" : "none"}`,
        }}
        className="ag-theme-quartz"
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onGridReady={onGridReady}
        />
      </div>
      {rowData.length === 0 && (
        <div
          style={{ alignSelf: "center", fontSize: "20px", fontWeight: "bold" }}
        >
          Please run query to see data
        </div>
      )}
      {isExecuting && <Loader />}
    </div>
  );
};

export default memo(DataTable);
