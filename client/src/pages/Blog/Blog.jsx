import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { URL } from "../../url";
import { Loader2, FileText, Calendar, User } from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/api/blogs`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();
        setBlogs(data);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-black mb-2">Blog Posts</h1>
            <p className="text-zinc-600">Discover stories and insights</p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-600 text-lg">No blog posts yet</p>
              <p className="text-zinc-500 mt-2">Be the first to share your story!</p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="border border-zinc-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <Link to={`/blog/${blog._id}`}>
                    <h2 className="text-2xl font-semibold text-black mb-3 hover:text-zinc-700 transition-colors">
                      {blog.title}
                    </h2>
                  </Link>
                  
                  <p className="text-zinc-600 mb-4 line-clamp-3">
                    {blog.content.length > 200
                      ? `${blog.content.substring(0, 200)}...`
                      : blog.content}
                  </p>

                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>{blog.author?.username || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-black font-medium hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
