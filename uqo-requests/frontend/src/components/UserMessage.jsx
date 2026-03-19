export default function UserMessage({ message }) {
  if (!message) return null;

  return (
    <div style={{
      backgroundColor: "#ffe9e9",
      border: "1px solid #ffaaaa",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "5px"
    }}>
      {message}
    </div>
  );
}