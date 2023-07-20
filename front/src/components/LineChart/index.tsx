import { Line } from '@ant-design/charts';
import { ChartData } from './interfaces';
import { configCreate } from './function';

interface LineChartData {
  // queryFunction(): Promise<ChartData[]>;
  title: string;
}

function LineChart({ title }: LineChartData) {
  //data query
  // const { isLoading, error, data } = useQuery<ChartData[], Error>(
  // 'queryData',
  // queryFunction,
  // );

  //data example
  const data = [
    {
      month: 'janeiro',
      value: 3,
    },
    {
      month: '1992',
      value: 4,
    },
    {
      month: '1993',
      value: 3.5,
    },
  ];
  const config = configCreate(data ?? []);
  return (
    <div className="bg-primary p-5 rounded hover:scale-105 w-[1100px]">
      <div className="bg-slate-50 rounded flex flex-col ">
        <span className="text-3xl font-semibold mb-2 text-center py-6">
          {title}
        </span>
        <Line {...config} />
      </div>
    </div>
  );
}

export default LineChart;
