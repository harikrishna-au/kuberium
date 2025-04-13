import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, Award, Share2 } from 'lucide-react';
import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { Post } from '@/services/postService';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onTrust: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onTrust }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formatDate = (dateString: string | number | Date | null | undefined) => {
    if (!dateString) return 'No date';
    
    try {
      let date: Date;
      
      if (typeof dateString === 'string') {
        // Try to create a date directly first
        date = new Date(dateString);
      } else if (dateString instanceof Date) {
        date = dateString;
      } else if (typeof dateString === 'number') {
        date = new Date(dateString);
      } else {
        return 'Invalid date';
      }

      if (!isValid(date)) {
        return 'Invalid date';
      }

      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Date parsing error:', error);
      return 'Invalid date';
    }
  };

  return (
    <Card 
      className="flex flex-col h-full hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden group cursor-pointer"
      onClick={() => setIsModalOpen(true)}
    >
      <div className="flex flex-col flex-1 p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags?.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="px-2.5 py-0.5 text-xs font-semibold bg-secondary/50"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>

        {/* Author and Date */}
        <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://avatar.vercel.sh/${post.expertId}.png`} alt={post.expertName} />
              <AvatarFallback>{post.expertName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{post.expertName}</span>
          </div>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <CardFooter className="flex justify-between p-4 border-t">
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onLike(post.id);
          }}
        >
          <ThumbsUp className={cn(
            "h-4 w-4",
            post.likedBy?.includes(post.expertId) && "fill-current text-primary"
          )} />
          <span>{post.likes || 0}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onTrust(post.id);
          }}
        >
          <Award className="h-4 w-4" />
          <span>{post.trust?.average?.toFixed(1) || 0}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            // Handle share action
          }}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};


