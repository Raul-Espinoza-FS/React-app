import React, { Component, Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './api/PrivateRoute'
import 'react-toastify/dist/ReactToastify.css';
import './scss/style.scss'

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const PostView = React.lazy(() => import('./views/post-view/PostView'));

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Suspense fallback={loading}>
					<Routes>
						<Route exact path="/login" name="Login Page" element={<Login />} />
						<Route exact path="/404" name="Page 404" element={<Page404 />} />
						<Route exact path="/500" name="Page 500" element={<Page500 />} />
						<Route exact path="/article/:id" name="Page 500" element={<PostView />} />
						<Route path="*" element={
							<PrivateRoute>
								<DefaultLayout />
							</PrivateRoute>
						}>
						</Route>
					</Routes>
				</Suspense>
				<ToastContainer />
			</BrowserRouter>
		)
	}
}

export default App
