import React, { useEffect, useState } from "react";
import { CompanyBalanceSheet, CompanyCashFlow } from "../../company";
import { useOutletContext } from "react-router";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormating";

type Props = {};

const config = [
  {
    Label: <div className="font-bold">Total Assets</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalAssets),
  },
  {
    Label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentAssets),
  },
  {
    Label: "Total Cash",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.cashAndCashEquivalents),
  },
  {
    Label: "Property & equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
  },
  {
    Label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.intangibleAssets),
  },
  {
    Label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    Label: "Total Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherCurrentLiabilities),
  },
  {
    Label: <div className="font-bold">Total Liabilites</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalLiabilities),
  },
  {
    Label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentLiabilities),
  },
  {
    Label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    Label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherLiabilities),
  },
  {
    Label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalStockholdersEquity),
  },
  {
    Label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.retainedEarnings),
  },
];

const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();
  useEffect(() => {
    const getData = async () => {
      const value = await getBalanceSheet(ticker!);
      setBalanceSheet(value?.data[0]);
    };
    getData();
  }, []);
  return (
    <>
      {balanceSheet ? (
        <RatioList config={config} data={balanceSheet} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default BalanceSheet;
