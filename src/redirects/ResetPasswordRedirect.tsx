import { isNotDefined } from '@togglecorp/fujs';
import {
    Navigate,
    generatePath,
    useParams,
} from 'react-router-dom';

import { wrappedRoutes } from '../App/routes.tsx';

interface ResetPasswordParams extends Record<string, string | undefined> {
    uuid: string | undefined;
    token: string | undefined;
}

// eslint-disable-next-line import/prefer-default-export
export function Component() {
    const { uuid, token } = useParams<ResetPasswordParams>();

    const resetPasswordLink = (uuid && token) ? ({
        pathName: (generatePath(wrappedRoutes.resetPassword.absolutePath)),
        state: {
            uuid,
            token,
        },
    }) : ({
        pathName: (generatePath(wrappedRoutes.fourHundredFour.absolutePath)),
        state: {},
    });

    if (isNotDefined(resetPasswordLink)) {
        return null;
    }

    return (
        <Navigate
            to="/reset-password"
            state={resetPasswordLink.state}
            replace
        />
    );
}

Component.displayName = 'ResetPasswordRedirect';
