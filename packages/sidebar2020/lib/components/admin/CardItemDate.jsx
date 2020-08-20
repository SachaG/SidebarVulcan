import React from 'react';
import moment from 'moment';

const CardItemDate = ({ value }) => {
  const m = moment(new Date(value));
  return (
    <div className="contents-date">
      <div>
        <span className="date-year">{m.format('YYYY')}</span>
        <span className="date-month">{m.format('MM')}</span>
        <span className="date-day">{m.format('DD')}</span>
      </div>
      <div>
        <span className="date-time">{m.format('hh:mm')}</span>
      </div>
    </div>
  );
};

export default CardItemDate;