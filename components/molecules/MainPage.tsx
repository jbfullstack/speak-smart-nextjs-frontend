import { Button, Card, Spacer } from "@nextui-org/react";
import Layout from "../layout";

const logo = "/static/main-logo-no-bg-cropped.png";

export default function MainPage() {
  return (
    <Layout pageTitle="Home">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          // backgroundImage: `url(${logo})`,
          // backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          padding: "1rem",
          boxSizing: "border-box",

          textAlign: "center", // Center align the text
        }}
      >
        <Card
          style={{
            maxWidth: "800px",
            padding: "$10",
            textAlign: "center",
          }}
        >
          {/* Explicit styles for headings and paragraph */}
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              marginBottom: "0.5em",
            }}
          >
            Build Your Personal AI Assistant
          </h1>
          <p
            style={{
              flexGrow: 1, // Allow text to fill the available space
              marginBottom: "1em",
            }}
          >
            Fully Customizable: Tailor your AI assistant's personality, voice,
            and functions to fit your life perfectly.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Align items vertically
              justifyContent: "space-between", // Space between the image and text
              flexWrap: "wrap", // Ensure responsiveness
            }}
          >
            {/* Responsive image */}
            <img
              src={logo}
              alt="YourAI Logo"
              style={{
                maxWidth: "100%", // Make image responsive
                flexBasis: "auto", // Allow the image to grow
                height: "auto", // Keep the aspect ratio
                marginRight: "20px", // Space between image and text
              }}
            />
            {/* Text next to the image */}
          </div>

          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.5em",
            }}
          >
            Why YourAI?
          </h3>
          <p style={{ marginBottom: "0.2em" }}>
            Fully Customizable: Tailor your AI assistant's personality, voice,
            and functions to fit your life perfectly.
          </p>
          <p style={{ marginBottom: "0.2em" }}>
            Advanced Conversations: Powered by the latest advancements in AI
            technology.
          </p>
          <p style={{ marginBottom: "1em" }}>
            Privacy-Centric: Your privacy is paramount with state-of-the-art
            encryption and privacy measures.
          </p>
          {/*
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.5em",
            }}
          >
            How It Works
          </h3>
           <p style={{ marginBottom: "0.2em" }}>
            1. Sign Up: Quick and easy. Start by creating your account.
          </p>
          <p style={{ marginBottom: "0.2em" }}>
            2. Customize: Use our intuitive builder to design your AI assistant.
          </p>
          <p style={{ marginBottom: "1em" }}>
            3. Interact: Start conversing with your AI.
          </p>
          <p style={{ marginBottom: "2em" }}>
            Join us on this exciting journey to redefine what a personal
            assistant can be. Sign up today and start building your very own AI
            companion with YourAI. The future is personalized, and it begins
            with YourAI.
          </p> */}
          <Spacer y={5} />
          <Button
            onClick={() => (window.location.href = "/new-jarvis")}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: "1.5", // Adjust line height as needed
              padding: "20px", // Increase padding to provide more space for the text
              height: "auto", // Adjust height dynamically based on content
              gap: "4px", // Add gap between lines if needed
            }}
          >
            <span>Embrace your future</span>
            <span>Build your Jarvis</span>
            <span>Start now</span>
          </Button>
        </Card>
      </div>
    </Layout>
  );
}
