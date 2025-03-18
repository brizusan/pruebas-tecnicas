import { useCartContext } from "../../hooks/useContext";
import { formatCurrency } from "../../utils";
import { CartItem } from "../cart-item/CartItem";

export const CartMenu = () => {
  const { closeMenu, menu, cart, isEmptyCart, cleanCart, totalPagar } =
    useCartContext();

  return (
    <>
      {menu && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-50"></div>
      )}
      {menu && (
        <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm"></div>
      )}
      {menu && (
        <section
          className={`fixed p-5 right-0 top-0 w-full md:w-[450px] xl:w-[500px] h-screen z-20 bg-white shadow transform transition-all duration-300 ${
            !menu && "translate-x-full"
          }`}
        >
          <div className="flex justify-end">
            <button
              onClick={closeMenu}
              className="text-2xl font-bold text-red-400 cursor-pointer"
            >
              X
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 text-center">
            {isEmptyCart ? "El carrito esta vacio" : "Carrito de compras"}
          </h2>

          <section className="grid grid-cols-1 gap-2 my-2">
            {cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </section>
          <div className=" border border-gray-200" />
          {!isEmptyCart && (
            <section className="my-6 space-y-4">
              <div className="text-lg font-semibold">
                <h3>Resumen de compra</h3>
                <p>Total a Pagar: {formatCurrency(totalPagar)}</p>
              </div>
              <div>
                <button
                  onClick={cleanCart}
                  className="text-red-500 bg-red-100 font-semibold text-center cursor-pointer block border w-2/3 mx-auto"
                >
                  Limpiar carrito
                </button>
              </div>
            </section>
          )}
        </section>
      )}
      ;
    </>
  );
};
