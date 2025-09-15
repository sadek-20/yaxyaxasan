import { motion } from "framer-motion";
import { DollarSign, LogIn } from "lucide-react";
import { useState } from "react";
import { useLoginProviderMutation } from "../store/auth/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

function LoginPage({ onLogin }) {
  const [loginProvider, { data, isError, error, isLoading }] =
    useLoginProviderMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const showAlert = (message, icon = "error") => {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        padding: "10px 20px",
      });
    };

    if (isError) showAlert(error?.data?.msg);
    if (data) {
      showAlert(data?.message, "success");
      // navigate("/");
      window.location.href = "/";
    }
  }, [isError, error, data]);

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          id: data?.user?.id,
        })
      );
    }
  }, [data, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginProvider({ email, password }).unwrap();
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">ExpenseTracker</h1>
          <p className="text-gray-600 mt-2">Manage your finances with ease</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full btn-primary flex items-center justify-center gap-2 py-3"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Demo credentials: any email and password
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
