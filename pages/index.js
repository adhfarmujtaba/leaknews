import Link from 'next/link';
import { fetchPosts } from '../lib/api';
import { formatDistanceToNow } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styling for Skeleton
import { useEffect, useState } from 'react';

const Home = ({ initialPosts }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      // Simulate network delay
      setTimeout(async () => {
        setPosts(initialPosts);
        setIsLoading(false);
      }, 400); // Simulate a 2-second delay
    };

    loadPosts();
  }, [initialPosts]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">News Website</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(8).fill(null).map((_, index) => (
              <div key={index} className="block bg-white rounded-lg shadow-lg overflow-hidden relative">
                <Skeleton height={192} />
                <div className="p-4">
                  <Skeleton height={24} width="80%" />
                  <Skeleton height={16} width="60%" className="mt-1" />
                  <Skeleton height={16} width="90%" className="mt-2" />
                </div>
              </div>
            ))
          ) : (
            posts.map((post) => {
              const date = new Date(post.date);
              const relativeDate = formatDistanceToNow(date, { addSuffix: true });

              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="block bg-white rounded-lg shadow-lg overflow-hidden relative transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                      {post.read_time} min read
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
                    <p className="text-gray-600 mt-1 text-sm">{relativeDate}</p>
                    <p className="text-gray-700 mt-2 text-sm truncate">{post.excerpt}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const posts = await fetchPosts();
    return { props: { initialPosts: posts } };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { props: { initialPosts: [] } };
  }
}

export default Home;
