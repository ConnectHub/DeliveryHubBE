import { ChartData } from '../interfaces';

export function createConfig(data: ChartData[]) {
  return {
    appendPadding: 10,
    data: data,
    angleField: 'total',
    colorField: 'description',
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
}
