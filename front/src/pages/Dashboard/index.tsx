import { getTotalByStatus } from "./api"
import PieChart from "../../components/PieChart";

function DashboardPage() {
  return(  
    <>
      <h1 className="text-6xl text-center">Dashboard</h1>
  
      <div className="grid grid-cols-2">
        {<PieChart title="Total de entregas por status" queryFunction={getTotalByStatus} />}
        {<PieChart title="Aqui tá só de exemplo" queryFunction={getTotalByStatus} />}
      </div>
     
    </>
  );
}

export default DashboardPage;
