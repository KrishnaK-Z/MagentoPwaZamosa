import React from 'react';
import { Link, resourceUrl } from '@magento/venia-ui/lib/drivers';

const Leaf = props => {
    const { category, children, defaultClasses } = props;
    const { name, url_path, url_suffix } = category;
    const destination = resourceUrl(`/${url_path}${url_suffix}`);

    return (
        <li className={children ? defaultClasses.hasChildren : null}>
            <Link to={destination}>
                {name}
            </Link>
            {children}
        </li>
    );
};

export default Leaf;
