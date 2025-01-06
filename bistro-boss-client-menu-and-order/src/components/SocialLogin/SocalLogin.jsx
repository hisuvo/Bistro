//---------------------------------------------
// It has not use in Login and Resgister button
//---------------------------------------------

import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider/AuthProvider";
import { toast } from "sonner";

export default function SocalLogin() {
  const { googleSing } = useContext(AuthContext);

  const handleGoogleSign = () => {
    // googleSignIn
    googleSing()
      .then((result) => {
        console.log(result.user);
        toast.success("Google Login Done");
      })
      .catch((error) => {
        toast.error(error.message);
        toast.error(error.code);
      });
  };

  return (
    <>
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
    </>
  );
}
