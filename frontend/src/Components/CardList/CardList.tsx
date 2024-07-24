// Importy potřebných knihoven a komponent
import React, { SyntheticEvent } from "react";
import Card from "../Card/Card"; // Import komponenty Card pro zobrazení jednotlivých výsledků
import { CompanySearch } from "../../company"; // Import typu CompanySearch pro práci s výsledky vyhledávání
import { v4 as uuidv4 } from "uuid"; // Import funkce pro generování unikátních ID

// Definice rozhraní pro props přijímané komponentou CardList
interface Props {
  searchResults: CompanySearch[]; // Pole výsledků vyhledávání
  onPortfolioCreate: (e: SyntheticEvent) => void; // Funkce pro vytvoření portfolia
}

// Komponenta CardList pro zobrazení seznamu výsledků vyhledávání
const CardList: React.FC<Props> = ({ searchResults, onPortfolioCreate}: Props): JSX.Element => {
  // Vykreslení komponenty
  return (
    <>
      {searchResults.length > 0 ? ( // Podmíněné vykreslení: pokud existují výsledky, zobrazí se seznam
        searchResults.map((result) => { // Iterace přes výsledky a jejich vykreslení pomocí komponenty Card
          return <Card id={result.symbol} key={uuidv4()} searchResult={result} onPortfolioCreate={onPortfolioCreate}/>;
        })
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
    </>
  );
};

export default CardList; // Export komponenty pro její použití v jiných částech aplikace