import { createContext, useEffect, useMemo, useState } from "react";
import { Product } from "../interfaces";

export type CartProducts = Pick<
  Product,
  "id" | "title" | "thumbnail" | "price"
> & {
  quantity: number;
};

type CartContextProps = {
  cart: CartProducts[];
  menu: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  addToCart: (product: Product) => void;
  removeToCart: (id: Product["id"]) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  cleanCart: () => void;
  isEmptyCart: boolean;
  totalPagar: number;
};

type CartProviderProps = {
  children: React.ReactNode;
};
export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

const cartStorage = () => {
  const cart = localStorage.getItem("carrito-compras");
  return cart ? JSON.parse(cart) : [];
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartProducts[]>(cartStorage());
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("carrito-compras", JSON.stringify(cart));
  }, [cart]);

  const closeMenu = () => {
    setMenu(false);
  };

  const openMenu = () => {
    setMenu(true);
  };

  const addToCart = (product: Product) => {
    const data = {
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
    };
    if (isExistProduct(product.id)) {
      alert("Produto ya se encuentra agregado al carrito");
    } else {
      const newData = {
        ...data,
        quantity: 1,
      };
      setCart([...cart, newData]);
      alert("Producto agregado al carrito");
    }
  };

  const removeToCart = (id: Product["id"]) => {
    const confirm = window.confirm("Desea eliminar el producto del carrito?");
    if (!confirm) return;
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const cleanCart = () => {
    const confirm = window.confirm("Desea remover todos los productos?");
    if (!confirm) return;
    setCart([]);
  };

  const isExistProduct = (id: Product["id"]) => {
    return cart.some((product) => product.id === id);
  };

  const updateQuantity = (id: Product["id"], quantity: number) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity,
        };
      }
      return product;
    });
    setCart(newCart);
  };

  const totalPagar = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const isEmptyCart = useMemo(() => cart.length === 0, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPagar,
        closeMenu,
        openMenu,
        menu,
        addToCart,
        removeToCart,
        updateQuantity,
        cleanCart,
        isEmptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
