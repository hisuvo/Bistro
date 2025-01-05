import { FaTrashAlt } from "react-icons/fa";

export default function CartCard({ item, index }) {
  console.log(item);
  const { name, image, price } = item;

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
          <button className="btn btn-ghost text-xl text-red-600 btn-xs">
            {" "}
            <FaTrashAlt />{" "}
          </button>
        </th>
      </tr>
    </>
  );
}
