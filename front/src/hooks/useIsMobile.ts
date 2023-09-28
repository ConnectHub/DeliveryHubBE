import { useMediaQuery } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const isSmallDevice = useMediaQuery('only screen and (max-width : 600px)');
  const isMediumDevice = useMediaQuery(
    'only screen and (min-width : 769px) and (max-width : 992px)',
  );
  const isLargeDevice = useMediaQuery(
    'only screen and (min-width : 993px) and (max-width : 1200px)',
  );
  const isExtraLargeDevice = useMediaQuery(
    'only screen and (min-width : 1201px)',
  );

  useEffect(() => {
    if (isSmallDevice || isMediumDevice) {
      setIsMobile(true);
    } else if (isLargeDevice || isExtraLargeDevice) {
      setIsMobile(false);
    }
  }, [isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice]);

  return isMobile;
};
