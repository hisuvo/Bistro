import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCarts from "../../hooks/useCarts";

const FoodCard = ({ item }) => {
  const { user } = useAuth();
  const { _id, name, image, price, recipe } = item;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCarts();

  const handleAddCard = (food) => {
    if (user && user?.email) {
      console.log(food);
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      // post menu item data in server
      axiosSecure
        .post(`/carts`, cartItem)
        .then((res) => {
          console.log(res.data);
          if (res.data.acknowledged) {
            toast.success("card add to success");
          }
          refetch();
        })
        .catch((error) => {
          toast.error(`${error.code}`);
        });
    } else {
      showToast();
    }
  };

  const showToast = () => {
    toast(
      <div className="space-y-2">
        <h4 className="text-lg">You Login For Add Product</h4>
        <div className="space-x-4">
          <button
            className="btn btn-xs btn-success"
            onClick={() => {
              navigate("/login", { state: { from: location } });
            }}
          >
            Yes! Login
          </button>
          <button
            className="btn btn-xs btn-error"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancle
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddCard(item)}
            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
