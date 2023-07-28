import BarChart from '../../components/BarChart';
import InformationCard from '../../components/InformationCard';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';

function DashboardPage() {
  return (
    <>
      <h1 className="text-4xl text-left pb-4">Dashboard</h1>

      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col p-2 sm:flex-row gap-7">
          <InformationCard
            description="Total de encomendas entregues"
            total={1400}
            backgroundColor="bg-violet-700"
          />
          <InformationCard
            description="Total de moradores cadastrados"
            total={15}
            backgroundColor="bg-blue-700"
          />
          <InformationCard
            description="Total de encomendas pendentes"
            total={7}
            backgroundColor="bg-orange-700"
          />
        </div>

        <div className="flex flex-col xl:flex-row p-2 gap-10">
          <PieChart title="Summary" />
          <LineChart title="Summary" />
        </div>

        <div className="p-2">
          <BarChart title="Dev mais forte" />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
