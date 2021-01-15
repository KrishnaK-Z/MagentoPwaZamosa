import { useCallback, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

export const useCategoryBranch = props => {
    const { query, categoryId } = props;

    const [runQuery, queryResult] = useLazyQuery(query);
    const { data } = queryResult;

    console.log(categoryId, data);

    useEffect(() => {
        runQuery({variables: {id: categoryId}})
    }, [categoryId]);

    const menuItems = (data && data.category) || null;
    const { children } = menuItems || [];

    return {
        data,
        menuItems,
        children
    };
}
