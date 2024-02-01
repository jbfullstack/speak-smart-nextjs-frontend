import { useEffect, useState } from "react";
import Layout from "../layout";
import ChatSessionDataFetcher from "../molecules/chat-session-data-fetcher";

export interface SessionType {
  uuid: string;
  sessionName: string;
  historyLength: number;
}

export default function SavedChatPage() {
  const title = "Saved chat";
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
    <Layout pageTitle={title}>
      <h1 className="text-4xl">{title}</h1>
      <ChatSessionDataFetcher sessions={sessions} />
      {/* <div className="min-h-screen flex flex-col">
        <div className="m-auto">
          <h1 className="text-4xl">{title}</h1>
        </div>
      </div> */}
    </Layout>
  );
}
