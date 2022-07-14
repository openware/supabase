import { isBrowser } from '../../helpers/isBrowser';
import { useCallback, useEffect, useState } from 'react';

export const useSetMobileDevice = (isHorizonal = false, maxWidth = 768) => {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

    const isMobileResolution = useCallback((definedWindow: Window) => {
        const width = definedWindow.innerWidth;
        const height = definedWindow.innerHeight;

        if (isHorizonal) {
            const query = definedWindow.matchMedia(`(max-height: ${maxWidth}px)`);
            return query.matches && height < maxWidth
        }
        const query =  definedWindow.matchMedia(`(max-width: ${maxWidth}px)`);
        return query.matches && width < maxWidth
    }, [isHorizonal, maxWidth])

    useEffect(() => {
        if (isBrowser()) {
            const handleResize = () => {
                if (isMobileResolution(window)) {
                    setIsMobile(true);
                } else {
                    setIsMobile(false);
                }
            }
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isBrowser, isMobileResolution]);

    return isMobile;
};
