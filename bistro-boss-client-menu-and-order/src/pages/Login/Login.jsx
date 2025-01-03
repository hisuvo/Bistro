import { useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

export default function Login() {
  document.title = "Bistro Bosss | Login";
  const [disabled, setDisabled] = useState(true);
  const captchaRef = useRef(null);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);
  };

  const handleCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    console.log(user_captcha_value);

    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="max-w-[23rem] mx-auto p-6 my-16 border border-yellow-400 shadow-xl rounded-md">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        {/* email */}
        <div className="flex flex-col max-w-xs">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="email here"
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        {/* password */}
        <div className="flex flex-col max-w-xs">
          <label htmlFor="email" className="text-xl">
            Password
          </label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="password here"
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        {/* Captcha*/}
        <div className="flex flex-col max-w-xs">
          <div className="p-2">
            <LoadCanvasTemplate />
          </div>

          <input
            type="text"
            name="captcha"
            ref={captchaRef}
            placeholder="enter the above text"
            className="px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleCaptcha}
            className="btn btn-xs btn-primary my-2"
          >
            check
          </button>
        </div>

        <div className="py-4">
          <button
            disabled={disabled}
            className="w-full disabled:bg-gray-400 bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Login
          </button>
        </div>

        {/* Links */}
        <p className="text-center mt-4 text-sm">
          New here! Create a account?{" "}
          <a
            href="/register"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Go to Register
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
      </form>
    </div>
  );
}
