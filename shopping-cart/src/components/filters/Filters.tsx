import { useId } from "react";
import { IFilter } from "../../hooks/useProducts";

type Props = {
  filters: IFilter;
  setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
};

export const Filters = ({ filters, setFilters }: Props) => {
  const categoryId = useId();
  const priceId = useId();
  return (
    <form className="text-slate-300 my-12 flex justify-center gap-10">
      <div className="text-white text-lg font-semibold flex flex-col gap-1 w-[350px]">
        <label htmlFor={priceId}>Precio</label>
        <div>
          <input
            id={priceId}
            type="range"
            min={0}
            max={500}
            step={50}
            className="w-full"
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: Number(e.target.value) })
            }
          />
          <div className="flex justify-between">
            <span>{filters.price}</span>
            <span>500</span>
          </div>
        </div>
      </div>
      <div className="text-white text-lg font-semibold flex flex-col gap-1">
        <label htmlFor={categoryId}>Categorias</label>
        <select
          id={categoryId}
          className="w-[250px] border border-gray-200 text-center font-semibold py-1 rounded text-slate-700 bg-gray-100 "
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">Todas</option>
          <option value="groceries">Groceries</option>
          <option value="beauty">Beauty</option>
          <option value="furniture">Furniture</option>
          <option value="laptops">Electronics</option>
          <option value="fragrances">Fragrances</option>
        </select>
      </div>
    </form>
  );
};
