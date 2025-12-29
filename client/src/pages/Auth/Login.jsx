import { useState } from "react";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Login
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 text-white rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 text-white rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-black font-medium py-2 rounded-md hover:bg-zinc-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
