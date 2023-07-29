import { ChartData } from '../interfaces';

export function createConfig(data: ChartData[]) {
  return {
    data: data,
    angleField: 'total',
    colorField: 'description',
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
