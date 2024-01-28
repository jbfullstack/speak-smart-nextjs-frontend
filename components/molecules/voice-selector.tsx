import React from 'react';

import Selector from '../atoms/selector';
import styles from'./styles/VoiceSelector.module.css';

const VoiceSelector = (className) => {
  return (
    <div className={styles.selector}>
        <Selector 
            options={['Oxyd', 'Shimmer', 'Alloy', 'Fable', 'Nova']}
            displayMessage="Voice:"
            defaultValue="Oxyd"
        />
    </div>
  );
};

export default VoiceSelector;
