import { useCartContext } from "../../../hooks/useContext";
import { type Product } from "../../../interfaces";
import { formatCurrency } from "../../../utils";

type Props = {
  product: Product;
};
export const ProductGridItem = ({ product }: Props) => {
  const { addToCart } = useCartContext();

  return (
    <div
      key={product.id}
      className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full"
    >
      <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
        <img
          loading="lazy"
          src={`${product.images[0]}`}
          alt="card-image"
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-slate-800 text-lg font-semibold antialiased">
            {product.title}
          </p>
          <p className="text-cyan-600 text-xl font-semibold">
            {formatCurrency(product.price)}
          </p>
        </div>
        <p className="text-slate-600 leading-normal font-light text-pretty">
          {product.description}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="rounded-md w-full mt-6 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
