import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CBadge,
} from '@coreui/react';

import Posts from 'src/api/PostsAPI';

const postsAPI = new Posts();

const PostsList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setStateWrapped] = useState({
        currentPage: (searchParams.get('page') !== null) ? Number(searchParams.get('page')) : 1,
        totalItems: 0,
        itemsPerPage: (searchParams.get('perPage') !== null) ? Number(searchParams.get('perPage')) : 20,
        direction: (searchParams.get('direction') !== null) ? searchParams.get('direction') : 'desc',
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
            setSearchParams({
                page: state.currentPage,
                perPage: state.itemsPerPage,
                direction: state.direction
            });
            const posts = await postsAPI.getPosts(state.currentPage, state.itemsPerPage, state.direction);
            setState({
                totalItems: posts.total,
                postsList: posts.data,
            })
        }
        fetchData();
        // eslint-disable-next-line 
    }, []);

    const pageChanged = async (page) => {
        let posts = await postsAPI.getPosts(page, state.itemsPerPage, state.direction);
        setSearchParams({
            page: page,
            perPage: state.itemsPerPage,
            direction: state.direction
        });
        // Update the state
        setState({
            currentPage: page,
            postsList: posts.data,
            totalItems: posts.total,
        });

    }

    const handleDeletePost = async (post_id) => {
        toast.info('Deleting post id: ' + post_id, { autoClose: 5000, closeOnClick: true });
        let result = await postsAPI.deletePost(post_id);
        // update the 
        if (result.deleted) {
            toast.success('Post deleted!', { autoClose: 5000, closeOnClick: true });
            // Reload post list
            const posts = await postsAPI.getPosts(state.currentPage, state.itemsPerPage, state.direction);
            setState({
                totalItems: posts.total,
                postsList: posts.data,
            })
        }
    }

    return (
        <CCard>
            <CCardHeader>
                <CRow className="justify-content-between">
                    <CCol xs={12} xl={9} className="line-40">
                        Posts List
                    </CCol>
                    <CCol xs={12} xl={3} className="text-right">
                        <Link className="btn btn-success mr-1" to="/posts/create">Create Post</Link>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                        <CTableRow>
                            <CTableHeaderCell>Title</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Tags</CTableHeaderCell>
                            <CTableHeaderCell>Created</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {state.postsList.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>
                                    {item.title}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <TagBadges tags={item.tags.split(',')}></TagBadges>
                                </CTableDataCell>
                                <CTableDataCell>
                                    {new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <Link className="btn btn-secondary mr-1" to={"/article/" + item.id}>
                                        View
                                    </Link>
                                    <Link className="btn btn-primary mr-1 enabled" to={"/posts/edit/" + item.id}>
                                        Edit
                                    </Link>
                                    <ConfirmationModal handleAction={() => handleDeletePost(item.id)}></ConfirmationModal>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
                <Pagination totalItems={state.totalItems} itemsPerPage={state.itemsPerPage} currentPage={state.currentPage} pageChanged={pageChanged}></Pagination>
            </CCardBody>
        </CCard>
    )
}

const ConfirmationModal = (props) => {
    const [visible, setVisible] = useState(false);
    const okAction = () => {
        props.handleAction();
        setVisible(false);
    }
    return (
        <>
            <CButton color="danger" onClick={() => setVisible(!visible)}>Delete</CButton>
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Are you sure to delete the post?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Once deleted the post can&apos;t be recovered.
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="danger" onClick={okAction}>Delete Post</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

const Pagination = (props) => {
    // Calculate the number of pages based on the totalItems and itemsPerPage values
    const totalPages = Math.floor(props.totalItems / props.itemsPerPage) ? props.totalItems / props.itemsPerPage : 1;
    const currentPage = (props.currentPage > Math.ceil(props.totalItems / props.itemsPerPage)) ? 1 : props.currentPage;

    let paginationItems = [];
    let upperLimit = ((currentPage + 3) > totalPages) ? totalPages : (currentPage + 3);
    upperLimit = ((totalPages >= 7) && (upperLimit <= 7)) ? 7 : upperLimit;
    let lowerLimit = ((currentPage - 3) > 0) ? (currentPage - 3) : 1;
    lowerLimit = ((totalPages >= 7) && ((upperLimit - lowerLimit) <= 5)) ? (upperLimit - 6) : lowerLimit;

    for (let pageNumber = lowerLimit; pageNumber <= upperLimit; pageNumber++) {
        if (currentPage === pageNumber) {
            paginationItems.push((<CPaginationItem key={pageNumber} active>{pageNumber}</CPaginationItem>));
        }
        else {
            paginationItems.push((<CPaginationItem onClick={() => { props.pageChanged(pageNumber) }} key={pageNumber}>{pageNumber}</CPaginationItem>));
        }
    }

    return (
        <CRow>
            <CCol>
                <CPagination className="mt-3" >
                    {paginationItems}
                </CPagination>
            </CCol>
        </CRow>
    );
}

const TagBadges = (props) => {
    return (
        <div>
            {
                props.tags.map((item, index) => (
                    <CBadge className="mr-1" color="info" key={index}>{item}</CBadge>
                ))
            }
        </div>
    );
}

export default PostsList
