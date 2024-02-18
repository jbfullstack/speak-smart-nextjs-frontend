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

import { useEffect, useRef, useState } from "react";
import { authAxios } from "../../lib/utils/authAxios";
import { getTokens } from "../../lib/utils/sessionToken";
import CustomErrorAlert from "../atoms/CustomErrorDisplayer";
import { DeleteChat } from "./DeleterChat";
import styles from "./styles/ChatSessionsList.module.css";

export interface SessionType {
  uuid: string;
  sessionName: string;
  historyLength: number;
}

const avatar = "/static/bot-veal-no-bg.png";
const not_found_picture = "/static/errors/404_not_found_cute_robot_no_bg.png";
const searching_picture =
  "/static/errors/404_not_found_stand_up_robot_no_bg.png";

const ChatSessionDataFetcher = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchSessions();
      isFetchedRef.current = true;
    }
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const tokens = await getTokens();
      const response = await authAxios.get(
        `${process.env.NEXT_PUBLIC_NESTJS_BACKEND_API_HOST}/ai-speaker/sessions-list`
      );
      if (response.status !== 200) {
        setError(`Error fetching sessions list ${error.message}`);
        // throw new Error("Error fetching sessions list: " + response.status);
      }

      const data = await response.data;
      console.log("data", data.data);
      setSessions(data.data);
    } catch (error) {
      console.error("Error:", JSON.stringify(error));
      setError(`${error.message}`);
    } finally {
      setIsLoading(false);
      isFetchedRef.current = false;
    }
  };

  const clearError = () => setError(null);

  if (isLoading)
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
            className="notFoundImage"
          />
        </div>
        {/* </div> */}
      </>
    );

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
                <p>Request made: {(session.numberOfmessages - 1) / 2}</p>
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
          <div className={styles.centerContent}>
            <div className={styles.textConten}>No session found</div>
            <Image
              alt="not found picture"
              src={not_found_picture}
              radius="sm"
              className="notFoundImage"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSessionDataFetcher;
