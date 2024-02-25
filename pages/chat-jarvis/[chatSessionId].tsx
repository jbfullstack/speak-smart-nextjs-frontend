import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import ChatMessage from "../../components/molecules/ChatMessage";
import { useHttp } from "../../src/hooks/useHttp";
import styles from "./styles/ChatJarvisSession.module.css";

const chatHistory_baseUrl = `${process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST}/ai-speaker/sessions-history-list`;
const chatting_baseUrl = `${process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST}/ai-speaker/text-chatting`;

const ChatJarvis = () => {
  const router = useRouter();
  const { chatSessionId } = router.query;
  const { sendRequest, isLoading, data: chatData } = useHttp();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sessionName, setSessionName] = useState("");

  // Fetch chat history on mount
  useEffect(() => {
    if (chatSessionId) {
      sendRequest(chatHistory_baseUrl, "POST", {
        sessionId: chatSessionId,
        retrieveSystemMessage: false,
      });
    }
  }, [chatSessionId, sendRequest]);

  // Update messages when chatData updates
  useEffect(() => {
    console.log("chatData", chatData);

    // Check if the response is for the initial chat history load
    if (chatData && Array.isArray(chatData.data)) {
      // Expecting chatData.data to be an array of message objects
      setSessionName(chatData.data[0]?.sessionName);
      setMessages(chatData.data[0]?.messages || []);
    }
    // Check if the response is for a new message being added
    else if (
      chatData &&
      !Array.isArray(chatData.data) &&
      chatData.status === 201
    ) {
      // Expecting chatData.data to be a single message object
      setMessages((currentMessages) => [
        ...currentMessages,
        chatData.data, // Directly use the data object since it's already a message
      ]);
    }
    // If the data does not match expected structures, log an error
    else if (chatData) {
      console.error("Unexpected data structure:", chatData);
    }
  }, [chatData]);

  const sendMessage = async () => {
    const userMessage = {
      message: newMessage,
      date: new Date().toISOString(),
      type: "human",
    };

    const response = await sendRequest(
      `${chatting_baseUrl}/${chatSessionId}`,
      "POST",
      { message: newMessage }
    );

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    if (response.status === 201) {
      setMessages((prevMessages) => [...prevMessages, response.data.message]);
    } else {
      // Handle error case
    }

    setNewMessage(""); // Clear input after sending
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Layout pageTitle="Chat">
      <div className={styles.container}>
        <Card className="max-w-[400px]">
          <CardHeader className={`flex gap-3 ${styles.cardHeader}`}>
            {" "}
            {sessionName}
            <Spacer x={20} />
            {isLoading && (
              <Spinner label="Loading sessions..." color="current" />
            )}
          </CardHeader>
          <Divider />
          <CardBody className={styles.cardBody}>
            <div className={styles.chatContainer}>
              {/* Display each message */}
              {messages.map((msg, index) =>
                msg ? <ChatMessage key={index} message={msg} /> : null
              )}
              <div ref={messagesEndRef} />{" "}
              {/* Scroll to bottom on new message */}
            </div>
          </CardBody>
          <Divider />
          <CardFooter className={styles.cardFooter}>
            <div className={styles.inputSection}>
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                onKeyUp={(e) => {
                  if (e.key === "Enter" && newMessage.trim() !== "") {
                    sendMessage();
                  }
                }}
              />
              <Spacer x={10} />
              <Button onClick={sendMessage} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ChatJarvis;
