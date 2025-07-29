import { ChakraProvider } from '@chakra-ui/react';
import { createHashRouter, RouterProvider } from 'react-router';

import { routes } from '~/routes/routes';

import theme from './../theme';
const router = createHashRouter(routes);

function App() {
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    );
}

export default App;
