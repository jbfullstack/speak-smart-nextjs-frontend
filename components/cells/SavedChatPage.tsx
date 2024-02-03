import Layout from "../layout";
import ChatSessionDataFetcher from "../molecules/chat-session-data-fetcher";

export interface SessionType {
  uuid: string;
  sessionName: string;
  historyLength: number;
}

export default function SavedChatPage() {
  const title = "Saved chat";

  return (
    <Layout pageTitle={title}>
      <h1 className="text-4xl font-bold ml-4 p-2">{title}</h1>
      <ChatSessionDataFetcher />
    </Layout>
  );
}
