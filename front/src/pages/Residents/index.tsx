import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable';
import { getResidents } from './api';
import NavBar from '../../components/SideBar';
import { columns } from './components/columns';
import Modal from '../../components/Modal';

function ResidentsPage() {
  const { isLoading, error, data } = useQuery('repoData', getResidents);

  const residents =
    data?.map((resident) => ({
      key: resident.id,
      ...resident,
    })) ?? [];

  if (error) return <div>error</div>;

  if (isLoading) return <div>loading</div>;

  return (
    <NavBar>
      <Modal>1</Modal>
      <DataTable data={residents} columns={columns} />
    </NavBar>
  );
}

export default ResidentsPage;
