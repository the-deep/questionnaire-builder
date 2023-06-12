import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import '@the-deep/deep-ui/build/esm/index.css';

import { unwrappedRoutes } from './routes';

const router = createBrowserRouter(unwrappedRoutes);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
