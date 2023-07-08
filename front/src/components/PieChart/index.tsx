import { Pie } from '@ant-design/charts';
import { useQuery } from 'react-query';
import LoadingComponent from '../Loading';
import GlitchError from '../Error';


function PieChart({ queryFunction }: { queryFunction: () => Promise<[]> }){

  const { isLoading, error, data } = useQuery("queryData", queryFunction);

  const config = {
    appendPadding: 10,
    data: data ?? [],
    angleField: 'total',
    colorField: 'status',
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
    <>
      {isLoading && <LoadingComponent/>}
      {error && <GlitchError text='ERROR AO GERAR O GRÁFICO'/>}
      {data && <Pie {...config} />}
    </>

  )
  
  
}

export default PieChart