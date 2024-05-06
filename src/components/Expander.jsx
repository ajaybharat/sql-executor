import React, { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { STYLES } from "./STYLES";

const Expander = ({ title, open: defaultOpen, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  const { EXPANDER, EXPANDER_HEADER } = STYLES;

  return (
    <div style={EXPANDER}>
      <div style={EXPANDER_HEADER} onClick={() => setOpen((val) => !val)}>
        <FontAwesomeIcon icon={open ? faChevronDown : faChevronRight} />

        <span>{title}</span>
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default memo(Expander);
