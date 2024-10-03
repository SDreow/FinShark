import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import { get } from "http";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Title from "../../Components/Title/Title";
import Spinner from "../../Components/Spinner/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";
import { formatRatio } from "../../Helpers/NumberFormating";

interface Props {}

const CompanyPage = (props: Props) => {
  //https:localhost:3000/
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);
  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Title title="Company Name" subTitle={company.companyName}></Title>
            <Title title="Price" subTitle={"$" + company.price.toString()}></Title>
            <Title title="DCF" subTitle={"$" +  formatRatio(company.dcf)}></Title>
            <Title title="Sector" subTitle={company.sector}></Title>
            <CompFinder ticker={company.symbol} />
            <TenKFinder ticker={company.symbol} />
            <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;
