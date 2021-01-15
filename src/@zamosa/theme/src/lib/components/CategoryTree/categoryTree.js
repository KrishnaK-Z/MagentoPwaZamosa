import React from 'react';
import classNames from 'classnames';
import Leaf from './categoryLeaf';
import Branch from './categoryBranch';

const Tree = props => {

    const {
        categories,
        activeCategoryId,
        defaultClasses
    } = props;

    const branches = categories ?
        categories.map( (category, index) => {

            return (parseInt(category.children_count) === 0) ?
                (
                    <Leaf key={category.id} category={category} />
                )
                : (
                    <Branch key={category.id} category={category} defaultClasses={defaultClasses} activeCategoryId={activeCategoryId}/>
                )
        } )
        : null;

    return (
        <nav className="cd-nav">
            <ul id="cd-primary-nav" className={classNames(defaultClasses.cdPrimaryNav, defaultClasses.isFixed)}>
                {branches}
            </ul>
        </nav>
    );
}

export default Tree;
