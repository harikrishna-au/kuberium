import { supabase } from '@/integrations/supabase/client';

export interface TrustData {
  sum: number;
  count: number;
  average: number;
}

export interface TrustEntry {
  userId: string;
  value: number;
}

export interface Post {
  id: string;
  postId: string;
  expertId: string;
  expertName: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  trust: TrustData;
  trustedBy: TrustEntry[];
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  posts: Post[];
  lastVisible: string;
  hasMore: boolean;
}

let authToken = '';  // Declare the authToken variable

const login = async () => {
  try {
    const response = await fetch('https://f35d-117-250-212-179.ngrok-free.app/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: "john.doe4@example.com",
        password: "Password123!"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error details:', errorData);  // Log error details
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    authToken = data.token;
    return authToken;
  } catch (error) {
    console.error('Login error:', error);
    throw error;  // Rethrow error to handle further up the call stack
  }
};


export const postService = {
  // Get all posts with pagination
  getAllPosts: async (limit = 10, startAfter = ''): Promise<PostsResponse> => {
    try {
      if (!authToken) {
        await login();
      }

      const response = await fetch(
        `http://172.168.30.49:3001/api/posts/`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response but got ${contentType}`);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure the data has the expected structure
      if (!data.posts || !Array.isArray(data.posts)) {
        console.error('Unexpected data structure:', data);
        return { posts: [], lastVisible: '', hasMore: false };
      }

      return {
        posts: data.posts.map((post: any) => ({
          ...post,
          createdAt: post.createdAt || new Date().toISOString(), // Ensure createdAt exists
        })),
        lastVisible: data.lastVisible || '',
        hasMore: !!data.hasMore
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { posts: [], lastVisible: '', hasMore: false };
    }
  },

  // Get posts by expert
  getExpertPosts: async (expertId: string, limit = 10, startAfter = ''): Promise<Post[]> => {
    const response = await fetch(`/api/posts/expert/${expertId}?limit=${limit}&startAfter=${startAfter}`);
    return response.json();
  },

  // Get posts by tag
  getPostsByTag: async (tag: string, limit = 10, startAfter = ''): Promise<Post[]> => {
    const response = await fetch(`/api/posts/tag/${tag}?limit=${limit}&startAfter=${startAfter}`);
    return response.json();
  },

  // Search posts
  searchPosts: async (query: string, limit = 10): Promise<Post[]> => {
    const response = await fetch(`/api/posts/search?query=${query}&limit=${limit}`);
    return response.json();
  },

  // Get single post
  getPost: async (postId: string): Promise<Post> => {
    const response = await fetch(`/api/posts/${postId}`);
    return response.json();
  },

  // Create post
  createPost: async (post: Omit<Post, 'id' | 'postId' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
      credentials: 'include',
    });
    return response.json();
  },

  // Like post
  likePost: async (postId: string): Promise<void> => {
    if (!authToken) {
      await login();
    }

    const response = await fetch(`https://sus-server.onrender.com/api/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
  },

  // Unlike post
  unlikePost: async (postId: string): Promise<void> => {
    await fetch(`/api/posts/${postId}/unlike`, {
      method: 'POST',
      credentials: 'include',
    });
  },

  // Trust post
  trustPost: async (postId: string): Promise<void> => {
    await fetch(`/api/posts/${postId}/trust`, {
      method: 'POST',
      credentials: 'include',
    });
  },
};









