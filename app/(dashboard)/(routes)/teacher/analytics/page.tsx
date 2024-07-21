import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";
import { Chart } from "./_components/chart";
import { DataCards } from "./_components/data-cards";

const AnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);
  return (
    <div className="p-6">
      <DataCards totalRevenue={totalRevenue} totalSales={totalSales} />

      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
