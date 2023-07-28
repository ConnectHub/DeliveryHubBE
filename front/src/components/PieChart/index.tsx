import { Pie } from '@ant-design/charts';
import { useQuery } from 'react-query';
import LoadingComponent from '../Loading';
import GlitchError from '../Error';
import { ChartData } from './interfaces';
import { createConfig } from './function';

interface PieChartData {
  queryFunction?: () => Promise<ChartData[]>;
  title: string;
}

function PieChart({ queryFunction, title }: PieChartData) {
  // const { isLoading, error, data } = useQuery<ChartData[], Error>(
  //   'queryData',
  //   queryFunction,
  // );

  const data = [
    {
      description: 'PENDENTE',
      total: 10,
    },
    {
      description: 'ENTREGUE',
      total: 10,
    },
    {
      description: 'CANCELADAS',
      total: 10,
    },
  ];

  const isLoading = false;
  const error = false;
  const config = createConfig(data ?? []);

  return (
    <div className=" bg-primary p-2 rounded sm:min-w-[500px] hover:scale-[1.01]">
      <div className="bg-slate-50 rounded p-2 ">
        <h2 className="text-3xl font-semibold mb-2 text-left">{title}</h2>
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
