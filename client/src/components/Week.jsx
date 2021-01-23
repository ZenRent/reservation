import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import styles from './styles/Week.css';

const Week = ({ week }) => {
  let number = -1;
  const days = week.map((day) => {
    number += 1;
    return <Day key={day + number} day={day} />;
  });

  return (
    <div className={styles.weekRow}>
      {days}
    </div>
  );
};

export default Week;

Week.propTypes = {
  // week: PropTypes.array.isRequired,
  // week: PropTypes.arrayOf(PropTypes.object).isRequired,
  week: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])).isRequired,
  // week: PropTypes.oneOfType([PropTypes.string, PropTypes.shape(PropTypes.object)]).isRequired,
};
