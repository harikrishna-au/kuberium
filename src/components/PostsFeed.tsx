import React from 'react';
import { PostCard } from './PostCard';
import { Post } from '@/services/postService';
import { toast } from 'sonner';

export const PostsFeed: React.FC = () => {
  const dummyPosts: Post[] = [
    {
      id: '1',
      postId: '1',
      expertId: 'exp1',
      expertName: 'Ravi Krishna Reddy',
      title: 'UPI Payment Safety Tips',
      description: 'Essential safety measures while using UPI apps like PhonePe, Google Pay, and Paytm. Learn how to protect yourself from common fraud schemes and secure your transactions.',
      tags: ['UPI', 'Digital Payments', 'Security'],
      likes: 156,
      trust: { sum: 185, count: 42, average: 4.7 },
      trustedBy: [],
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      postId: '2',
      expertId: 'exp2',
      expertName: 'Lakshmi Prasanna',
      title: 'Small Cap Mutual Funds in 2024',
      description: 'Analysis of small cap mutual funds performance and why SEBI is concerned about their increased valuations. Should you invest or wait?',
      tags: ['Mutual Funds', 'Small Cap', 'SEBI'],
      likes: 142,
      trust: { sum: 165, count: 38, average: 4.3 },
      trustedBy: [],
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      postId: '3',
      expertId: 'exp3',
      expertName: 'Venkat Narayana',
      title: 'New Tax Regime vs Old: Making the Right Choice',
      description: 'Detailed comparison of both tax regimes with practical examples. Learn which regime would be more beneficial based on your income and investments.',
      tags: ['Taxation', 'Income Tax', 'Finance'],
      likes: 234,
      trust: { sum: 225, count: 48, average: 4.6 },
      trustedBy: [],
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      postId: '4',
      expertId: 'exp4',
      expertName: 'Srinivas Rao',
      title: 'Real Estate Investment in Tier 2 Cities',
      description: 'Exploring investment opportunities in emerging cities like Vizag, Vijayawada, and Warangal. Analysis of growth potential and risk factors.',
      tags: ['Real Estate', 'Investment', 'Property'],
      likes: 189,
      trust: { sum: 195, count: 42, average: 4.5 },
      trustedBy: [],
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      postId: '5',
      expertId: 'exp5',
      expertName: 'Anand Kumar Reddy',
      title: 'Electric Vehicle Stocks Analysis',
      description: 'In-depth analysis of Indian EV stocks and their future potential. Focus on major players and emerging startups in the EV ecosystem.',
      tags: ['Stocks', 'EV', 'Investment'],
      likes: 167,
      trust: { sum: 178, count: 38, average: 4.4 },
      trustedBy: [],
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      postId: '6',
      expertId: 'exp6',
      expertName: 'Padma Priya',
      title: 'Gold vs Sovereign Gold Bonds',
      description: 'Comparing traditional gold investment with Sovereign Gold Bonds. Understanding tax benefits and long-term returns of different gold investment options.',
      tags: ['Gold', 'Investment', 'SGB'],
      likes: 198,
      trust: { sum: 215, count: 46, average: 4.7 },
      trustedBy: [],
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '7',
      postId: '7',
      expertId: 'exp7',
      expertName: 'Suresh Babu',
      title: 'Navigating NPS Investment Options',
      description: 'Understanding National Pension System asset allocation. How to choose between auto and active choice, and managing your NPS portfolio effectively.',
      tags: ['NPS', 'Retirement', 'Pension'],
      likes: 145,
      trust: { sum: 168, count: 36, average: 4.6 },
      trustedBy: [],
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '8',
      postId: '8',
      expertId: 'exp8',
      expertName: 'Madhavi Latha',
      title: 'Digital Gold vs Physical Gold',
      description: 'Comprehensive comparison between digital and physical gold investments. Understanding platforms, charges, and safety aspects of digital gold.',
      tags: ['Digital Gold', 'Investment', 'Finance'],
      likes: 178,
      trust: { sum: 192, count: 41, average: 4.5 },
      trustedBy: [],
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const handleLike = async (postId: string) => {
    toast.success('Post liked successfully');
  };

  const handleTrust = async (postId: string) => {
    toast.error('Trust functionality not implemented');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Posts</h2>
        <p className="text-muted-foreground">
          Discover the latest insights and updates from our experts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onTrust={handleTrust}
          />
        ))}
      </div>
    </div>
  );
};


