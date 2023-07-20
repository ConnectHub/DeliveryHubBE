import { getTotalByStatus } from './api';
import PieChart from '../../components/PieChart';
import LineChart from '../../components/LineChart';

function DashboardPage() {
  return (
    <>
      <h1 className="text-6xl text-center">Dashboard</h1>
      <h2 className="text-6xl text-center">work in progress</h2>
      <div className="flex justify-center items-center flex-col gap-5">
        <div>
          <LineChart />
        </div>
        <div className="flex gap-4 w-full justify-around">
          {
            <PieChart
              title="Total de entregas por status"
              queryFunction={getTotalByStatus}
            />
          }
          {
            <PieChart
              title="Aqui tá só de exemplo"
              queryFunction={getTotalByStatus}
            />
          }
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
