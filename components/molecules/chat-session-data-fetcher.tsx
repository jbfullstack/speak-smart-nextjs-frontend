import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spacer,
} from "@nextui-org/react";

import styles from "./styles/ChatSessionsList.module.css";

export interface SessionType {
  uuid: string;
  sessionName: string;
  historyLength: number;
}

const avatar = "/static/bot-veal-no-bg.png";

const ChatSessionDataFetcher = ({ sessions }: { sessions: SessionType[] }) => {
  if (!sessions || !sessions.length) return null; // Display nothing if array is empty

  return (
    <div className={styles.container}>
      {sessions.map((session) => (
        <Card key={session.uuid} className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <img alt="avatar" height={40} src={avatar} width={40} />
            <div className="flex flex-col">
              <p className="text-md">{session.sessionName}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Spacer y={8} />
            <p>History Length: {session.historyLength}</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button color="warning"> Delete </Button>
            <div className={styles.continueChattingButtonContainer}>
              <Button> Continue </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ChatSessionDataFetcher;
