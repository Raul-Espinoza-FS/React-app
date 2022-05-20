import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
    const currentLocation = useLocation().pathname

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
        return currentRoute ? currentRoute.name : false;
    }

    const getBreadcrumbs = (location) => {
        const breadcrumbs = []
        location.split('/').reduce((prev, curr, index, array) => {
            const currentPathname = `${prev}/${curr}`
            const routeName = getRouteName(currentPathname, routes)
            routeName &&
                breadcrumbs.push({
                    pathname: currentPathname,
                    name: routeName,
                    active: index + 1 === array.length ? true : false,
                })
            return currentPathname
        })
        return breadcrumbs
    }

    const breadcrumbs = getBreadcrumbs(currentLocation)

    return (
        <CBreadcrumb className="m-0 ms-2">
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <CBreadcrumbItem
                        {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
                        key={index}
                    >
                        {breadcrumb.name}
                    </CBreadcrumbItem>
                )
            })}
        </CBreadcrumb>
    )
}

export default React.memo(AppBreadcrumb)
