import { useState } from "react";
import { Avatar } from "../UIComponents";
import { Heart, MessageCircle, Share } from "lucide-react";

interface Post {
    id: number;
    author: string;
    authorAvatar: string | null;
    timestamp: string;
    content: string;
    likes: number;
    liked: boolean;
    comments: number[];
    shares: number;
    image: string | null;
}

export const ActivityTab: React.FC<{ studentName: string }> = ({ studentName }) => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            author: studentName,
            authorAvatar: null,
            timestamp: new Date().toISOString(),
            content: "Just finished the React Advanced Patterns module! The compound component pattern is really powerful for building reusable UI.",
            likes: 12,
            liked: false,
            comments: [1, 2],
            shares: 1,
            image: null
        },
        {
            id: 2,
            author: studentName,
            authorAvatar: null,
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            content: "Does anyone have resources for optimizing Next.js images? Im struggling with LCP scores.",
            likes: 5,
            liked: true,
            comments: [1, 2, 3, 4],
            shares: 0,
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60"
        }
    ]);

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const handleLike = (id: number) => {
        setPosts(currentPosts => currentPosts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Activity Feed</h3>
                <div className="space-y-6">
                    {posts.map((post) => (
                        <article key={post.id} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                            <div className="flex items-center space-x-3 mb-3">
                                <Avatar name={post.author} size="sm" />
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-sm">{post.author}</h4>
                                    <p className="text-xs text-slate-500">{formatTimeAgo(post.timestamp)}</p>
                                </div>
                            </div>
                            <div className="mb-4 pl-12 sm:pl-14">
                                <p className="text-slate-700 text-sm leading-relaxed mb-3">{post.content}</p>
                                {post.image && (
                                    <div className="rounded-lg overflow-hidden border border-slate-200 mt-3">
                                        <img src={post.image} alt="Post content" className="w-full max-h-60 object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between pl-12 sm:pl-14">
                                <div className="flex items-center space-x-6">
                                    <button onClick={() => handleLike(post.id)} className={`flex items-center space-x-2 text-sm transition-colors ${post.liked ? "text-rose-600" : "text-slate-500 hover:text-rose-600"}`}>
                                        <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{post.comments.length}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                                        <Share className="w-4 h-4" />
                                        <span>{post.shares}</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};