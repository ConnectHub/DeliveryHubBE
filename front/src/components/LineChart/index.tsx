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
      value: 1,
    },
    {
      month: 'fevereiro',
      value: 4,
    },
    {
      month: 'março',
      value: 0,
    },
    {
      month: 'maio',
      value: 3,
    },
    {
      month: 'junho',
      value: 4,
    },
    {
      month: 'julho',
      value: 20,
    },
    {
      month: 'agosto',
      value: 3,
    },
    {
      month: 'setembro',
      value: 4,
    },
    {
      month: 'dezembro',
      value: 1,
    },
  ];
  const config = configCreate(data ?? []);

  return (
    <div className="bg-primary p-2 rounded min-w-[200px] w-full hover:scale-[1.01]">
      <div className="bg-slate-50 rounded p-2">
        <h2 className="text-3xl font-semibold mb-2 text-left">{title}</h2>

        <Line {...config} />
      </div>
    </div>
  );
}

export default LineChart;
