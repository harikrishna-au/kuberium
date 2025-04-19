
import React from 'react';
import { X } from 'lucide-react';
import { Post } from '@/services/postService';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, Award, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostModalProps {
  post: Post;
  onClose: () => void;
  onLike: (postId: string) => void;
  onTrust: (postId: string) => void;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose, onLike, onTrust }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full p-4 md:p-8">
          <div className="bg-background rounded-lg shadow-lg max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="px-3 py-1 text-sm font-semibold"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg font-semibold">{post.expertName}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm font-medium text-muted-foreground">5 min read</span>
              </div>

              {/* Full Description */}
              <div className="prose prose-lg max-w-none">
                <p className="text-base leading-relaxed">{post.description}</p>
              </div>

              {/* Interaction Buttons */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t">
                <Button
                  variant="ghost"
                  onClick={() => onLike(post.id)}
                  className={cn(
                    "hover:bg-primary/10 hover:text-primary font-medium",
                    post.likedBy.length > 0 && "text-primary"
                  )}
                >
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  <span>{post.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onTrust(post.id)}
                  className={cn(
                    "hover:bg-primary/10 hover:text-primary font-medium",
                    post.trustedBy.length > 0 && "text-primary"
                  )}
                >
                  <Award className="w-5 h-5 mr-2" />
                  <span>{typeof post.trust === 'object' ? post.trust.sum : post.trust}</span>
                </Button>
                <Button
                  variant="ghost"
                  className="hover:bg-primary/10 hover:text-primary ml-auto"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
