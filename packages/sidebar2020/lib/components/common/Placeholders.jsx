import React from 'react';

const background = '#f2f2f2';

const style = {
  background,
  height: 18,
  marginBottom: 10,
  display: 'block',
};

const getWidth = (min = 50, max = 100) => Math.floor(Math.random() * (max - min) + min);

export const DomainPlaceholder = ({ className = '' }) => (
  <div className={`placeholder placeholder-domain ${className}`} style={{ ...style, width: getWidth(30, 50) + '%' }} />
);

export const TitlePlaceholder = ({ className = '' }) => (
  <div
    className={`placeholder placeholder-title ${className}`}
    style={{ ...style, height: 26, width: getWidth(85, 100) + '%' }}
  />
);

export const BodyPlaceholder = ({ className = '' }) => {
  const w1 = getWidth(80, 100);
  const w2 = getWidth(40, w1);

  return (
    <div className={`placeholder placeholder-body ${className}`}>
      <div style={{ ...style, width: w1 + '%' }} />
      <div style={{ ...style, width: w2 + '%' }} />
    </div>
  );
};

export const AvatarPlaceholder = ({ className = '' }) => (
  <div
    className={`placeholder placeholder-avatar ${className}`}
    style={{ background, borderRadius: '100%', height: 24, width: 24 }}
  />
);

export const CategoriesPlaceholder = ({ className = '' }) => {
  const count = Math.floor(Math.random() * (3 - 1) + 1);
  return (
    <div className={`placeholder placeholder-categories ${className}`} style={{ width: '100%' }}>
      {[...Array(count)].map((x, i) => (
        <div
          key={i}
          className="category-cell category-cell-small"
          style={{ ...style, marginBottom: 0, borderRadius: 3, height: 24, width: getWidth(15, 25) + '%' }}
        />
      ))}
    </div>
  );
};

export const WeekdayPlaceholder = ({ className = '' }) => (
  <div
    className={`placeholder placeholder-date ${className}`}
    style={{ background: 'rgba(255,255,255,0.4)', height: 40, width: getWidth(60, 70) + '%' }}
  />
);

export const DatePlaceholder = ({ className = '' }) => (
  <div
    className={`placeholder placeholder-date ${className}`}
    style={{ background: 'rgba(255,255,255,0.2)', height: 110, width: '80%' }}
  />
);
