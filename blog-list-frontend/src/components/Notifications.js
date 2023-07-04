import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message, color }) => {
  return (
    <p
      id="notification"
      style={{
        border: `2px solid ${color}`,
        color: color,
        borderRadius: "10px",
        paddingLeft: "1rem",
        backgroundColor: "lightgray",
      }}
    >
      {message}
    </p>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
};

export default Notification;
