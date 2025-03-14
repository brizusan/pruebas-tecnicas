import { useCats } from "./hooks/useCats";

function App() {
  const { fact, loading, getFact, firstLetter } = useCats();

  return (
    <>
      <main className="py-12 max-w-2xl mx-auto ">
        <h1 className="text-center text-2xl font-bold text-slate-900 mb-4">
          App de Acciones de gatitos
        </h1>
        <div className="flex justify-center my-6">
          <button
            onClick={getFact}
            className="w-[250px] transition-colors hover:cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded py-2 font-semibold"
          >
            Actualizar accion
          </button>
        </div>
        <section className="lg:flex items-center lg:gap-12 space-y-8">
          <div className="flex justify-center">
            <strong className="text-blue-600 text-center">"{fact}"</strong>
          </div>

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          )}

          {firstLetter && !loading && (
            <div className="flex justify-center">
              <img
                src={`https://cataas.com/cat/says/${firstLetter}`}
                alt="imagen de gatito"
                className="w-96"
                loading="lazy"
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
