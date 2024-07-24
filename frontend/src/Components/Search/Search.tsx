// Importy potřebných knihoven a komponent
import React, { ChangeEvent, useState, SyntheticEvent } from "react"; // Import Reactu a potřebných typů

// Definice rozhraní pro props přijímané komponentou Search
interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void; // Funkce, která se má vyvolat při kliknutí na tlačítko
  search: string | undefined; // Aktuální hodnota vyhledávacího řetězce
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void; // Funkce pro zpracování změny vstupního pole
}

// Komponenta Search pro vyhledávací pole
const Search: React.FC<Props> = ({
  onSearchSubmit, // Prop pro funkci vyvolanou kliknutím
  search, // Prop pro aktuální vyhledávací řetězec
  handleSearchChange, // Prop pro funkci zpracovávající změny vstupu
}: Props): JSX.Element => {
  // Vykreslení komponenty
  return (
    <section className="relative bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <form
          className="form relative flex flex-col w-full p-10 space-y-4 bg-darkBlue rounded-lg md:flex-row md:space-y-0 md:space-x-3"
          onSubmit={onSearchSubmit}
        >
          <input
            className="flex-1 p-3 border-2 rounded-lg placeholder-black focus:outline-none"
            id="search-input"
            placeholder="Search companies"
            value={search}
            onChange={handleSearchChange}
          ></input>
        </form>
      </div>
    </section>
  );
};

export default Search; // Export komponenty pro její použití v jiných částech aplikace