import DataTable from './components/DataTable';

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
