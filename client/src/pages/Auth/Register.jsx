import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import AuthLayout from "../../components/Layout/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Register = () => {
  const { register } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await register(username, email, password);
      // Navigate to login or home after successful registration
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join BlogIt and start your journey today"
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            id="username"
            type="text"
            label="Username"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={User}
            disabled={isLoading}
            required
          />

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
        </div>

        <Button
          type="submit"
          className="w-full bg-white hover:bg-zinc-200 text-black font-semibold mt-2"
          isLoading={isLoading}
        >
          Create Account
        </Button>

        <div className="text-center text-sm text-zinc-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-white hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
