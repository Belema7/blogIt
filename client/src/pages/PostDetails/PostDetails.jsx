import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/ui/Button";
import { URL } from "../../url";
import { useUser } from "../../context/UserContext";
import { Loader2, Calendar, User, Edit, Trash2, ArrowLeft } from "lucide-react";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/api/blogs/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await res.json();
        setBlog(data);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }

      navigate("/blog");
    } catch (err) {
      alert(err.message || "Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const isAuthor = user && blog && (blog.author._id === user.id || blog.author === user.id);

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
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

          {!loading && !error && blog && (
            <>
              <div className="mb-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-zinc-600 hover:text-black transition-colors mb-6"
                >
                  <ArrowLeft size={18} />
                  Back to Blog
                </Link>
              </div>

              <article className="border border-zinc-200 rounded-lg overflow-hidden bg-white">
                <div className="p-8">
                  <h1 className="text-4xl font-bold text-black mb-4 tracking-tight">
                    {blog.title}
                  </h1>

                  <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-6 border-b border-zinc-100">
                    <div className="flex items-center gap-6 text-sm text-zinc-600">
                      <div className="flex items-center gap-2">
                        <User size={18} />
                        <span className="font-medium">{blog.author?.username || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>

                    {isAuthor && (
                      <div className="flex items-center gap-3">
                        <Link to={`/blog/edit/${blog._id}`}>
                          <Button variant="secondary" size="sm">
                            <Edit size={16} className="mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={handleDelete}
                          isLoading={isDeleting}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>

                  {blog.image && (
                    <div className="mb-8 -mx-8">
                      <div className="w-full aspect-video overflow-hidden bg-zinc-100">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          loading="eager"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none">
                    <div className="text-[#111] whitespace-pre-wrap leading-relaxed text-base">
                      {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 last:mb-0">
                          {paragraph || '\u00A0'}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostDetails;
