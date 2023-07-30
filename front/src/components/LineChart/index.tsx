import { Line } from '@ant-design/charts';
import { ChartData } from './interfaces';
import { configCreate } from './function';
import { UseQueryResult } from 'react-query';
import LoadingComponent from '../Loading';
import GlitchError from '../Error';

interface LineChartData {
  queryFunction: () => UseQueryResult<ChartData[], Error>;
  title: string;
}

function LineChart({ title, queryFunction }: LineChartData) {
  const { isLoading, error, data } = queryFunction();

  const config = configCreate(data ?? []);

  return (
    <div className="bg-primary p-2 rounded min-w-[200px] w-full hover:scale-[1.01]">
      <div className="min-h-full p-2 rounded bg-slate-50">
        <h2 className="mb-2 text-3xl font-semibold text-left">{title}</h2>

        {isLoading && <LoadingComponent />}
        {error && <GlitchError text="ERROR AO GERAR O GRÁFICO" />}
        {data && data?.length == 0 && (
          <GlitchError text="Ainda não há dados para mostrar!" />
        )}
        {data && data?.length > 0 && <Line {...config} />}
      </div>
    </div>
  );
}

export default LineChart;
