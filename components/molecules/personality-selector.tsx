import Selector from "../atoms/selector";
import styles from "./styles/VoiceSelector.module.css";

const PersonalitySelector = () => {
  return (
    <div className={styles.selector}>
      <Selector
        options={["Funny", "Serious", "Friendly", "Calm", "Cautious"]}
        displayMessage="Personality:"
        defaultValue="Funny"
        selectionChanged={null}
      />
    </div>
  );
};

export default PersonalitySelector;
