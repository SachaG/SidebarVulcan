import React from 'react';
import { Components, registerComponent, Utils } from 'meteor/vulcan:core';
import Categories from '../../modules/categories/collection';
import { Link } from 'react-router-dom';

const CategoryCell = ({ variant = 'small', ...rest }) =>
  variant === 'small' ? (
    <CategoryCellSmall {...rest} />
  ) : variant === 'medium' ? (
    <CategoryCellMedium {...rest} />
  ) : (
    <CategoryCellLarge {...rest} />
  );

registerComponent('CategoryCell', CategoryCell);

// const CategoryCellSmall = ({ document: category }) => {
//   const { name, _id } = category;
//   return (
//     <Components.ModalTrigger
//       title={`Edit category ${name}`}
//       component={<Components.Button className="cell category-cell">{Utils.trimWords(name, 8)}</Components.Button>}
//     >
//       <Components.SmartForm collection={Categories} documentId={_id} />
//     </Components.ModalTrigger>
//   );
// };

const CategoryCellSmall = ({ document: category }) => {
  const { name, pagePath } = category;
  return pagePath ? (
    <Link to={pagePath} className="category-cell category-cell-small">
      {name}
    </Link>
  ) : (
    <span className="category-cell category-cell-small">{name}</span>
  );
};

const CategoryCellMedium = ({ document: category }) => {
  const { name } = category;
  return <div>{name}</div>;
};

const CategoryCellLarge = ({ document: category }) => {
  const { name } = category;
  return <div>{name}</div>;
};

export default CategoryCell;
