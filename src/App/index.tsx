import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { unique } from '@togglecorp/fujs';
import {
    AlertContainer,
    AlertContext,
    AlertOptions,
} from '@the-deep/deep-ui';
import '@the-deep/deep-ui/build/esm/index.css';

import { apolloClient } from '#configs/apollo';

import { unwrappedRoutes } from './routes';
import styles from './index.module.css';

const router = createBrowserRouter(unwrappedRoutes);

function App() {
    const [alerts, setAlerts] = React.useState<AlertOptions[]>([]);

    const addAlert = React.useCallback(
        (alert: AlertOptions) => {
            // FIXME: this behavior is faulty
            setAlerts((prevAlerts) => unique(
                [...prevAlerts, alert],
                (a) => a.name,
            ) ?? prevAlerts);
        },
        [setAlerts],
    );

    const removeAlert = React.useCallback(
        (name: string) => {
            setAlerts((prevAlerts) => {
                const i = prevAlerts.findIndex((a) => a.name === name);
                if (i === -1) {
                    return prevAlerts;
                }

                const newAlerts = [...prevAlerts];
                newAlerts.splice(i, 1);

                return newAlerts;
            });
        },
        [setAlerts],
    );

    const updateAlertContent = React.useCallback(
        (name: string, children: React.ReactNode) => {
            setAlerts((prevAlerts) => {
                const i = prevAlerts.findIndex((a) => a.name === name);
                if (i === -1) {
                    return prevAlerts;
                }

                const updatedAlert = {
                    ...prevAlerts[i],
                    children,
                };

                const newAlerts = [...prevAlerts];
                newAlerts.splice(i, 1, updatedAlert);

                return newAlerts;
            });
        },
        [setAlerts],
    );

    const alertContext = React.useMemo(
        () => ({
            alerts,
            addAlert,
            updateAlertContent,
            removeAlert,
        }),
        [alerts, addAlert, updateAlertContent, removeAlert],
    );

    return (
        <ApolloProvider client={apolloClient}>
            <AlertContext.Provider value={alertContext}>
                <AlertContainer className={styles.alertContainer} />
                <RouterProvider router={router} />
            </AlertContext.Provider>
        </ApolloProvider>
    );
}

export default App;
