import { Button, Divider, Spacer } from "@nextui-org/react";

import styles from "./styles/ChatSessionsList.module.css";

export const DeleteChat = ({ sessionId }) => {
  const endpoint =
    process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST +
    `/user/jeremy/chat/${sessionId}/delete`;

  function deleteChat() {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
