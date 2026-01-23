import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { URL } from "../../url";
import { useUser } from "../../context/UserContext";
import { FileText, AlertCircle, Loader2 } from "lucide-react";

const EditBlogs = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await res.json();

        // Check if user is the author
        const authorId = data.author._id || data.author;
        if (authorId !== user?.id) {
          navigate("/blog");
          return;
        }

        setTitle(data.title);
        setContent(data.content);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBlog();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    if (title.length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    if (content.length < 10) {
      setError("Content must be at least 10 characters");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${URL}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.message || "Failed to update blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-white pt-20 pb-16 flex items-center justify-center">
          <p className="text-zinc-600">Please log in to edit blog posts.</p>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white pt-20 pb-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">Edit Blog Post</h1>
            <p className="text-zinc-600">Update your blog post</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Input
              id="title"
              type="text"
              label="Title"
              placeholder="Enter blog post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              icon={FileText}
              disabled={isLoading}
              required
            />

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-sm font-medium leading-none text-zinc-700"
              >
                Content
              </label>
              <textarea
                id="content"
                rows={15}
                className="flex w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Write your blog post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-black hover:bg-zinc-800 text-white"
                isLoading={isLoading}
              >
                Update Post
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/blog/${id}`)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditBlogs;
