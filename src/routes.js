import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Posts
const Posts = React.lazy(() => import('./views/posts/Posts'));
const PostsList = React.lazy(() => import('./views/posts/PostsList'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/posts', name: 'Posts', element: PostsList },
    { path: '/posts/create', name: 'Create', element: Posts, permissions: ['create_article'] },
    { path: '/posts/edit/:id', name: 'Edit', element: Posts, permissions: ['edit_article'] },
]

export default routes
