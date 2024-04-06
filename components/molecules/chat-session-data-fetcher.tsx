import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useHttp } from "../../src/hooks/useHttp";
import CustomErrorAlert from "../atoms/CustomErrorDisplayer";
import { DeleteChat } from "./DeleterChat";
import styles from "./styles/ChatSessionsList.module.scss";

export interface SessionType {
  uuid: string;
  sessionName: string;
  historyLength: number;
}

const avatar = "/static/bot-veal-no-bg.png";
const not_found_picture = "/static/errors/404_not_found_cute_robot_no_bg.png";
const searching_picture =
  "/static/errors/404_not_found_stand_up_robot_no_bg.png";
const backendGetSessionListUrl = `${process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST}/ai-speaker/sessions-list`;

const ChatSessionDataFetcher = () => {
  const router = useRouter();
  const {
    isLoading,
    error,
    data: sessions,
    sendRequest,
    clearError,
  } = useHttp();
  const [localSessions, setLocalSessions] = useState([]);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      sendRequest(backendGetSessionListUrl);
      isFetchedRef.current = true;
    }
  }, [sendRequest]);

  useEffect(() => {
    if (sessions && Array.isArray(sessions.data)) {
      setLocalSessions(sessions.data);
    } else {
      setLocalSessions([]);
    }
  }, [sessions]);

  const handleDeleteSuccess = (sessionId) => {
    setLocalSessions((currentSessions) =>
      currentSessions.filter((session) => session.uuid !== sessionId)
    );
  };

  const redirectToChat = (uuid) => {
    router.push(`/chat-jarvis/${uuid}`);
  };

  if (isLoading) {
    return (
      <>
        <Spinner label="Loading sessions..." color="warning" />
        {/* <div className={styles.container}> */}
        <div className={styles.centerContent}>
          {/* <div className={styles.textConten}>No session found</div> */}
          <Image
            alt="not found picture"
            src={searching_picture}
            radius="sm"
            className={`notFoundImage ${styles.loading_image}`}
          />
        </div>
        {/* </div> */}
      </>
    );
  } else if (localSessions.length > 0) {
    return (
      <div className={styles.container}>
        {error && (
          <CustomErrorAlert
            severity="danger"
            error={error}
            onClose={clearError}
          />
        )}

        {/* <div> */}
          {/* {localSessions.length > 0 ? ( */}
            {localSessions.map((session) => (
              <div className={styles.cardsContainer}>
              <Card key={session.uuid} className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                  <Image className={`${styles.avatar_image}`} alt="avatar" src={avatar} />
                  <div className="flex flex-col">
                    <p className="text-md">{session.sessionName}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Request made: {session.numberOfmessages}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Popover>
                    <PopoverTrigger>
                      <Button color="warning">Delete</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <DeleteChat
                        sessionId={session.uuid}
                        onDeleteSuccess={() =>
                          handleDeleteSuccess(session.uuid)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <div className={styles.startChattingButtonContainer}>
                    {" "}
                    <Button onClick={() => redirectToChat(session.uuid)}>
                      Chat
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              </div>
            ))
          }
      </div>
          );
  } else {
  return(
    <div className={styles.centerContent}>
      <p>No sessions found</p>
      <Image className={`${styles.not_found_image}`} alt="not found" src={not_found_picture} width="100%" />
    </div>
    );
  }
};

export default ChatSessionDataFetcher;
