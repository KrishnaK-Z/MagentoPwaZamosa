import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

export const useCategoryTree = props => {
    const { categories } = props;

    const childCategories = useMemo(() => {
        const childCategories = new Map();

        // Add the root category when appropriate.
        if (
            rootCategory &&
            rootCategory.include_in_menu &&
            rootCategory.url_path
        ) {
            childCategories.set(rootCategory.id, {
                category: rootCategory,
                isLeaf: true
            });
        }

        for (const id of children || '') {
            const category = categories[id];
            const isLeaf = !parseInt(category.children_count);

            childCategories.set(id, { category, isLeaf });
        }

        return childCategories;
    }, [categories, children, rootCategory]);

    return {childCategories, data};
}
