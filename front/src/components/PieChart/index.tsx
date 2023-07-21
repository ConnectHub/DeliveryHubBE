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
    <div className="flex flex-col bg-primary p-5 rounded hover:scale-105 w-[750px]">
      <div className="bg-slate-50 rounded min-h-[300px]">
        <h2 className="text-3xl font-semibold mb-2 text-center">{title}</h2>
        {isLoading && <LoadingComponent />}
        {error && <GlitchError text="ERROR AO GERAR O GRÁFICO" />}
        {data && data?.length == 0 && (
          <GlitchError text="Não há dados para mostrar!" />
        )}
        {data && data?.length > 0 && <Pie {...config} />}
      </div>
    </div>
  );
}

export default PieChart;
