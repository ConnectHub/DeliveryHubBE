import { ChartData } from '../../../pages/Dashboard/interfaces';

export function createConfig(data: ChartData[]) {
  return {
    data: data,
    angleField: 'orderCount',
    colorField: 'status',
    radius: 0.75,
    label: {
      type: 'inner',
      style: {
        fill: '#000000',
      },
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
}
