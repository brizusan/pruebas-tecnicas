import { Product } from "../../../interfaces";
import { ProductGridItem } from "../products-grid-item/ProductGridItem";

type Props = {
  products: Product[];
};

export const ProductGrid = ({ products }: Props) => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {products.slice(0, 28).map((product) => (
        <ProductGridItem key={product.id} product={product} />
      ))}
    </section>
  );
};
