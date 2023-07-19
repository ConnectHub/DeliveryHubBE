import { Pie } from '@ant-design/charts';
import { useQuery } from 'react-query';
import LoadingComponent from '../Loading';
import GlitchError from '../Error';
import { ChartData } from './interfaces';

interface PieChartData {
  queryFunction(): Promise<ChartData[]>;
  title: string;
}

function PieChart({ queryFunction, title }: PieChartData) {
  const { isLoading, error, data } = useQuery<ChartData[], Error>(
    'queryData',
    queryFunction,
  );

  const config = {
    appendPadding: 10,
    data: data ?? [],
    angleField: 'total',
    colorField: 'description',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div className="flex flex-col items-center border-solid">
      <h2 className="text-3xl font-semibold mb-2">{title}</h2>
      {isLoading && <LoadingComponent />}
      {error && <GlitchError text="ERROR AO GERAR O GRÁFICO" />}
      {data && <Pie {...config} />}
    </div>
  );
}

export default PieChart;
