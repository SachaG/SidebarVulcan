import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import PostHome from '../posts/PostHome';

const Home = () => (
  <div>
    <PostHome />
  </div>
);

export default Home;
