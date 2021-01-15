import React from 'react';
import Leaf from './categoryLeaf';

const Column = props => {

    const { categories, defaultClasses } = props;

    return (
        <Leaf category={categories} defaultClasses={defaultClasses}>
            <ul className={defaultClasses.isHidden}>
                {categories.children.map(category => {
                    return parseInt(category.children_count) !== 0 ? (
                        <Column key={category.id} categories={category} defaultClasses={defaultClasses} />
                    ) : <Leaf key={category.id} category={category} defaultClasses={defaultClasses}/>;
                })}
            </ul>
        </Leaf>
    )
};

export default Column;
