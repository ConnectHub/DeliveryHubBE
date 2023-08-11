import { Bar } from '@ant-design/charts';
import { ChartData } from '../../pages/Dashboard/interfaces';
import { UseQueryResult } from 'react-query';
import { createConfig } from './function';
import LoadingComponent from '../Loading';
import GlitchError from '../Error';

interface BarChartData {
  queryFunction: () => UseQueryResult<ChartData[], Error>;
  title: string;
}
function BarChart({ title, queryFunction }: BarChartData) {
  const { isLoading, error, data } = queryFunction();

  const config = createConfig(data ?? []);

  return (
    <div className="bg-primary p-2 rounded sm:min-w-[500px] hover:scale-[1.01]">
      <div className="p-2 rounded bg-slate-50 ">
        <h2 className="mb-2 text-3xl font-semibold text-left">{title}</h2>
        {isLoading && <LoadingComponent />}
        {error && <GlitchError text="ERROR AO GERAR O GRÁFICO" />}
        {data && data?.length == 0 && (
          <GlitchError text="Ainda não há dados para mostrar!" />
        )}
        {data && data?.length > 0 && <Bar {...config} />}
      </div>
    </div>
  );
}

export default BarChart;
