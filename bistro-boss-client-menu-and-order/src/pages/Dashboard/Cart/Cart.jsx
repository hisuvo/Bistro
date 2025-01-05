import CartCard from "../../../components/CartCard/CartCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCarts from "../../../hooks/useCarts";

function Cart() {
  const [cart] = useCarts();

  const totalePrice = cart.reduce(
    (prev, curr) => prev + curr.price,

    0
  );

  return (
    <div>
      <SectionTitle heading={"WANNA ADD MORE?"} subHeading={"My Cart"} />
      <div className="p-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold uppercase">
            Total orders: {cart.length}
          </h2>
          <h2 className="text-2xl font-semibold uppercase">
            total price: ${totalePrice}
          </h2>
          <button className="btn btn-primary">Pay</button>
        </div>

        <div className="overflow-x-auto mt-4 md:mt-8">
          <table className="table  w-[100%]">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {cart.map((item, index) => (
                <CartCard key={item._id} item={item} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cart;
