import { React, useEffect, useState } from 'react'

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CCardImage,
    CCardTitle,
    CCardText,
} from '@coreui/react'

import Posts from 'src/api/PostsAPI';

const postsAPI = new Posts();

const Dashboard = () => {

    const [state, setStateWrapped] = useState({
        postsList: [],
    });

    const setState = (updatedValue) => {
        setStateWrapped({
            ...state,
            ...updatedValue
        });
    }

    useEffect(() => {
        async function fetchData() {
            const posts = await postsAPI.getPosts(1, 9, 'desc');
            setState({
                postsList: posts.data,
            })
        }
        fetchData();
        // eslint-disable-next-line 
    }, []);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <h1>Dashboard</h1> Recent Posts
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            {state.postsList.map((post, index) => (
                                <PostCard post={post} key={index} />
                            ))}
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

const PostCard = (props) => {
    return (
        <CCol xs={4} className="mb-3">
            <CCard>
                <CCardImage orientation="top" src={props.post.thumbnail.url} />
                <CCardBody>
                    <CCardTitle>{props.post.title}</CCardTitle>
                    <CCardText>
                        <pre>{props.post.content}</pre>
                    </CCardText>
                    <CButton href={'/article/' + props.post.id} target="_blank">See Article</CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
}

export default Dashboard
