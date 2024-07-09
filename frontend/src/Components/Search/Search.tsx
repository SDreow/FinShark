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
    <>
      <form onSubmit={onSearchSubmit}>
        <input value={search} onChange={handleSearchChange} />
      </form>
    </>
  );
};

export default Search; // Export komponenty pro její použití v jiných částech aplikace