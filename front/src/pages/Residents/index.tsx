import { useQuery } from "react-query";
import DataTable from "../../components/DataTable";
import { getResidents } from "./api";

function ResidentsPage() {
  const { isLoading, error, data } = useQuery("repoData", getResidents);

  const residents =
    data?.map((resident) => ({
      key: resident.id,
      ...resident,
    })) ?? [];

  console.log(residents);
  if (error) return <div>error</div>;

  if (isLoading) return <div>loading</div>;

  return (
    <DataTable
      data={residents}
      columns={[
        {
          title: "Nome",
          dataIndex: "name",
          key: "name",
        },
        // Adicione aqui outras colunas que você deseja exibir na tabela
        {
          title: "Número de Telefone",
          dataIndex: "phoneNumber",
          key: "phoneNumber",
        },
        {
          title: "Número do Apartamento",
          dataIndex: "buildingApartment",
          key: "buildingApartment",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
      ]}
    />
  );
}

export default ResidentsPage;
