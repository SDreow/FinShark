// Importy potřebných knihoven a komponent
import React from "react"; // Import Reactu pro vytváření komponent
import "./Card.css"; // Import CSS stylů pro tuto komponentu
import { CompanySearch } from "../../company"; // Import typu CompanySearch pro práci s daty společností
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio"; // Import komponenty AddPortfolio
import { Link } from "react-router-dom";

// Definice rozhraní pro props přijímané komponentou Card
interface Props {
  id: string; // ID společnosti
  searchResult: CompanySearch; // Výsledek vyhledávání společnosti
  onPortfolioCreate: (e: React.SyntheticEvent) => void; // Funkce pro vytvoření portfolia
}

// Komponenta Card pro zobrazení informací o společnosti
const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate,
}: Props): JSX.Element => {
  // Vykreslení komponenty
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
      <Link
        to={`/company/${searchResult.symbol}/company-profile`}
        className="font-bold text-center text-black md:text-left"
      >
        {searchResult.name} ({searchResult.symbol})
      </Link>
      <p className="text-black">{searchResult.currency}</p>
      <p className="font-bold text-black">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card; // Export komponenty pro její použití v jiných částech aplikace
