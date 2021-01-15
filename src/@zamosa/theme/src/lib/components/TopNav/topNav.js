import React from 'react';
import { useMegaMenu } from '../../../talons/MegaMenu/useMegaMenu';
import defaultClasses from './topNav.scss';
import CategoryTree from '../CategoryTree';
import logo from './img/cd-logo.svg';

const MegaMenu = props => {
    const { topNavData, activeCategoryId } = useMegaMenu();

    const navBar = <CategoryTree
        categories={topNavData.children}
        activeCategoryId={activeCategoryId}
        defaultClasses={defaultClasses}
    />;

    return (
        <React.Fragment>
            <header className={defaultClasses.cdMainHeader}>
                <a className={defaultClasses.cdLogo} href="#0"><img src={logo} alt="Logo"/></a>
                { navBar }
            </header>
        </React.Fragment>
    )
};

export default MegaMenu;
