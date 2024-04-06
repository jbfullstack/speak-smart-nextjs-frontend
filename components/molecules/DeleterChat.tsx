import { Button, Divider, Spacer, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useHttp } from "../../src/hooks/useHttp";
import styles from "./styles/ChatSessionsList.module.scss";

export const DeleteChat = ({ sessionId, onDeleteSuccess }) => {
  const { sendRequest } = useHttp();
  const [isDeleting, setIsDeleting] = useState(false); // Local state to manage deletion loading status
  const base_url = `${process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST}/ai-speaker`;

  const deleteChat = async () => {
    setIsDeleting(true); // Start loading
    const { status } = await sendRequest(`${base_url}/${sessionId}`, "DELETE");

    if (status === 204) {
      onDeleteSuccess(); // Only invoke onDeleteSuccess if deletion is confirmed
    } else {
      alert("Deletion failed. Please try again.");
    }
    setIsDeleting(false); // End loading
  };

  return (
    <div
      style={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <div>
        <p className={styles.title}>Confirm Deletion</p>
      </div>
      <p>
        Are you sure you want to delete this chat? You will not be able to
        recover the data.
      </p>
      <Spacer y={2} />
      <Divider />
      <Spacer y={2} />
      <div className={styles.deleteChattingButtonContainer}>
        {isDeleting ? (
          <Spinner /> // Display Spinner while deleting
        ) : (
          <Button color="warning" onClick={deleteChat}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};
