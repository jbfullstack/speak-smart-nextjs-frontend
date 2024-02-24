import styles from "./styles/ChatMessage.module.css";

const ChatMessage = ({ message }) => {
  // Add a dark mode check here if you have a state or context to determine the mode
  //   const isDarkMode = true; // Replace with actual check for dark mode

  const messageClass =
    message.type.toLowerCase() === "ai" ? styles.ai : styles.human;

  return (
    <div className={`${styles.message} ${messageClass} `}>
      <p>{message.message}</p>
      <span>{message.date}</span>
    </div>
  );
};

export default ChatMessage;
