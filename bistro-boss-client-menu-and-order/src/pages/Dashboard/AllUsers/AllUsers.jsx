import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AllUsers() {
  const axiosSecure = useAxiosSecure();

  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  //   handle make admin put to db
  const handleMakeAdmin = (id) => {
    // toast start
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // add user role in sarver database
        axiosSecure
          .patch(`/users/admin/${id}`)
          .then((res) => {
            if (res.data.matchedCount > 0) {
              Swal.fire({
                title: "Admin",
                text: `${user.name} is an Adim now!`,
                icon: "success",
              });
            }
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    // toast end
  };

  //   handle delete user from database
  const handleDelete = (id) => {
    // toast start
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // add user role in sarver database
        axiosSecure
          .delete(`/users/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your want to has been Delete.",
                icon: "success",
                timer: 1500,
              });
            }
            refetch();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              text: `${error.message}`,
              title: "Something wrong!",
            });
          });
      }
    });
    // toast end
  };

  return (
    <div>
      <SectionTitle heading={"MANAGE ALL ITEMS"} subHeading={"Hurry Up!"} />
      <div className="px-2">
        <h2 className="text-2xl font-semibold">Total Items: ({user.length})</h2>
        {/* table users */}
        <div className="overflow-x-auto mt-4 md:mt-8">
          <table className="table  w-[100%]">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((item, index) => (
                <tr key={item._id}>
                  <th>
                    <label>{++index}</label>
                  </th>
                  <td>
                    <h2 className="uppercase text-base">{item.name}</h2>
                  </td>
                  <td>
                    <h2 className=" text-base">{item.email}</h2>
                  </td>
                  <td>
                    {item.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(item._id)}
                        className="uppercase text-base transition active:scale-95 bg-yellow-600 p-2 rounded-md"
                      >
                        <FaUsers className="text-white" />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="uppercase text-base transition active:scale-90 bg-red-600 p-2 rounded-md"
                    >
                      <FaTrashAlt className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
