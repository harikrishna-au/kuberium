import React from 'react';
import { PostsFeed } from '@/components/PostsFeed';

const Feed = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Expert Feed</h1>
      <PostsFeed />
    </div>
  );
};

export default Feed;
