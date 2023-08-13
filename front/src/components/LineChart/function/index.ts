import { ChartData } from '../../../pages/Dashboard/interfaces';

export function configCreate(data: ChartData[]) {
  return {
    data,
    xField: 'month',
    yField: 'orderCount',
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: '#000',
        stroke: '#000',
        lineWidth: 4,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
    smooth: true,
  };
}
