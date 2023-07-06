import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
