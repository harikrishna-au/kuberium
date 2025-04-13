import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { PostCard } from './PostCard';
import { postService } from '@/services/postService';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export const PostsFeed: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = '' }) => postService.getAllPosts(10, pageParam),
    getNextPageParam: (lastPage) => 
      lastPage.hasMore ? lastPage.lastVisible : undefined,
    initialPageParam: '',
  });

  const handleLike = async (postId: string) => {
    try {
      await postService.likePost(postId);
      refetch();
      toast.success('Post liked successfully');
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleTrust = async (postId: string) => {
    toast.error('Trust functionality not implemented');
  };

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') return <LoadingSkeleton />;
  if (status === 'error') return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Posts</h2>
        <p className="text-muted-foreground">
          Discover the latest insights and updates from our experts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.pages.map((page) => 
          page.posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onTrust={handleTrust}
            />
          ))
        )}
      </div>

      <div ref={ref} className="mt-8">
        {isFetchingNextPage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton 
                key={i} 
                className="aspect-[4/5] rounded-lg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="aspect-[4/5] rounded-lg" />
      ))}
    </div>
  </div>
);

