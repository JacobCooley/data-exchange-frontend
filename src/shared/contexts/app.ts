import { createContext } from 'react';
import { object } from 'prop-types';

interface ContextProps {
    exchanges: any[];
    pairs: any;
    setState(update: object): object;
}

export const AppInitialValues = {
    exchanges: [],
    pairs: {},
    setState: () => object,
}

const AppContext = createContext<ContextProps>(AppInitialValues);

export default AppContext;
