// export default function Register() {
//   return <div>Register</div>;
// }

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16">
      <div className="bg-white shadow-lg rounded-lg border-2 border-yellow-300">
        {/* Left Form Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form className="space-y-6 ">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Type here"
                className="mt-2 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Type here"
                className="mt-2 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-2 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Sign Up
            </button>
          </form>
          {/* Links */}
          <p className="text-center mt-4 text-sm">
            Already registered?{" "}
            <a
              href="/login"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Go to log in
            </a>
          </p>
          <p className="text-center mt-6 text-sm">Or sign up with</p>
          {/* Social Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <img
                src="https://img.icons8.com/ios-filled/50/facebook-new.png"
                alt="Facebook"
                className="h-6 w-6"
              />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <img
                src="https://img.icons8.com/ios-filled/50/google-logo.png"
                alt="Google"
                className="h-6 w-6"
              />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <img
                src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000"
                alt="Apple"
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
