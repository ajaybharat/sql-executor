import React, { memo, useContext } from "react";
import Expander from "./Expander";
import { STYLES } from "./STYLES";
import { TABLES } from "../constants/tables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightToBracket";
import { QueryContext } from "../pages/SqlQueryExecutor";
import Badge from "react-bootstrap/Badge";

const BADGE_TYPE_MAP = {
  success: "success",
  error: "danger",
};

const LeftBar = () => {
  const { setQuery, savedQueries, recentExecutedQueries } =
    useContext(QueryContext);

  const {
    LEFT_BAR,
    LEFT_BAR_CONTAINER,
    LEFT_BAR_ITEM_CODE_STYLES,
    LEFT_BAR_ITEM,
  } = STYLES;

  return (
    <div style={LEFT_BAR}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Expander open={true} title={"PreDefined Queries"}>
          <div style={LEFT_BAR_CONTAINER}>
            {TABLES.map((table) => (
              <div
                style={LEFT_BAR_ITEM}
                key={table}
                onClick={() => {
                  setQuery(`SELECT * FROM ${table}`);
                }}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <code style={LEFT_BAR_ITEM_CODE_STYLES}>
                  SELECT * FROM {table}
                </code>
              </div>
            ))}
          </div>
        </Expander>
        <Expander title={"Saved Queries"}>
          <div style={LEFT_BAR_CONTAINER}>
            {savedQueries.map((query) => (
              <div
                style={LEFT_BAR_ITEM}
                key={query}
                onClick={() => {
                  setQuery(query);
                }}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <code style={LEFT_BAR_ITEM_CODE_STYLES}>{query}</code>
              </div>
            ))}
          </div>
        </Expander>
        <Expander title={"Recent Executed Queries"}>
          <div style={LEFT_BAR_CONTAINER}>
            {recentExecutedQueries.map(({ query, type }) => (
              <div
                style={LEFT_BAR_ITEM}
                key={query}
                onClick={() => {
                  setQuery(query);
                }}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <code style={LEFT_BAR_ITEM_CODE_STYLES}>{query}</code>
                <Badge bg={BADGE_TYPE_MAP[type]}>{type}</Badge>
              </div>
            ))}
          </div>
        </Expander>
      </div>
    </div>
  );
};

export default memo(LeftBar);
