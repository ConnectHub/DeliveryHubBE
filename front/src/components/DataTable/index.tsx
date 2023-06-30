import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataTableProps {
  data: any[];
  columns: ColumnsType<any>;
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
