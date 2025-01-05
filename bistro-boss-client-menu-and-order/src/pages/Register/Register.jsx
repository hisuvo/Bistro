import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Register() {
  // react hook form use here
  const { createUser, googleSing, updateUserProfise } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // update profile
        updateUserProfise(data.name, data.url)
          .then((result) => {
            console.log(result);
            toast.success("update done");
          })
          .catch((error) => {
            toast.error(error.code);
          });
        Store.addNotification({
          title: "Wonderful!",
          message: `${result.user} && "teodosii@react-notifications-component"`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        navigate("/");
      })
      .catch((error) => {
        Store.addNotification({
          title: "Error",
          message: `${error.message} && ${error.code} `,
          type: "danger",
          insert: "top",
          container: "top-center",
          dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      });
  };

  const handleGoogleSign = () => {
    // googleSignIn
    googleSing()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
      });
  };

  // -----------------------x--------------------
  // const { user, createUser, googleSing } = useContext(AuthContext);
  // console.log(user?.email);

  // const hanldeRegister = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const password = form.password.value;

  //   console.log({ name, email, password });

  //   // singUp
  //   createUser(email, password)
  //     .then((result) => {
  //       console.log(result.user);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       console.log(error.code);
  //     });
  // };

  // const handleGoogleSign = () => {
  //   // googleSignIn
  //   googleSing()
  //     .then((result) => {
  //       console.log(result.user);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       console.log(error.code);
  //     });
  // };

  return (
    <div className="min-h-screen  bg-gray-100 py-16">
      <div className="bg-white max-w-[30rem] mx-auto shadow-lg rounded-lg border-2 border-yellow-300">
        {/* Left Form Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form
            // onSubmit={hanldeRegister}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 "
          >
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                name="name"
                placeholder="Type here"
                className="mt-2 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400"
              />
              {errors.name && (
                <span className="text-red-500">Name field is required</span>
              )}
            </div>
            {/* photo Input */}
            <div>
              <label htmlFor="url" className="block font-medium text-gray-700">
                Photo url
              </label>
              <input
                type="url"
                id="url"
                {...register("url", { required: true })}
                name="url"
                placeholder="Type here img url"
                className="mt-2 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400"
              />
              {errors.url && (
                <span className="text-red-500">
                  Photo Url field is required
                </span>
              )}
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
                {...register("email", { required: true })}
                name="email"
                placeholder="Type here"
                className="mt-2 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400"
              />
              {errors.email && (
                <span className="text-red-500">Email field is required</span>
              )}
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
                type="text"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                })}
                name="password"
                placeholder="Enter your password"
                className="mt-2 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500">Password field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password must be 6 character
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500">
                  Password must be less than 10 character
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500">
                  Password must be on uppercase one lowercase and one special
                  character
                </span>
              )}
            </div>
            {/* Sign Up Button */}
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
            />
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
        </div>
      </div>
    </div>
  );
}

export default Register;
