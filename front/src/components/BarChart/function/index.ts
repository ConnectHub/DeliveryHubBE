import { ChartData } from '../../../pages/Dashboard/interfaces';

export function createConfig(data: ChartData[]) {
  return {
    data,
    xField: 'value',
    yField: 'condominiumName',
    seriesField: 'condominiumName',
  };
}
