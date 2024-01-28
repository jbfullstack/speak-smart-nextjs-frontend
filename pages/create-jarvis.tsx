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
import React from "react";
import InputSessionname from "../components/atoms/input-sessionname";
import SwitchVerbalChat from "../components/atoms/switch-verbalchat";
import PersonalitySelector from "../components/molecules/personality-selector";
import VoiceSelector from "../components/molecules/voice-selector";
import styles from "./styles/MyJarvis.module.css";

const CreateJarvis: React.FC = () => {
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
            <Button color="primary"> Start Chatting</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateJarvis;
