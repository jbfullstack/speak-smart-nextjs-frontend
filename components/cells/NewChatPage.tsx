import Layout from "../layout";
import CreateChatSession from "../molecules/create-new-chatsession";

export default function NewChatPage() {
  const title = "New chat";
  return (
    <Layout pageTitle={title}>
      <h1 className="text-4xl font-bold ml-4 p-2">{title}</h1>
      <CreateChatSession />
    </Layout>
  );
}
