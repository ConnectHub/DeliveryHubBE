import BarChart from '../../components/BarChart';
import InformationCard from '../../components/InformationCard';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';

function DashboardPage() {
  return (
    <>
      <h1 className="pb-4 text-4xl text-left">Dashboard</h1>
      <p className="text-lg font-bold text-left">
        work in progress... (miss the back)
      </p>

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

        <div className="flex flex-col gap-10 p-2 xl:flex-row">
          <PieChart title="Entregas por status" />
          <LineChart title="Entregas por mês" />
        </div>

        <div className="p-2">
          <BarChart title="Entregas por condomínio" />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
