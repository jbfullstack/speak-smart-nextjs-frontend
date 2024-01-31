import { Accordion, AccordionItem, CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ChatSessionDataFetcher from "../components/molecules/chat-session-data-fetcher";
import CreateChatSession from "../components/molecules/create-new-chatsession";

export interface SessionType {
  uuid: string;
  sessionName: string;
  historyLength: number;
}

const CreateJarvis: React.FC = () => {
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST}/ai-speaker/user/jeremy/sessions`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data: SessionType[] = await response.json();
        setSessions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <Accordion>
      <AccordionItem
        key="CreateChatSession"
        aria-label="Create Chat Session"
        title="Create a new chat session"
      >
        <CreateChatSession />
      </AccordionItem>
      <AccordionItem key="ChatSessionMemory" aria-label="Memory" title="Memory">
        {isLoading ? (
          <CircularProgress label="Fetching chat sessions..." />
        ) : (
          <ChatSessionDataFetcher sessions={sessions} />
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateJarvis;
