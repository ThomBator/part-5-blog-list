const Notification = ({ message, color }) => {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        color: color,
        borderRadius: "10px",
        paddingLeft: "1rem",
        backgroundColor: "lightgray",
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
