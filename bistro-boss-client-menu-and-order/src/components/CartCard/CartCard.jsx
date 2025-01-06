import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCarts from "../../hooks/useCarts";
import Swal from "sweetalert2";

export default function CartCard({ item, index }) {
  const { _id, name, image, price } = item;
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCarts();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/carts/${id}`)
          .then((res) => {
            const reslut = res.data;
            if (reslut.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            refetch();
          })
          .catch((error) => {
            Swal.fire({
              title: `${error.message}`,
              text: `${error.code}`,
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <>
      <tr>
        <th>
          <label>{++index}</label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={image} alt={name} />
              </div>
            </div>
          </div>
        </td>
        <td>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </td>
        <td>${price}</td>
        <th>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-ghost text-xl text-red-600 btn-xs"
          >
            {" "}
            <FaTrashAlt />{" "}
          </button>
        </th>
      </tr>
    </>
  );
}
