import React, { useEffect, useState } from "react";
import { CompanyIncomeStatement } from "../../company";
import { useOutletContext } from "react-router";
import { getIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormating";

type Props = {};

const configs = [
  {
    Label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    Label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    Label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    Label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    Label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    Label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    Label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    Label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.netIncomeRatio),
  },
  {
    Label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    Label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.epsdiluted),
  },
  {
    Label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.grossProfitRatio),
  },
  {
    Label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.operatingIncomeRatio),
  },
  {
    Label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.incomeBeforeTaxRatio),
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] =
    useState<CompanyIncomeStatement[]>();
  useEffect(() => {
    const incomeStatementFetch = async () => {
      const result = await getIncomeStatement(ticker!);
      setIncomeStatement(result!.data);
    };
    incomeStatementFetch();
  }, []);
  return (
    <>
      {incomeStatement ? (
        <>
          <Table config={configs} data={incomeStatement} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default IncomeStatement;
