const Notification = ({ message }) => {
  return (
    <div
      style={{
        border: "2px solid red",
        color: "red",
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
