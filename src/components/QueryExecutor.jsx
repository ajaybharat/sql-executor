import React, { memo, useCallback, useContext } from "react";
import { QueryContext } from "../pages/SqlQueryExecutor";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { TABLES } from "../constants/tables";
import { Bounce, toast } from "react-toastify";
import { fetchData } from "../helpers/queryHelpers";
import { STYLES } from "./STYLES";

import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-twilight";

const { BUTTON_COLOR } = STYLES;

const QueryExecutor = () => {
  const {
    query,
    setQuery,
    savedQueries,
    setSavedQueries,
    setRecentExecutedQueries,
    setResult,
    setIsExecuting,
  } = useContext(QueryContext);

  const executeQuery = useCallback(async () => {
    const executableQuery = query.toLowerCase();
    const isValidQuery = TABLES.some((table) =>
      executableQuery.includes(table)
    );
    if (isValidQuery) {
      let tableName;
      TABLES.forEach((table) => {
        if (executableQuery.includes(table)) {
          tableName = table;
        }
      });
      setResult([]);
      setIsExecuting(true);

      try {
        const resultPromise = fetchData(tableName);
        const startTime = new Date().getTime();
        toast.promise(
          resultPromise,
          {
            success: {
              render({ data }) {
                setResult(data);
                setIsExecuting(false);
                setRecentExecutedQueries((res) => [
                  { query, type: "success" },
                  ...res,
                ]);
                const timeOfExecution =
                  (new Date().getTime() - startTime) / 1000;
                return `🥳  Fetched ${data.length} results in ${timeOfExecution} seconds`;
              },
            },
            pending: {
              render() {
                return "Please wait...";
              },
            },
            error: {
              render() {
                setRecentExecutedQueries((res) => [
                  { query, type: "error" },
                  ...res,
                ]);
                setIsExecuting(false);
                return "🤕 Opps Query failed, try again";
              },
            },
          },
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      } catch (err) {
        console.error(err);
        setIsExecuting(false);
      }
    } else {
      toast("😑 Wrong query, please check syntax", {
        position: "top-right",
        autoClose: 3000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [query, setIsExecuting, setRecentExecutedQueries, setResult]);

  const handleEditorChange = useCallback(
    (value) => {
      setQuery(value);
    },
    [setQuery]
  );

  const saveQuery = useCallback(() => {
    setSavedQueries([...savedQueries, query]);
  }, [query, savedQueries, setSavedQueries]);

  return (
    <div
      style={{
        backgroundColor: "#eef2ff",
        display: "flex",
        flexDirection: "column",
        margin: "24px",
        padding: "24px",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Execute Sql Query
      </div>

      <AceEditor
        id="sqlEditor"
        aria-label="sqlEditor"
        mode="mysql"
        theme="twilight"
        name="sqlEditor"
        fontSize={18}
        minLines={20}
        maxLines={10}
        width="100%"
        showPrintMargin={false}
        showGutter
        showLineNumbers
        placeholder="SELECT * from tableName"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={query}
        onChange={handleEditorChange}
      />
      <p
        style={{ fontSize: "0.8rem", alignSelf: "center" }}
        className="font-medium text-sm underline pt-3 mb-0"
      >
        <strong>NOTE: </strong>Click on a PreDefined Queries to Begin.
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button style={BUTTON_COLOR} onClick={executeQuery} variant="success">
          <FontAwesomeIcon icon={faPlay} /> Run
        </Button>
        <Button style={BUTTON_COLOR} onClick={saveQuery} variant="primary">
          <FontAwesomeIcon icon={faFloppyDisk} /> Save
        </Button>
        <Button
          style={BUTTON_COLOR}
          onClick={() => setQuery("")}
          variant="danger"
        >
          <FontAwesomeIcon icon={faXmark} /> Clear
        </Button>
      </div>
    </div>
  );
};

export default memo(QueryExecutor);
