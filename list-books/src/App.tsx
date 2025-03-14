import { useEffect, useId, useMemo, useState } from "react";
import { library } from "./data/books.json";
import { Book, Library } from "./interfaces";

export enum CategoryName {
  Fantasy = "Fantasía",
  Zombies = "Zombies",
  SciFi = "Ciencia ficción",
  Horror = "Terror",
}
export const categories = [
  { id: 1, name: CategoryName.Fantasy },
  { id: 2, name: CategoryName.Zombies },
  { id: 3, name: CategoryName.SciFi },
  { id: 4, name: CategoryName.Horror },
];

const getCartStorage = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

function App() {
  const [books] = useState<Library[]>(library);
  const [cart, setCart] = useState<Library[]>(getCartStorage());
  const [searchData, setSearchData] = useState({
    page: 0,
    genre: "",
  });
  const pageId = useId();
  const genreId = useId();

  const cartStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    cartStorage();
  }, [cart]);

  const addBookCart = (book: Book) => {
    if (isBookExists(book.ISBN)) {
      const confirm = window.confirm(
        "El libro ya se encuentra en el carrito, desea retirarlo?"
      );
      if (confirm) {
        removeBookCart(book.ISBN);
      }
    } else {
      setCart([...cart, { book }]);
    }
  };

  const isBookExists = (id: string) => {
    return cart.some((book) => book.book.ISBN === id);
  };

  const removeBookCart = (id: string) => {
    setCart(cart.filter((book) => book.book.ISBN !== id));
  };

  const handleSearchOptions = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredBooksGenre = searchData.genre
    ? books.filter((book) => book.book.genre === searchData.genre)
    : books;

  const filteredBooks = useMemo(
    () =>
      searchData.page
        ? filteredBooksGenre.filter(
            (book) => book.book.pages >= searchData.page
          )
        : filteredBooksGenre,
    [filteredBooksGenre, searchData.page]
  );

  const isEmpty = useMemo(() => cart.length > 0, [cart]);

  return (
    <>
      <div className=" min-h-screen">
        <header className="text-center py-4  font-semibold space-y-3">
          <h1 className="text-white text-3xl">
            Libreria React <span>📚</span>
          </h1>

          <div className="space-y-2">
            <p className="text-slate-400 font-bold text-3xl lg:text-5xl text-left md:pl-20 lg:pl-40">
              {books.length - cart.length} libros disponibles
            </p>
            {isEmpty && (
              <p className="text-slate-200 font-bold text-2xl lg:text-4xl text-left md:pl-20 lg:pl-40">
                {cart.length} libros seleccionados
              </p>
            )}
          </div>
          <form className="max-w-lg mx-auto flex flex-col gap-4  justify-between md:gap-6 items-center text-center text-white my-12">
            <div className="flex gap-2 flex-col w-full">
              <label htmlFor={pageId}>Filtrar por paginas</label>
              <div className="flex flex-col gap-2 ">
                <input
                  type="range"
                  name="page"
                  id={pageId}
                  value={searchData.page}
                  min={0}
                  max={600}
                  step={150}
                  onChange={handleSearchOptions}
                />
                <div className="flex justify-between">
                  <span>{searchData.page}</span>
                  <span>600</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-col w-full">
              <label htmlFor={genreId}>Filtrar por generos</label>
              <select
                name="genre"
                id={genreId}
                className="py-1 rounded  text-center bg-white text-slate-800 px-4 "
                onChange={handleSearchOptions}
              >
                <option value=""> -- Seleccione --- </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </header>

        <main className="container mx-auto my-8 w-11/12 lg:w-full md:flex gap-10">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 items-start">
            {filteredBooks.map((book) => (
              <article
                key={book.book.ISBN}
                className={`space-y-3 text-center text-slate-100 border border-gray-200 p-4 rounded ${
                  isBookExists(book.book.ISBN) ? "bg-slate-600" : ""
                }`}
              >
                <button
                  onClick={() => addBookCart(book.book)}
                  className="text-lg font-semibold cursor-pointer hover:text-blue-200 hover:cursor-pointer transition-colors"
                >
                  Titulo :{" "}
                  <span className="font-medium">{book.book.title}</span>
                </button>
                <img
                  src={book.book.cover}
                  className="w-[320px] h-[420px] object-cover mx-auto"
                  alt={`Imagen de libro ${book.book.title}`}
                />
              </article>
            ))}
            {filteredBooks.length === 0 && (
              <div
                className="border border-gray-200 col-span-4 text-red-400 text-center        
            "
              >
                No tenemos libros dispoblibles para la busqueda realizada
              </div>
            )}
          </section>
          <aside className="md:w-1/6 px-2 py-6 my-8 md:my-0 border border-gray-200 h-full  ">
            <h2 className="text-white mb-4">
              {isEmpty ? "Libros Seleccionados" : "Lista vacia"}
            </h2>
            {isEmpty ? (
              <ul className="my-8 ">
                {cart.map((book) => (
                  <li
                    key={book.book.ISBN}
                    className="text-slate-100 font-medium text-center  py-4 border-t space-y-2 "
                  >
                    <button
                      className="hover:text-red-500 hover:cursor-pointer transition-colors"
                      onClick={() => removeBookCart(book.book.ISBN)}
                    >
                      {book.book.title}
                    </button>
                    <div>
                      <img src={book.book.cover} className="mx-auto" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <small className="text-slate-300 font-bold italic">
                No hay libros seleccionados
              </small>
            )}
          </aside>
        </main>
      </div>
    </>
  );
}

export default App;
