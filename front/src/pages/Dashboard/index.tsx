import { getTotalByStatus } from './api';
import PieChart from '../../components/PieChart';
import LineChart from '../../components/LineChart';

function DashboardPage() {
  return (
    <>
      <h1 className="text-6xl text-center">Dashboard</h1>
      <h1 className="text-6xl text-center">work in progress...</h1>

      <div className="flex justify-center items-center flex-col gap-5">
        <div>
          <LineChart title="Total de entregas por mês EXEMPLO" />
        </div>
        <div className="flex gap-4 w-full justify-around">
          <PieChart
            title="Total de entregas por status"
            queryFunction={getTotalByStatus}
          />
          <PieChart
            title="Aqui tá só de teste EXEMPLO"
            queryFunction={getTotalByStatus}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
