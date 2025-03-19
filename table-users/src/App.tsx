import { useEffect, useMemo, useRef, useState } from "react";
import { type User } from "./interface";

export enum SortBy {
  NONE = "none",
  NAME = "name",
  LAST = "last",
  COUNTRY = "country",
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [colored, setColored] = useState(false);
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const usersRef = useRef([]);

  const fetchData = async () => {
    try {
      const url = `https://randomuser.me/api/?results=100`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al realizar la peticion");
      const data = await res.json();
      usersRef.current = data.results;
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetState = () => {
    alert("Recuperando estado inicial");
    setUsers(usersRef.current);
  };

  const deleteUser = (id: string) => {
    const newArray = users.filter((user) => user.login.uuid !== id);
    setUsers(newArray);
  };

  const changeSorting = (sort: SortBy) => {
    setSorting(sort);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const filtersUsers = useMemo(
    () =>
      users && filter !== ""
        ? users.filter((user) =>
            user.location.country.toLowerCase().includes(filter.toLowerCase())
          )
        : users,
    [filter, users]
  );

  // const sortUsers = useMemo(
  //   () =>
  //     sorted
  //       ? [...filtersUsers].sort(
  //           (
  //             a: { location: { country: string } },
  //             b: { location: { country: string } }
  //           ) => a.location.country.localeCompare(b.location.country)
  //         )
  //       : filtersUsers,
  //   [sorted, filtersUsers]
  // );

  const sortUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filtersUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    const extractProperty = compareProperties[sorting];
    return [...filtersUsers].sort((a, b) =>
      extractProperty(a).localeCompare(extractProperty(b))
    );
  }, [filtersUsers, sorting]);

  const isEmpty = useMemo(() => users.length === 0, [users]);
  const filterEmpty = useMemo(() => sortUsers.length === 0, [sortUsers]);

  return (
    <>
      <header className="py-16">
        <h1 className="text-center text-4xl text-slate-800 font-bold font-mono">
          Prueba Tecnica | TypeScript
        </h1>

        <section className="flex gap-4 my-12 justify-center items-center">
          <button onClick={() => setColored(!colored)}>Colorear</button>
          <button onClick={toggleSortByCountry}>
            {sorting === SortBy.COUNTRY ? "Lista Ordenada" : "Ordenar por país"}
          </button>
          <button onClick={() => resetState()}>Resetear estado</button>

          <form>
            <input
              type="text"
              placeholder="Canada..."
              className="border-2 border-gray-200 rounded-md p-1 px-3"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </form>
        </section>
      </header>

      {isEmpty && (
        <h3 className="text-red-500 text-2xl text-center my-8">
          No tenemos usuario registrados
        </h3>
      )}

      {!isEmpty && (
        <main className="w-11/12 lg:w-5/6 2xl:w-full mx-auto">
          <h2 className="text-center text-2xl mb-4 font-bold">
            Lista de usuarios <span>{users.length}</span>
          </h2>
          <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max text-slate-800">
              <thead>
                <tr className="text-slate-500 border-b border-slate-300 bg-slate-50 ">
                  <th className="p-4">
                    <p className="text-sm leading-none font-medium">Foto</p>
                  </th>
                  <th className="p-4">
                    <p
                      onClick={() => changeSorting(SortBy.NAME)}
                      className="text-sm leading-none font-medium cursor-crosshair"
                    >
                      Nombre
                    </p>
                  </th>
                  <th className="p-4">
                    <p
                      onClick={() => changeSorting(SortBy.LAST)}
                      className="text-sm leading-none font-medium cursor-crosshair"
                    >
                      Apellido
                    </p>
                  </th>
                  <th className="p-4">
                    <p
                      onClick={() => changeSorting(SortBy.COUNTRY)}
                      className="text-sm leading-none font-medium hover:cursor-pointer"
                    >
                      Pais
                    </p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-medium">Acciones</p>
                  </th>
                </tr>
              </thead>

              {filterEmpty && (
                <tbody>
                  <tr className="hover:bg-slate-50 text-slate-700">
                    <td colSpan={5} className="p-4">
                      <p className="text-sm text-center">
                        No se encontraron usuarios
                      </p>
                    </td>
                  </tr>
                </tbody>
              )}

              {!filterEmpty && (
                <tbody>
                  {sortUsers?.map((user) => {
                    return (
                      <tr
                        key={`${user.email}-${user.name.last}`}
                        className={`hover:bg-slate-50 text-slate-700 ${
                          colored ? "colorear" : ""
                        }`}
                      >
                        <td className="p-4">
                          <img
                            loading="lazy"
                            src={user.picture.medium}
                            alt={`imagen de usuario - ${user.name.first}`}
                            className="rounded-full w-12 h-12"
                          />
                        </td>
                        <td className="p-4">
                          <p className="text-sm">{user.name.first}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm">{user.name.last}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm">{user.location.country}</p>
                        </td>

                        <td className="p-4">
                          <button onClick={() => deleteUser(user.login.uuid)}>
                            Borrar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
