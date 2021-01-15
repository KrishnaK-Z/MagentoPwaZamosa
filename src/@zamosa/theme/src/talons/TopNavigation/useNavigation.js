import { useCallback, useEffect, useState } from 'react';
import { useCatalogContext } from '@magento/peregrine/lib/context/catalog';

export const useNavigation = props => {
    const MqL = 1170;
    /**
     * To check window size on resizing the screen
     * @type {function(): boolean}
     */
    const checkWindowWidth = useCallback(() => {
        let e = window,
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return e[a + 'Width'] >= MqL;
    }, []);

    /**
     * To place the NavBar in right place based on screen size
     */
    const moveNavigation = () => {
        let navigation = document.getElementsByClassName("cd-nav")[0];
        let desktop = checkWindowWidth();
        if ( desktop ) {
            // detach(navigation);
            // navigation.insertBefore('.cd-header-buttons');
        } else {
            // detach(navigation);
            // navigation.insertAfter('.cd-main-content');
        }
    };

    /**
     * To remove the element from DOM
     * @param node
     * @returns {*}
     */
    const detach = (node) => {
        return node.parentElement.removeChild(node);
    }

    /**
     * Adding window resize event listener
     */
    useEffect(() => {
        window.addEventListener("resize", moveNavigation);
        return () => window.removeEventListener("resize", moveNavigation);
    });

    const [catalogState] = useCatalogContext();
    const { categories, rootCategoryId } = catalogState;
    const [categoryId, setCategoryId] = useState(rootCategoryId);

    return {
        checkWindowWidth,
        categories,
        setCategoryId,
        categoryId
    }
}
