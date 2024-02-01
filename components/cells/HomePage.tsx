import { Button, Card, Divider, Image, Spacer } from "@nextui-org/react";
import Layout from "../layout";

import styles from "./styles/HomePage.module.css";
const logo = "/static/main-logo-no-bg-cropped.png";

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <div className={styles.container}>
        <Card className={styles.card}>
          <h1 className={styles.heading1}>Build Your Personal AI Assistant</h1>
          <p className={styles.paragraph}>
            Fully Customizable: Tailor your AI assistant's personality, voice,
            and functions to fit your life perfectly.
          </p>
          <div className={styles.imageTextContainer}>
            <Image
              src={logo}
              alt="Home page picture"
              className={styles.responsiveImage}
            />
            {/* Text next to the image */}
          </div>

          <h3 className={styles.heading3}>Why YourAI?</h3>
          <p className={styles.paragraph}>
            Fully Customizable: Tailor your AI assistant's personality, voice,
            and functions to fit your life perfectly.
          </p>
          <p className={styles.paragraph}>
            Advanced Conversations: Powered by the latest advancements in AI
            technology.
          </p>
          <p className={styles.paragraph}>
            Privacy-Centric: Your privacy is paramount with state-of-the-art
            encryption and privacy measures.
          </p>
          <Divider />
          <Spacer y={5} />
          <span>Embrace your future</span>
          <Spacer y={1} />
          <span>Build your Jarvis</span>

          <Spacer y={5} />
          <Button
            onClick={() => (window.location.href = "/new-jarvis")}
            className={styles.buttonCustom}
          >
            <span>Start now</span>
          </Button>
        </Card>
      </div>
    </Layout>
  );
}
