import { Pie } from '@ant-design/charts';
import { useQuery } from 'react-query';
import LoadingComponent from '../Loading';
import GlitchError from '../Error';
import { ChartData } from './interfaces';
import { createConfig } from './function';

interface PieChartData {
  queryFunction(): Promise<ChartData[]>;
  title: string;
}

function PieChart({ queryFunction, title }: PieChartData) {
  const { isLoading, error, data } = useQuery<ChartData[], Error>(
    'queryData',
    queryFunction,
  );

  const config = createConfig(data ?? []);

  return (
    <div className="flex flex-col items-center border-solid">
      <h2 className="text-3xl font-semibold mb-2">{title}</h2>
      {isLoading && <LoadingComponent />}
      {error && <GlitchError text="ERROR AO GERAR O GRÁFICO" />}
      {data && data?.length == 0 && (
        <GlitchError text="Não há dados para mostrar!" />
      )}
      {data && data?.length > 0 && <Pie {...config} />}
    </div>
  );
}

export default PieChart;
