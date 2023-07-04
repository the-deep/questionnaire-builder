import {
    wrapRoute,
    unwrapRoute,
} from '#utils/routes';
import type {
    MyInputRouteObject,
    MyInputIndexRouteObject,
    MyInputNonIndexRouteObject,
    MyOutputIndexRouteObject,
    MyOutputNonIndexRouteObject,
    MyOutputRouteObject,
} from '#utils/routes';

import PageError from './PageError';

// NOTE: setting default ExtendedProps
type ExtendedProps = { name?: string };
interface MyWrapRoute {
    <T>(
        myRouteOptions: MyInputIndexRouteObject<T, ExtendedProps>
    ): MyOutputIndexRouteObject<ExtendedProps>
    <T>(
        myRouteOptions: MyInputNonIndexRouteObject<T, ExtendedProps>
    ): MyOutputNonIndexRouteObject<ExtendedProps>
    <T>(
        myRouteOptions: MyInputRouteObject<T, ExtendedProps>,
    ): MyOutputRouteObject<ExtendedProps>
}
const myWrapRoute: MyWrapRoute = wrapRoute;

const root = myWrapRoute({
    title: '',
    path: '/',
    component: () => import('#views/Root'),
    componentProps: {},
    errorElement: <PageError />,
});

const login = myWrapRoute({
    title: 'Login',
    path: 'login',
    component: () => import('#views/Login'),
    componentProps: {},
    parent: root,
});

const register = myWrapRoute({
    title: 'Register',
    path: '/register',
    component: () => import('#views/Register'),
    componentProps: {},
    parent: root,
});

const resetPassword = myWrapRoute({
    title: 'Reset Password',
    path: '/reset-password',
    component: () => import('#views/ResetPassword'),
    componentProps: {},
    parent: root,
});

// FIXME: eager load this page
const resetPasswordRedirect = myWrapRoute({
    title: 'Reset Password',
    path: '/permalink/password-reset/:uuid/:token',
    component: () => import('#redirects/ResetPasswordRedirect'),
    componentProps: {},
    parent: root,
});

const fourHundredFour = myWrapRoute({
    title: '404',
    path: '*',
    component: () => import('#components/FullPageErrorMessage'),
    componentProps: {
        errorTitle: '404',
        errorMessage: 'The page you\'re looking for doesn\'t exist',
    },
    parent: root,
});

export const wrappedRoutes = {
    root,
    login,
    register,
    resetPassword,
    resetPasswordRedirect,
    fourHundredFour,
};

export const unwrappedRoutes = unwrapRoute(Object.values(wrappedRoutes));
