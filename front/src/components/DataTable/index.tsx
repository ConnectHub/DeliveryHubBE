import { Table } from 'antd';

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  columns: any[];
}

function DataTable({ data, columns }: DataTableProps) {
  return (
    <Table
      className="overflow-auto"
      bordered
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 7,
      }}
    />
  );
}

export default DataTable;
