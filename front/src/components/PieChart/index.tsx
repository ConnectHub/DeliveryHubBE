import { Pie } from '@ant-design/charts';
import LoadingComponent from '../Loading';
import GlitchError from '../Error';
import { createConfig } from './function';
import { UseQueryResult } from 'react-query';
import { ChartData } from '../../pages/Dashboard/interfaces';

interface PieChartData {
  queryFunction: () => UseQueryResult<ChartData[], Error>;
  title: string;
}

function PieChart({ title, queryFunction }: PieChartData) {
  const { isLoading, error, data } = queryFunction();

  const config = createConfig(data ?? []);

  return (
    <div className="flex flex-col items-center min-h-full rounded justify-items-start bg-[#e5e5e5] p-4 sm:min-w-[500px] hover:scale-[1.01]">
      <h2 className="w-full mb-2 text-3xl font-semibold text-left">{title}</h2>
      <div className="flex flex-col items-center justify-center flex-grow">
        {isLoading && <LoadingComponent />}
        {error && <GlitchError text="ERROR AO GERAR O GRÁFICO" />}
        {data && data?.length == 0 && (
          <GlitchError text="Ainda não há dados para mostrar!" />
        )}
        {data && data?.length > 0 && <Pie {...config} />}
      </div>
    </div>
  );
}

export default PieChart;
