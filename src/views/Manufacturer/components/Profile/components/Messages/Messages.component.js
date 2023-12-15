import React from 'react';
import styles from './Style.module.css';

const Messages = ({ data }) => {
  const _renderNoteCard = () => {
    return (
      <div>
        <div className={styles.noteCard}>
          <div className={styles.note}>
            Record of the call or email is added here in text.
          </div>
          <div className={styles.recordFlex}>
            <div className={styles.assignedTo}>
              <img
                src={require('../../../../../../assets/img/profile.png')}
                alt=""
                height={30}
              />
              <div className={styles.assignee}>
                <div className={styles.assign}>Ashutosh Prasad</div>
                <div>11/10/2022 | 12:36 PM</div>
              </div>
            </div>
            <div className={styles.event}></div>
          </div>
        </div>
      </div>
    );
  };

  return <div className={styles.plain}>{_renderNoteCard()}</div>;
};

export default Messages;
