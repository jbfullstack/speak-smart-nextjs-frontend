import PropTypes from "prop-types";
import { CSSProperties, useState } from "react";

CustomErrorAlert.propTypes = {
  error: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["warning", "danger"]).isRequired,
};

function CustomErrorAlert({ error, severity, onClose }) {
  if (!error) return null;

  const [hover, setHover] = useState(false);

  const errorStyles: CSSProperties = {
    display: "flex", // Enables flexbox layout
    justifyContent: "space-between", // Positions items to space between (alert text to the left, button to the right)
    alignItems: "center", // Vertically centers items in the container
    padding: "16px",
    margin: "20px 0",
    backgroundColor: severity === "warning" ? "#fff3cd" : "#ffdddd",
    borderLeft: `6px solid ${severity === "warning" ? "#ffa502" : "#f44336"}`,
    borderRadius: "4px",
    color: severity === "warning" ? "darkorange" : "darkred",
  };

  const closeButtonStyle: CSSProperties = {
    cursor: "pointer",
    border: "1px solid",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    color: "inherit",
    fontSize: "16px",
    outline: "none",
  };

  const closeButtonHoverStyle = {
    ...closeButtonStyle,
    backgroundColor: hover ? "#f2f2f2" : "transparent", // Changes background on hover
    border: hover ? "1px solid #ccc" : "1px solid", // Optionally change border color on hover
  };

  return (
    <div style={errorStyles}>
      <strong>{severity === "warning" ? "Warning:" : "Error:"}</strong> {error}
      <button
        onClick={onClose}
        style={closeButtonHoverStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        X
      </button>
    </div>
  );
}

export default CustomErrorAlert;
