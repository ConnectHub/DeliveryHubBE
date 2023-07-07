import { useMutation, useQuery, useQueryClient } from "react-query";
import {getTotalByStatus} from "./api"
function DashboardPage() {
  const { isLoading, error, data } = useQuery("queryData", getTotalByStatus);

  return(
    <>
     <h1>Dashboard {data}</h1>
     
    </>
  );
}

export default DashboardPage;
