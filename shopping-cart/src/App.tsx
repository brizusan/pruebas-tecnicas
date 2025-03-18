import { Filters, ProductGrid } from "./components";
import { CartMenu } from "./components/cart-menu/CartMenu";
import { useCartContext } from "./hooks/useContext";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { openMenu, isEmptyCart } = useCartContext();
  const { filterProducts, isEmpty, filters, setFilters } = useProducts();

  return (
    <>
      <header className="py-12 max-w-7xl mx-auto w-11/12 lg:w-full">
        <h1
          onClick={openMenu}
          className={`text-center text-3xl font-bold text-slate-100 cursor-pointer ${
            !isEmptyCart && "animate-bounce"
          }`}
        >
          Shopping Cart <span>🏦 </span>
        </h1>
        <Filters filters={filters} setFilters={setFilters} />
      </header>
      <main className="text-white w-11/12 mx-auto lg:w-full container pb-12">
        <h2 className="text-2xl font-semibold  text-white">
          {isEmpty
            ? "No encontramos productos  para tu busqueda"
            : "Nuestros productos"}
        </h2>

        <ProductGrid products={filterProducts} />
      </main>

      <CartMenu />
    </>
  );
}

export default App;
