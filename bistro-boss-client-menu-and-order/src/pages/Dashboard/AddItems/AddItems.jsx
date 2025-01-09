import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublice from "../../../hooks/useAxiosPublice";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function AddItems() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const axiosPublice = useAxiosPublice();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    // upload image in imagebb server
    const imageFile = { image: data.image[0] };
    const res = await axiosPublice.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        category: data.category,
        price: data.price,
        image: res.data.data?.display_url,
      };
      //   post menuItem in server
      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.data.insertedId) {
        // show a success popup
        Swal.fire({
          title: "Recipe upload success",
          icon: "success",
        });
      }
    }
  };

  return (
    <>
      <SectionTitle
        subHeading={"what-s new?"}
        heading={"add an item"}
      ></SectionTitle>
      <div className="p-6 mt-8 max-w-[50rem] mx-auto bg-gray-100 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* recipe name */}
          <div className="flex flex-col gap-2">
            <label>Recipe Name*</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-red-500">
                Recipe name is required
              </p>
            )}
          </div>

          {/* recipe cetagory */}
          <div className=" flex gap-4">
            <div className="flex flex-col gap-2 flex-grow">
              <label>Category*</label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  select category?
                </option>
                <option value="salad">salad</option>
                <option value="pizza">pizaa</option>
                <option value="soup">soup</option>
                <option value="dessert">dessert</option>
                <option value="drinks">drinks</option>
                <option value="other">other</option>
              </select>
              {errors.category?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Recipe category is required
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 flex-grow">
              <label>Price*</label>
              <input
                type="text"
                placeholder="Type here price"
                className="input input-bordered w-full "
                {...register("price", { required: true })}
              />
              {errors.price?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Recipe price is required
                </p>
              )}
            </div>
          </div>

          {/* recipe price */}
          <div className="flex flex-col gap-2">
            <label>Recipie Details*</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="details"
              {...register("recipe", { required: true })}
            ></textarea>
            {errors.recipe?.type === "required" && (
              <p role="alert" className="text-red-500">
                Recipe details is required
              </p>
            )}
          </div>

          {/* recipe image */}
          <div>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input w-full max-w-xs"
            />
            {errors.recipe?.type === "required" && (
              <p role="image" className="text-red-500">
                Recipe image is required
              </p>
            )}
          </div>

          <button className="bg-yellow-500 active:bg-yellow-600 text-xl font-semibold rounded-md active:scale-105 flex justify-center items-center px-4 py-2">
            <input className="px-4 py-2" type="submit" />
            <FaUtensils />
          </button>
        </form>
      </div>
    </>
  );
}

export default AddItems;
