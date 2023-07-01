import { useMutation, useQuery, useQueryClient } from 'react-query';
import DataTable from '../../components/DataTable';
import { createResident, getResidents } from './api';
import NavBar from '../../components/SideBar';
import { columns } from './components/columns';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const query = 'residentData';

function ResidentsPage() {
  const { isLoading, error, data } = useQuery(query, getResidents);
  const { mutate } = useMutation(createResident, {
    onMutate: (resident) => {
      if (data) {
        queryClient.setQueryData(query, [...data, resident]);
      }
    },
    onSuccess: () => {
      toast.success('Resident created successfully');
    },
    onError: (error: string) => {
      toast.error(JSON.parse(error)[0].message);
    },
  });
  const queryClient = useQueryClient();

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
      <button
        onClick={() =>
          mutate({
            id: '1',
            buildingApartment: '1',
            email: '1',
            name: '1',
            phoneNumber: '1',
          })
        }
      >
        1
      </button>
      <DataTable data={residents} columns={columns} />
    </NavBar>
  );
}

export default ResidentsPage;
