import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { URL } from "../../url";
import { useUser } from "../../context/UserContext";
import { FileText, AlertCircle, Image as ImageIcon, X } from "lucide-react";

const CreateBlog = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      const res = await fetch(`${URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          image: imageUrl || null
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create blog");
      }

      navigate(`/blog/${data._id}`);
    } catch (err) {
      setError(err.message || "Failed to create blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-white pt-20 pb-16 flex items-center justify-center">
          <p className="text-zinc-600">Please log in to create a blog post.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-zinc-900 mb-3 tracking-tight">Create New <span className="text-primary">Post</span></h1>
            <p className="text-zinc-500 text-lg">Share your thoughts, experiences, and ideas with the world.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <Input
              id="title"
              type="text"
              label="Title"
              placeholder="Give your post a catchy title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              icon={FileText}
              disabled={isLoading}
              className="bg-zinc-50 border-zinc-200 focus-visible:ring-primary/20 text-zinc-900 placeholder:text-zinc-400"
              required
            />

            <div className="space-y-3">
              <label
                htmlFor="imageUrl"
                className="text-sm font-semibold text-zinc-700 ml-1"
              >
                Featured Image URL
              </label>
              <div className="relative group">
                <input
                  id="imageUrl"
                  type="url"
                  className="flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-12 py-2 text-sm text-zinc-900 shadow-sm transition-all placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  disabled={isLoading}
                />
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={20} />
              </div>
              <p className="text-xs text-zinc-400 ml-1 italic">Optional: Add a visual touch to your post</p>
            </div>

            {imageUrl && (
              <div className="relative group">
                <div className="w-full aspect-video overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full flex-col items-center justify-center text-zinc-400 p-4">
                    <ImageIcon size={48} className="mb-2 opacity-20" />
                    <p className="text-sm font-medium">Invalid Image URL</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-zinc-900 rounded-full transition-all shadow-lg backdrop-blur-sm"
                  aria-label="Remove image"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            <div className="space-y-3">
              <label
                htmlFor="content"
                className="text-sm font-semibold text-zinc-700 ml-1"
              >
                Story Content
              </label>
              <textarea
                id="content"
                rows={12}
                className="flex w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-900 shadow-sm transition-all placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Once upon a time..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-50">
              <Button
                type="submit"
                className="flex-1 py-4 text-base"
                isLoading={isLoading}
              >
                Publish Now
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 py-4 text-base border-zinc-200 text-zinc-600"
                onClick={() => navigate("/blog")}
                disabled={isLoading}
              >
                Discard Draft
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;
