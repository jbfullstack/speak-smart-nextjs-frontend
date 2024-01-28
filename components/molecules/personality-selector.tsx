import React from 'react';

import Selector from '../atoms/selector';
import styles from'./styles/VoiceSelector.module.css'

const PersonalitySelector = () => {
  return (
    <div className={styles.selector}>
        <Selector 
            options={['Funny', 'Serious', 'Friendly', 'Calm', 'Cautious']}
            displayMessage="Personality:"
            defaultValue="Funny"
        />
    </div>
  );
};

export default PersonalitySelector;
