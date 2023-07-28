import { Bar } from '@ant-design/charts';
import { ChartData } from './interfaces';

interface BarChartData {
  queryFunction?: () => Promise<ChartData[]>;
  title: string;
}
const BarChart = ({ title }: BarChartData) => {
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
    <div className=" bg-primary p-2 rounded sm:min-w-[500px] hover:scale-[1.01]">
      <div className="bg-slate-50 rounded p-2 ">
        <h2 className="text-3xl font-semibold mb-2 text-left">{title}</h2>
        {/* {isLoading && <LoadingComponent />} */}
        {/* {error && <GlitchError text="ERROR AO GERAR O GRÁFICO" />} */}
        {/* {data && data?.length == 0 && (
          <GlitchError text="Não há dados para mostrar!" />
        )} */}
        {data && data?.length > 0 && <Bar {...config} />}
      </div>
    </div>
  );
};

export default BarChart;
