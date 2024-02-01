import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Spacer,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import React from "react";
import InputSessionname from "../atoms/input-sessionname";
import SwitchVerbalChat from "../atoms/switch-verbalchat";
import PersonalitySelector from "./personality-selector";
import styles from "./styles/CreateChatSession.module.css";
import VoiceSelector from "./voice-selector";

const CreateChatSession: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const buttonStyle = {
    backgroundColor: isDark ? "#0072F5" : "",
    color: "white", // Set text color if needed
    // Add other styling as necessary
  };

  return (
    <div className={styles.container}>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="/jarvis-logo.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Build your own Jarvis</p>
            <p className="text-small text-default-500">Jarvis's master</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <InputSessionname />
          <Spacer y={8} />
          <p>Define the attribute for your personal Jarvis</p>
          <Divider />
          <div className={styles.selectorsContainer}>
            <VoiceSelector />
            <PersonalitySelector />
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <SwitchVerbalChat></SwitchVerbalChat>
          <div className={styles.startChattingButtonContainer}>
            {/* <Button style={buttonStyle}>Start Chatting</Button> */}
            <Button>Start Chatting</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateChatSession;
