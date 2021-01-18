import { useCallback } from 'react';

export const useRightBarTrigger = () => {

    const handleOpenSideNav = useCallback(() => {
        console.log("custom hook for the right side bar");
    }, []);

    return {
        handleOpenSideNav
    }
}
