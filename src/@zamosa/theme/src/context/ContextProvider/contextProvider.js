import React from 'react';
import { AppContextProvider } from '@magento/venia-ui/lib/components/App';

/**
 * List of context providers that are required to run Zamosa
 *
 * @property {React.Component[]} contextProviders
 */
const contextProviders = [
    AppContextProvider
];

const ZamosaContextProvider = ({children}) => {
    return contextProviders.reduceRight((memo, ContextProvider) => {
        return (
            <ContextProvider>
                {memo}
            </ContextProvider>
        );
    }, children);
};

export default ZamosaContextProvider;
