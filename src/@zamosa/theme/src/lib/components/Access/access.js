import React from 'react';
import classNames from 'classnames';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import defaultClasses from './access.scss';

const Access = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const assignBarStatus = true ? classes.root_open : '';

    return (
        <aside className={classNames(classes.root, assignBarStatus)}>
            <div>Hello world</div>
        </aside>
    )
};

export default Access;
