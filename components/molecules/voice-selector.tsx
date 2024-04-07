import Selector from "../atoms/selector";
import styles from "./styles/VoiceSelector.module.scss";

const alloySound = "static/sounds/voices/voice-alloy.mp3";
const fableSound = "static/sounds/voices/voice-fable.mp3";
const novaSound = "static/sounds/voices/voice-nova.mp3";
const onyxSound = "static/sounds/voices/voice-onyx.mp3";
const shimmerSound = "static/sounds/voices/voice-shimmer.mp3";

const sounds = {
  Onyx: onyxSound,
  Shimmer: shimmerSound,
  Alloy: alloySound,
  Fable: fableSound,
  Nova: novaSound,
};

const VoiceSelector = (className) => {
  const handleSelectionChange = (key) => {
    console.log("handleSelectionChange", key);
    const newVoice = key; // Assuming the keys argument is an array of selected values
    const soundUrl = sounds[newVoice];
    if (soundUrl) {
      const audio = new Audio(soundUrl);
      audio
        .play()
        .then(() => console.log("Playback started!"))
        .catch((error) => console.error("Playback failed:", error));
    }
  };

  return (
    <div className={styles.selector}>
      <Selector
        options={["Onyx", "Shimmer", "Alloy", "Fable", "Nova"]}
        displayMessage="Voice:"
        defaultValue="Onyx"
        selectionChanged={handleSelectionChange}
      />
    </div>
  );
};

export default VoiceSelector;
