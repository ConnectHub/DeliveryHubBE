import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable';
import { getResidents } from './api';

function ResidentsPage() {
  const { isLoading, error, data } = useQuery('repoData', getResidents);

  if (error) return <div>error</div>;

  if (isLoading) return <div>loading</div>;

  console.log(data?.forEach((resident) => console.log(resident.name)));

  return (
    <DataTable
      data={[
        {
          name: 'John Doe',
        },
      ]}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
      ]}
    />
  );
}

export default ResidentsPage;
