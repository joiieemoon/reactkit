import EcommerceMetrics from "./components/ecommerce-metrics";
import MonthlySalesChart from "./components/monthly-saleschart";

import StatisticsChart from "./components/statistics-chart";
import MonthlyTarget from "./components/monthly-target";

import PageMeta from "../../components/common/pagemeta/PageMeta";
// import RecentOrders from "./components/recent-orders";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>
        {/* <div className="col-span-12">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
