import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useHttp } from "../../src/hooks/useHttp";
import InputSessionname from "../atoms/input-sessionname";
import PersonalitySelector from "./personality-selector";
import styles from "./styles/CreateChatSession.module.css";

const avatar = "/static/bot-veal-no-bg.png";

const CreateChatSession = () => {
  const { sendRequest, isLoading, error } = useHttp();
  const [sessionName, setSessionName] = useState("");
  const [voiceType, setVoiceType] = useState("");
  const [personalityType, setPersonalityType] = useState("Funny");
  const [verbalChat, setVerbalChat] = useState(false);
  const { data: session } = useSession();
  const userPseudo = session?.user?.pseudo || "unknow pseudo";
  console.log(JSON.stringify(session));

  const createSession = async () => {
    // Assuming your backend expects session name, voice type, personality type, and verbal chat as part of the request body
    const sessionData = {
      sessionName,
      personality: personalityType,
    };

    await sendRequest(
      `${process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST}/ai-speaker/start-session`,
      "POST",
      sessionData
    );
    // Here, you might want to handle the response, such as showing a success message or handling errors
  };

  return (
    <div className={styles.container}>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image alt="avatar" height={40} radius="sm" src={avatar} width={40} />
          <div className="flex flex-col">
            <p className="text-md">Build your own Jarvis</p>
            <p className="text-small text-default-500">{userPseudo}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <InputSessionname
            value={sessionName}
            onValueChange={setSessionName}
          />
          <Spacer y={8} />
          <p>Define the attribute for your personal Jarvis</p>
          <Divider />
          <div className={styles.selectorsContainer}>
            {/* <VoiceSelector /> */}
            <PersonalitySelector
              value={personalityType}
              onValueChange={setPersonalityType}
            />
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          {/* <SwitchVerbalChat></SwitchVerbalChat> */}
          {isLoading && <Spinner label="Creating session..." color="current" />}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className={styles.startChattingButtonContainer}>
            <Button disabled={isLoading} onClick={createSession}>
              {isLoading ? "Loading..." : "Start Chatting"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateChatSession;
