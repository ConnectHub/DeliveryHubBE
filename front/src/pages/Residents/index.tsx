import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable';
import { getResidents } from './api';

function ResidentsPage() {
  const { isLoading, error, data } = useQuery('repoData', getResidents);

  if (error) return <div>error</div>;

  if (isLoading) return <div>loading</div>;

  const residents = data?.map((resident) => ({
    name: resident.name,
    phoneNumber: resident.phoneNumber,
    email: resident.email,
    buildingApartment: resident.buildingApartment,
    // Adicione aqui outras propriedades que você deseja incluir no objeto
  })) ?? [];

  return (
    <DataTable
      data={residents}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        // Adicione aqui outras colunas que você deseja exibir na tabela
        {
          title: 'Phone Number',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
        },
        {
          title: 'Building Apartment',
          dataIndex: 'buildingApartment',
          key: 'buildingApartment',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
      ]}
    />
  );
}

export default ResidentsPage;
