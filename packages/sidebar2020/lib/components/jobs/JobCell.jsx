import React from 'react';

const JobCell = ({ variant = 'small', ...rest }) =>
  variant === 'small' ? (
    <JobCellSmall {...rest} />
  ) : variant === 'medium' ? (
    <JobCellMedium {...rest} />
  ) : (
    <JobCellLarge {...rest} />
  );

const JobCellSmall = ({ document: job }) => {
  const { company } = job;
  return <div>{company}</div>;
};
const JobCellMedium = ({ document: job }) => {
  const { company } = job;
  return <div>{company}</div>;
};
const JobCellLarge = ({ document: job }) => {
  const { company } = job;
  return <div>{company}</div>;
};

export default JobCell;
