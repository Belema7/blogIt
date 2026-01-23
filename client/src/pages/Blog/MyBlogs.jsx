import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/ui/Button";
import { URL } from "../../url";
import { useUser } from "../../context/UserContext";
import { Loader2, FileText, Calendar, Edit, Trash2, Plus } from "lucide-react";

const MyBlogs = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}/api/blogs/user/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

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
  }, [user, navigate]);

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setDeletingId(blogId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${URL}/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (err) {
      alert(err.message || "Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">My Blog Posts</h1>
              <p className="text-zinc-600">Manage your blog posts</p>
            </div>
            <Link to="/blog/new">
              <Button className="bg-black hover:bg-zinc-800 text-white">
                <Plus size={18} className="mr-2" />
                New Post
              </Button>
            </Link>
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
              <p className="text-zinc-600 text-lg">You haven't created any blog posts yet</p>
              <Link to="/blog/new">
                <Button className="mt-4 bg-black hover:bg-zinc-800 text-white">
                  <Plus size={18} className="mr-2" />
                  Create Your First Post
                </Button>
              </Link>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="border border-zinc-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link to={`/blog/${blog._id}`}>
                        <h2 className="text-2xl font-semibold text-black mb-3 hover:text-zinc-700 transition-colors">
                          {blog.title}
                        </h2>
                      </Link>

                      <p className="text-zinc-600 mb-4 line-clamp-2">
                        {blog.content.length > 150
                          ? `${blog.content.substring(0, 150)}...`
                          : blog.content}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={`/blog/edit/${blog._id}`}>
                        <Button variant="secondary" size="sm">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(blog._id)}
                        isLoading={deletingId === blog._id}
                      >
                        <Trash2 size={16} />
                      </Button>
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

export default MyBlogs;
