import Selector from "../atoms/selector";
import styles from "./styles/VoiceSelector.module.scss";

const PersonalitySelector = ({ value, onValueChange }) => {
  return (
    <div className={styles.selector}>
      <Selector
        options={["Funny", "Serious", "Friendly", "Calm", "Cautious"]}
        displayMessage="Personality:"
        defaultValue={value}
        selectionChanged={onValueChange}
      />
    </div>
  );
};

export default PersonalitySelector;
