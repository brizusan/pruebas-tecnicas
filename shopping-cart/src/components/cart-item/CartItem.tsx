import { useState } from "react";
import { CartProducts } from "../../context/CartContext";
import { useCartContext } from "../../hooks/useContext";
import { formatCurrency } from "../../utils";

type Props = {
  product: CartProducts;
};
export const CartItem = ({ product }: Props) => {
  const { removeToCart, updateQuantity } = useCartContext();
  const [productQuantity, setProductQuantity] = useState(product.quantity);

  const handleDecrement = () => {
    if (productQuantity > 1) {
      setProductQuantity((state) => state - 1);
    }
    updateQuantity(product.id, productQuantity - 1);
  };

  const handleIncrement = () => {
    if (productQuantity < 7) {
      setProductQuantity((state) => state + 1);
    }
    updateQuantity(product.id, productQuantity + 1);
  };

  return (
    <div className="py-2 border-t-2 border-gray-200 flex gap-4 items-center relative">
      <figure>
        <img
          className="w-28 h-28 object-cover"
          src={product.thumbnail}
          alt={`imagen de product ${product.title}`}
        />
      </figure>
      <div>
        <h3 className="text-lg font-semibold text-slate-700">
          {product.title}
        </h3>
        <p className="font-medium">Precio: {formatCurrency(product.price)}</p>
        {productQuantity === 7 && (
          <small className=" text-center  text-red-300">
            maximo de 7 unidades
          </small>
        )}
        <p className="mb-2 text-lg font-semibold">Cantidad:</p>
        <div className="flex gap-5 items-center">
          <button
            onClick={handleDecrement}
            disabled={productQuantity === 1}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors text-black font-black cursor-pointer disabled:opacity-20"
          >
            -
          </button>
          <p>{productQuantity}</p>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors text-black font-black cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => removeToCart(product.id)}
        className="absolute bottom-2 right-2 cursor-pointer"
      >
        🗑️
      </button>
    </div>
  );
};
