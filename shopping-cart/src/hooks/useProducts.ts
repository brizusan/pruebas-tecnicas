import { useEffect, useState } from "react";
import { products as productsData } from "../data/products.json";
import { Product } from "../interfaces";

export interface IFilter {
  price: number;
  category: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [filters, setFilters] = useState<IFilter>({
    price: 0,
    category: "all",
  });

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const categoryProducts =
    filters.category === "all"
      ? products
      : products.filter((product) => product.category === filters.category);

  const filterProducts = filters.price
    ? categoryProducts.filter((product) => product.price >= filters.price)
    : categoryProducts;

  const isEmpty = filterProducts.length === 0;

  return { filterProducts, isEmpty, filters, setFilters };
};
