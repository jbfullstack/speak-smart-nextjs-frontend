import Layout from "../layout";
import CreateChatSession from "../molecules/create-new-chatsession";

export default function NewChatPage() {
  const title = "New chat";
  return (
    <Layout pageTitle={title}>
      <CreateChatSession />
    </Layout>
  );
}
