import DEFAULT_OPERATIONS from '../../lib/queries/megaMenu.gql';
import { useQuery } from '@apollo/client';
import { useMemo, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useMegaMenu = props => {

    const { getTopNavQuery } = DEFAULT_OPERATIONS;

    const location = useLocation();
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    const { data } = useQuery(getTopNavQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    /**
     * Quick Sort the category based on the position
     * ref: https://programmingmentor.com/post/simplest-explanation-quicksort-js/
     * @type {(...args: any[]) => any}
     */
    const quickSort = useCallback((items) => {
        if (items.length <=1 ) return items;

        const [pivot, ...rest] = items;
        const left = [], right = [];
        rest.forEach( cat => cat.position <= pivot.position ? left.push(cat) : right.push(cat) );
        return [...quickSort(left), pivot, ...quickSort(right)];
    }, []);

    /**
     * Check if category should be visible on the storefront.
     *
     * @param category
     * @returns {boolean}
     */
    const shouldRenderCategory = category => {
        return !!category.include_in_menu === true;
    };

    /**
     * Check if category is the active category based on the current location.
     *
     * @type {function(*): boolean}
     */
    const isActive = useCallback(
        category => {
            const categoryUrlPath =
                '/' + category.url_path + category.url_suffix;

            if (location.pathname === categoryUrlPath) {
                setActiveCategoryId(category.path[0]);
                return true;
            }

            return false;
        },
        [location.pathname]
    )


    /**
     * Process data recursively for checking active category and adding path details
     * @type {function(*=, *=, *=): any}
     */
    const processData = useCallback(
        (category, path=[], isRoot = true) => {
            if (!category) return;

            const topNavCategory = Object.assign({}, category);

            if (!isRoot) {
                topNavCategory.path = [...path, category.id];
            }

            topNavCategory.isActive = isActive(topNavCategory);

            if (topNavCategory.children) {
                topNavCategory.children = quickSort(topNavCategory.children)
                    .filter( category => shouldRenderCategory(category) )
                    .map( child => processData(child, topNavCategory.path, false) );
            }

            return topNavCategory;
        }, [isActive, quickSort]
    );

    const topNavData = useMemo(() => {
        return data ? processData(data.categoryList[0]) : null;
    }, [data, processData()]);

    return {
        topNavData: topNavData ? topNavData : {},
        activeCategoryId
    };
};
