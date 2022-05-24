import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from 'src/components/index';
import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CDropdownHeader,
    CDropdownItem,
} from '@coreui/react';
import {
    cilLockLocked,
    cilCog,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Auth from 'src/api/Auth';
import Settings from 'src/api/Settings';
import PostsAPI from 'src/api/PostsAPI';

const postsAPI = new PostsAPI();
const settings = new Settings();
const auth = new Auth();

const PostView = () => {
    const params = useParams();
    let navigate = useNavigate();

    const logout = async () => {
        try {
            // eslint-disable-next-line
            let result = await auth.logout();
        }
        finally {
            navigate('/login', {replace: true});
        }
    }

    const toDashboard = () => {
        window.open('/dashboard');
    }

    const [state, setStateWrapped] = useState({
        loaded: false,
        post: {
            title: '',
            content: '',
            tags: [],
            thumbnail_url: '',
            created_at: '',
        },
    });

    const setState = (updatedValue) => {
        setStateWrapped({
            ...state,
            ...updatedValue
        });
    }

    useEffect(() => {
        async function fetchData() {
            // Load post info
            const post = await postsAPI.getPost(params.id);
            setState({
                loaded: true,
                post: {
                    'title': post.title,
                    'tags': post.tags.split(','),
                    'thumbnail_url': post.thumbnail.url,
                    'content': post.content,
                    'created_at': new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                }
            });
        }
        fetchData();
        // eslint-disable-next-line 
    }, []);

    return (
        <div>

            {settings.isAuthenticated() ? (
                <AppHeader position="fixed" classNames="mb-0" toggler={false} breadcrumb={false} divider={false}>
                    <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
                    <CDropdownItem className="role-button" onClick={() => toDashboard()}>
                        <CIcon icon={cilCog} className="me-2" />
                        Return to app
                    </CDropdownItem>
                    <CDropdownItem className="role-button" onClick={() => logout()}>
                        <CIcon icon={cilLockLocked} className="me-2" />
                        Log out
                    </CDropdownItem>
                </AppHeader>
            ) : ''}
            {state.loaded ? (<CCard className="article-card">
                <CCardHeader><h1>{state.post.title}</h1></CCardHeader>
                <CCardBody>
                    <div className="mb-3">
                        <img alt="preview" className="article-img mx-auto" src={state.post.thumbnail_url} />
                    </div>
                    <div className="mb-3">
                        <pre>{state.post.content}</pre>
                    </div>
                </CCardBody>
                <CCardFooter className="text-right">
                    {state.post.created_at}
                </CCardFooter>
            </CCard>) : ''}
        </div>
    )
}

export default PostView
