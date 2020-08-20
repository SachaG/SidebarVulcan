import React from 'react';
import { Components } from 'meteor/vulcan:core';
import Categories from '../../modules/categories/collection';
import CategoryCell from './CategoryCell';

const PaginatedListItem = ({ document }) => <CategoryCell document={document} variant="small" key={document._id} />

const CategoryList = () => {
  const input = { limit: 999, sort: { name: 'asc' } };
  return (
    <div className="category-list">
      <div className="page-heading">
        <h2 className="page-heading-title">All Categories</h2>
      </div>
      <Components.PaginatedList
        className="category-list-contents"
        components={{
          PaginatedListItem,
        }}
        options={{
          collection: Categories,
          fragmentName: 'CategoryFragment',
          input,
        }}
      />
    </div>
  );
};

export default CategoryList;
