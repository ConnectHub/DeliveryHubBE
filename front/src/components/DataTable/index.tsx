import { Table } from 'antd';

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  columns: any[];
}

function DataTable({ data, columns }: DataTableProps) {
  return (
    <Table
      bordered
      columns={columns}
      dataSource={data}
      rowSelection={{
        type: 'checkbox',
      }}
    />
  );
}

export default DataTable;
