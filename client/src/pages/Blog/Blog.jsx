import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { URL } from "../../url";
import { Loader2, FileText, Calendar, User, ArrowRight } from "lucide-react";

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
      <div className="min-h-screen bg-slate-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-14 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">
              Latest <span className="text-primary">Insights</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Discover stories, tutorials, and insights from my latest projects and learning path.</p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8 flex items-center gap-4">
              <div className="w-2 h-10 bg-red-500 rounded-full" />
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-zinc-100 shadow-sm">
              <FileText className="w-16 h-16 text-zinc-200 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-zinc-900">No blog posts yet</h3>
              <p className="text-zinc-500 mt-2">Be the first to share your story with the world!</p>
              <Link to="/blog/new" className="btn-primary mt-8">Create your first post</Link>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="grid gap-10">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group flex flex-col md:flex-row gap-8 bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  {blog.image && (
                    <div className="w-full md:w-2/5 aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-50">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                          Article
                        </span>
                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                          <Calendar size={14} />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                      </div>

                      <Link to={`/blog/${blog._id}`}>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">
                          {blog.title}
                        </h2>
                      </Link>

                      <p className="text-zinc-600 mb-6 line-clamp-3 leading-relaxed">
                        {blog.content.length > 200
                          ? `${blog.content.substring(0, 200)}...`
                          : blog.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 overflow-hidden">
                          {blog.author?.avatar ? (
                            <img src={blog.author.avatar} alt={blog.author.username} className="w-full h-full object-cover" />
                          ) : (
                            <User size={16} />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-zinc-700">{blog.author?.username || "Unknown"}</span>
                      </div>
                      <Link
                        to={`/blog/${blog._id}`}
                        className="text-primary font-bold inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Read Post <ArrowRight size={18} />
                      </Link>
                    </div>
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
