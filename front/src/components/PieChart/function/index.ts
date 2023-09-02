import { ChartData } from '../../../pages/Dashboard/interfaces';

export function createConfig(data: ChartData[]) {
  return {
    appendPadding: 10,
    data: data,
    angleField: 'orderCount',
    colorField: 'status',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
}
