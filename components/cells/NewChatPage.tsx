import Layout from "../layout";
import CreateChatSession from "../molecules/create-new-chatsession";

export default function NewChatPage() {
  const title = "New chat";
  return (
    <Layout pageTitle={title}>
      <h1 className="text-4xl">{title}</h1>
      <CreateChatSession />
      {/* <div className="min-h-screen flex flex-col">
        <div className="m-auto">
          <h1 className="text-4xl">{title}</h1>
        </div>
      </div> */}
    </Layout>
  );
}
