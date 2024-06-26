export const STYLES = {
  LEFT_BAR: {
    maxWidth: "500px",
    textAlign: "center",
    height: "calc(100vh - 72px)",
    overflow: "auto",
    overflowY: "scroll",
    borderRight: "1px solid grey",
    padding: "10px",
  },

  LEFT_BAR_CONTAINER: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#eef2ff",
    borderRadius: "0px",
    cursor: "pointer",
  },
  LEFT_BAR_ITEM: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    alignItems: "center",
    padding: "10px",
    borderRadius: "20px",
    backgroundColor: "white",
  },
  LEFT_BAR_ITEM_CODE_STYLES: {
    color: "#4f46e5",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  EXPANDER_HEADER: {
    display: "flex",
    borderRadius: "20px",
    gap: "10px",
    padding: "20px",
    backgroundColor: "#c7d2fe",
    alignItems: "center",
    cursor: "pointer",
  },
  EXPANDER: {
    display: "flex",
    borderRadius: "20px",
    flexDirection: "column",
    backgroundColor: "#c7d2fe",
  },
  BUTTON: {
    backgroundColor: "#4f46e5",
    display: "flex",
    gap: "5px",
    textDecoration: "none",
    borderColor: "#4f46e5",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 24px",
    borderRadius: "5px",
    color: "white",
  },
  BUTTON_COLOR: { backgroundColor: "#4f46e5", borderColor: "#4f46e5" },
};
