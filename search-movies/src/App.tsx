import { useEffect, useId, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { Results } from "./interfaces";

function App() {
  const [movies, setMovies] = useState<Results | null>(null);
  const [search, setSearch] = useState("");
  const prevSearch = useRef("");
  const [value] = useDebounce(search, 1000);
  const [loading, setLoading] = useState(false);
  const searchId = useId();

  const getMovies = async () => {
    if (prevSearch.current === search) return;
    try {
      setMovies(null);
      setLoading(true);
      const url = `https://www.omdbapi.com/?apikey=${
        import.meta.env.VITE_API_KEY
      }&s=${search}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al obtener peliculas");
      prevSearch.current = search;
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getMovies();
  };

  useEffect(() => {
    getMovies();
  }, [value]);
  return (
    <>
      <header className="py-8 space-y-4">
        <h1 className="text-center text-3xl font-bold text-slate-200">
          Movies App <span>🎬</span>
        </h1>

        <form
          onSubmit={handleSearchMovie}
          className="max-w-md mx-auto rounded shadow p-4 bg-gray-100"
        >
          <legend className="text-center font-semibold text-slate-900 mb-4">
            Formulario de busqueda
          </legend>
          <div className="flex gap-4 items-center">
            <label className="text-slate-600 font-bold" htmlFor={searchId}>
              Nombre de la pelicula
            </label>
            <input
              id={searchId}
              type="text"
              placeholder="Batman , spiderman ..."
              className="bg-white px-2 py-1 rounded border border-gray-400"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              value={search}
            />
          </div>
          <button
            type="submit"
            className="py-2 px-10 bg-blue-500 cursor-pointer text-white hover:bg-blue-700 transition-colors mt-4 rounded"
          >
            Buscar
          </button>
        </form>
      </header>

      <main className="max-w-5xl mx-auto w-11/12 lg:w-full">
        {!movies?.Search ? (
          <>
            <h2 className="text-center text-2xl font-bold text-slate-200 mt-8">
              No tenemos resultado para la busqueda
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-bold text-slate-200 mt-8">
              Resultados
            </h2>

            <section className="my-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max">
              {movies?.Search?.map((movie) => (
                <article
                  key={movie.imdbID}
                  className="bg-slate-800 rounded shadow p-4 text-center"
                >
                  <h3 className="text-slate-200 font-bold text-lg">
                    {movie.Title}
                  </h3>
                  <p className="text-slate-400">{movie.Year}</p>
                  <img
                    src={movie.Poster}
                    alt={`imagen de pelicula ${movie.Title}`}
                    className="object-cover mx-auto"
                    loading="lazy"
                  />
                </article>
              ))}
            </section>
          </>
        )}
        <div>
          {loading && (
            <h2 className="text-center text-2xl font-bold text-slate-200 mt-8">
              Cargando...
            </h2>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
