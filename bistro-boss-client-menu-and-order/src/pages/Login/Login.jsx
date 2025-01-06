import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAxiosPublice from "../../hooks/useAxiosPublice";

export default function Login() {
  document.title = "Bistro Bosss | Login";
  const [disabled, setDisabled] = useState(true);
  const captchaRef = useRef(null);
  const { signIn, googleSing } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublice = useAxiosPublice();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Sing in
    signIn(email, password)
      .then((userCredential) => {
        // eslint-disable-next-line no-unused-vars
        const user = userCredential.user;
        toast.success(" User Loning success");
        navigate(from);
      })
      .catch((error) => {
        toast.error(`${error.code}`);
      });
  };

  const handleCaptcha = (e) => {
    // const user_captcha_value = captchaRef.current.value;
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);

    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleGoogleSign = () => {
    // googleSignIn
    googleSing()
      .then((res) => {
        console.log(res.user);
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
        };
        // inset userInfo in db
        axiosPublice.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate(from);
        });
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
      });
  };

  return (
    <div className="max-w-[30rem] mx-auto p-6 my-16 border-2 border-yellow-400 shadow-xl rounded-md">
      <h2 className="text-4xl font-semibold text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        {/* email */}
        <div className="flex flex-col ">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email here"
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        {/* password */}
        <div className="flex flex-col ">
          <label htmlFor="email" className="text-xl">
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password here"
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        {/* Captcha*/}
        <div className="flex flex-col ">
          <div className="p-2">
            <LoadCanvasTemplate />
          </div>

          <input
            type="text"
            name="captcha"
            onBlur={handleCaptcha}
            ref={captchaRef}
            placeholder="enter the above text"
            className="px-4 py-2 border rounded-lg"
          />
          {/* <button
            // onClick={handleCaptcha}
            className="btn btn-xs bg-yellow-400 hover:bg-yellow-500 my-2"
          >
            check
          </button> */}
        </div>

        <div className="py-4">
          <input
            disabled={disabled}
            className="w-full disabled:bg-gray-400 bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
            type="submit"
            value="Login"
          />
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
          <button
            onClick={handleGoogleSign}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
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
