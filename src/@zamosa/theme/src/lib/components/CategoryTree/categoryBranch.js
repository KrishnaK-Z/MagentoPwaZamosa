import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Leaf from './categoryLeaf';
import Column from './categoryColumn';

const Branch = props => {
    const { category, defaultClasses, activeCategoryId } = props;
    const { name, children } = category;

    const [hideSecondaryNav, setHideSecondaryNav] = useState(true);
    const handleClick = (e) => {
        e.preventDefault();
        setHideSecondaryNav(!hideSecondaryNav);
    }

    return (
        <li className={defaultClasses.hasChildren}>
            <a onClick={ e => handleClick(e)} className={!hideSecondaryNav ? defaultClasses.selected : null}>{name}</a>
            <ul className={hideSecondaryNav ? classNames(defaultClasses.cdSecondaryNav, defaultClasses.isHidden) : defaultClasses.cdSecondaryNav}>
                { children &&
                    children.map( (child, index) => {
                        return parseInt(child.children_count) === 0 ? (
                            <Leaf key={child.id} category={child}/>
                            )
                            : (
                                <React.Fragment key={child.id} >
                                    <Column categories={child} defaultClasses={defaultClasses} />
                                </React.Fragment>
                            )
                    } )
                }
            </ul>
        </li>
    );
};

export default Branch;
