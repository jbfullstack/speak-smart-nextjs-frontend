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
      <ChatSessionDataFetcher />
    </Layout>
  );
}
