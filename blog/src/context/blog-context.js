import React from 'react';

const BlogContext = React.createContext({
  isUpdate: false,
  fact: [],
  setFacts: false,
  setFetchBlogs: false,
});

export default BlogContext;
