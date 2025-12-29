import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Mail, Lock, AlertCircle } from "lucide-react";
import AuthLayout from "../../components/Layout/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      // Assuming context handles redirect or we do it here. 
      // Usually login success -> redirect to home/dashboard
      navigate("/");
    } catch (err) {
      // Improve error message if possible
      setError(err.response?.data?.message || err.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            disabled={isLoading}
            required
          />

          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              disabled={isLoading}
              required
            />
            {/* Forgot Password Link - purely visual for now if no route exists, 
                or link to a placeholder route */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-white hover:bg-zinc-200 text-black font-semibold"
          isLoading={isLoading}
        >
          Sign In
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-500">
              Or
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-white hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
