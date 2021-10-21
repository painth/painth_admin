import React from 'react'

const pagesRoutes = [
    {
        path: '/page/catalogue_new',
        component: React.lazy(() => import('./CatelogNew')),
    },
    {
        path: '/page/catalogue_list',
        component: React.lazy(() => import('./CatelogNew')),
    }
]

export default pagesRoutes