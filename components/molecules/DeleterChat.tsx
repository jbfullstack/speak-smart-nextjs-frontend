import { Button, Divider, Spacer } from "@nextui-org/react";

import styles from "./styles/ChatSessionsList.module.css";

export const DeleteChat = ({ sessionId, fetchSessions, setError }) => {
  const endpoint =
    process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST +
    `/ai-speaker/${sessionId}`;

  function deleteChat() {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        username: "jeremy",
      }),
    })
      .then((res) => {
        fetchSessions();
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          setError(null);
        }
      })
      .catch((error) => {
        fetchSessions();
        console.error("Error:", error);
        setError(`Error deleting chat: ${error.message}`); // Set error message in parent component
      });
  }

  return (
    <div
      style={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <div>
        <p className={styles.title}>Confirm</p>
      </div>

      <p>Are you sure you want to delete this chat ?</p>
      <Spacer y={2} />
      <p>By doing this, you will not be able to recover the data.</p>

      <Spacer y={2} />
      <Divider />
      <Spacer y={2} />

      <div className={styles.deleteChattingButtonContainer}>
        <Button color="warning" onClick={deleteChat}>
          {" "}
          Delete{" "}
        </Button>
      </div>
    </div>
  );
};
