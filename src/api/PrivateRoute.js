import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import routes from 'src/routes';
import Settings from './Settings';

const PrivateRoute = ({ children }) => {
    const auth = new Settings();
    const location = useLocation();

    // Check permissions
    const getRouteName = (pathname, routes) => {
        const currentRoute = routes.find((route) => {
            let segments = route.path.split('/');
            segments = segments.map((segment) => {
                return segment.startsWith(':') ? '.+' : segment;
            })
            // It has to be escaped
            // eslint-disable-next-line
            return pathname.match(new RegExp('^' + segments.join('\/') + '$', 'g')) ? true : false;
        })
        return currentRoute ? currentRoute : false;
    }

    if (auth.isAuthenticated()) {
        // Check permissions on current route
        let clear = true;
        let routeData = getRouteName(location.pathname, routes);
        if (routeData && routeData.permissions) {
            routeData.permissions.forEach(permission => {
                if (!auth.can(permission)) {
                    clear = false;
                }
            });
        }

        if (!clear) {
            // If not, return element that will navigate to login page
            return <Navigate to="/404" state={{ from: location }} replace />
        }

        // If authorized, return the children
        return children;
    }
    else {
        // If not, return element that will navigate to login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

}

export default PrivateRoute