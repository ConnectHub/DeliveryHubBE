import { Bar } from '@ant-design/charts';
import { ChartData } from './interfaces';

interface BarChartData {
  queryFunction?: () => Promise<ChartData[]>;
  title: string;
}
function BarChart({ title }: BarChartData) {
  const data = [
    {
      year: 'VINICIN',
      value: 145,
    },
    {
      year: 'MATHIAS MATHEUS',
      value: 61,
    },
    {
      year: 'GIEDO TUDO NOS CONFORMES',
      value: 52,
    },
    {
      year: 'DRACULA',
      value: 15,
    },
  ];
  const config = {
    data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
  };
  return (
    <div className="bg-primary p-2 rounded sm:min-w-[500px] hover:scale-[1.01]">
      <div className="p-2 rounded bg-slate-50 ">
        <h2 className="mb-2 text-3xl font-semibold text-left">{title}</h2>
        {data && data?.length > 0 && <Bar {...config} />}
      </div>
    </div>
  );
}

export default BarChart;
