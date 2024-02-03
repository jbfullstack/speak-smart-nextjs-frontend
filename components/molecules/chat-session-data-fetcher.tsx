import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import CustomErrorAlert from "../atoms/CustomErrorDisplayer";
import { DeleteChat } from "./DeleterChat";
import styles from "./styles/ChatSessionsList.module.css";

export interface SessionType {
  uuid: string;
  sessionName: string;
  historyLength: number;
}

const avatar = "/static/bot-veal-no-bg.png";

const ChatSessionDataFetcher = ({}: { sessions: SessionType[] }) => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST}/ai-speaker/user/jeremy/sessions`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  // if (error) return <div>Error: {error}</div>;
  if (isLoading) return <Spinner label="Loading sessions..." color="warning" />;

  return (
    <div className={styles.container}>
      {error && (
        <CustomErrorAlert
          severity="danger"
          error={error}
          onClose={clearError}
        />
      )}

      <div className={styles.cardsContainer}>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <Card key={session.uuid} className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <img alt="avatar" height={40} src={avatar} width={40} />
                <div className="flex flex-col">
                  <p className="text-md">{session.sessionName}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                {/* <Spacer y={8} /> */}
                <p>Request made: {(session.historyLength - 1) / 2}</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Popover>
                  <PopoverTrigger>
                    <Button color="warning"> Delete </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <DeleteChat
                      sessionId={session.uuid}
                      fetchSessions={fetchSessions}
                      setError={setError}
                    />
                  </PopoverContent>
                </Popover>

                <div className={styles.continueChattingButtonContainer}>
                  <Button> Continue </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div>No Saved Sessions</div>
        )}
      </div>
    </div>
  );
};

export default ChatSessionDataFetcher;
