import { useState } from "react";

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login data:", {
        username: formData.username,
        password: formData.password,
      });
      // Add your login API call here
    } else {
      console.log("Registration data:", formData);
      // Add your registration API call here
    }
  };

  const handleSocialLogin = (platform: string) => {
    console.log(`${platform} login clicked`);
    // Add your social login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="relative w-full max-w-3xl h-[450px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Sliding Panel */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-blue-400 to-indigo-500 transition-all duration-700 ease-in-out z-10 rounded-3xl shadow-xl ${
            isLogin ? "left-0 rounded-r-[100px]" : "left-1/2 rounded-l-[100px]"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full text-white px-8">
            {isLogin ? (
              <>
                <h2 className="text-4xl font-bold mb-4">Hello, Welcome!</h2>
                <p className="text-blue-100 mb-6 text-center">
                  Don't have an account?
                </p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="border-2 border-white text-white px-8 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-500 transition-all duration-300"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-blue-100 mb-6 text-center">
                  Already have an account?
                </p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="border-2 border-white text-white px-8 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-500 transition-all duration-300"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>

        {/* Login Form */}
        <div
          className={`absolute top-0 w-1/2 h-full transition-all duration-700 ease-in-out ${
            isLogin ? "right-0" : "-right-full opacity-0"
          }`}
        >
          <div className="flex flex-col justify-center h-full px-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="w-full px-4 py-3 pl-10 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 pl-10 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              >
                Login
              </button>
            </form>

            <div className="mt-6">
              <p className="text-center text-gray-500 text-sm mb-4">
                Or sign in with
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleSocialLogin("Google")}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg">G</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("Facebook")}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg">f</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("GitHub")}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg">🐙</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("LinkedIn")}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg">in</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div
          className={`absolute top-0 w-1/2 h-full transition-all duration-700 ease-in-out ${
            !isLogin ? "left-0" : "-left-full opacity-0"
          }`}
        >
          <div className="flex flex-col justify-center h-full px-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Registration
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="w-full px-4 py-3 pl-10 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 pl-10 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  📧
                </span>
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 pl-10 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              >
                Register
              </button>
            </form>

            <div className="mt-6">
              <p className="text-center text-gray-500 text-sm mb-4">
                Or register with
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleSocialLogin("Google")}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg">G</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("Facebook")}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg">f</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("GitHub")}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg">🐙</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("LinkedIn")}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg">in</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
