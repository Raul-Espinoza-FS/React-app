import React, { useState, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { toast } from 'react-toastify';
import {
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CFormFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilCheck, cilBan } from '@coreui/icons'
import { useNavigate, useParams } from 'react-router-dom';
import PostsAPI from 'src/api/PostsAPI';

const postsAPI = new PostsAPI();

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Posts = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [state, setStateWrapped] = useState({
        tags: [],
        previewImageUrl: '',
        thumbnail_id: 0,
        validated: false,
        post: {
            title: '',
            content: '',
            thumbnail: null,
        },
        mode: params.id ? 'edit' : 'create',
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
            if (state.mode === 'edit') {
                toast.info('Loading post...', { autoClose: 5000, closeOnClick: true });
                const post = await postsAPI.getPost(params.id);
                let tags = post.tags.split(',').map((tag) => ({ id: tag, text: tag }));
                setState({
                    post: post,
                    tags: tags,
                    thumbnail_id: post.thumbnail_id,
                    previewImageUrl: post.thumbnail.url,
                });
            }
        }
        fetchData();
        // eslint-disable-next-line 
    }, []);

    const handleDelete = (i) => {
        setState({
            tags: state.tags.filter((tag, index) => index !== i)
        });
    };

    const handleAddition = (tag) => {
        setState({
            tags: [...state.tags, tag]
        });
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = state.tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        // re-render
        setState({
            tags: newTags
        });
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let post = state.post;
        post[name] = value;
        setState({
            post: post,
        });
    }

    const previewImage = (event) => {
        // Update the value on the form
        const file = event.target.files[0];
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            setState({
                previewImageUrl: reader.result,
                thumbnail_id: 0,
            });
        }
        reader.readAsDataURL(file)
    }

    const uploadPost = async (form) => {
        toast.info((state.mode === 'create') ? 'Saving new post...' : 'Updating post...', { autoClose: 5000, closeOnClick: true });
        let thumbnail_id = state.thumbnail_id;
        // Upload the image only if it was edited
        if (thumbnail_id === 0) {
            let thumbnailData = new FormData();
            thumbnailData.append('thumbnail', form.get('thumbnail'));
            const thumbnailResponse = await postsAPI.saveThumbnail(thumbnailData);
            thumbnail_id = thumbnailResponse.thumbnail_id;
        }

        if (state.mode === 'create') {
            const postResponse = await postsAPI.savePost({
                title: state.post.title,
                content: state.post.content,
                tags: state.tags.map((tag) => (tag.text)).join(','),
                thumbnail_id: thumbnail_id,
            });
            toast.success('Post Created, id: ' + postResponse.post_id, { autoClose: 5000, closeOnClick: true });
            navigate('/posts', { replace: true });
        }
        else if (state.mode === 'edit') {
            const postResponse = await postsAPI.editPost(state.post.id, {
                title: state.post.title,
                content: state.post.content,
                tags: state.tags.map((tag) => (tag.text)).join(','),
                thumbnail_id: thumbnail_id,
            });
            toast.success('Post Updated, id: ' + postResponse.post_id, { autoClose: 5000, closeOnClick: true });
            navigate('/posts', { replace: true });
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        // Check extra fields
        if (form.checkValidity() !== false && state.tags.length !== 0 && state.previewImageUrl !== '') {
            // The form is valid
            uploadPost(new FormData(form));

        }
        setState({ validated: true });
    }

    return (
        <CCard>
            <CCardHeader>{(state.mode === 'create') ? 'Create Post' : 'Edit Post'}</CCardHeader>
            <CCardBody>
                <CForm
                    id="postForm"
                    noValidate
                    validated={state.validated}
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3">
                        <CFormLabel htmlFor="title">Title: </CFormLabel>
                        <CFormInput
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Post Title..."
                            value={state.post.title}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormFeedback invalid>Please provide a title</CFormFeedback>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="content">Content: </CFormLabel>
                        <CFormTextarea
                            id="content"
                            name="content"
                            placeholder="Post content..."
                            rows="10"
                            value={state.post.content}
                            onChange={handleInputChange}
                            required>
                        </CFormTextarea>
                        <CFormFeedback invalid>Please provide a title</CFormFeedback>
                    </div>
                    <div className="mb-3">
                        <ReactTags
                            classNames={{ tagInputField: 'form-control-no-validate' }}
                            tags={state.tags}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            delimiters={delimiters} />
                        <CFormInput invalid={(state.validated && (state.tags.length === 0))} value={state.tags.join()} type="hidden" id="tags" name="tags" />
                        <CFormFeedback invalid>Please add at least one tag</CFormFeedback>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="thumbnail">Thumbnail: </CFormLabel>
                        <CFormInput invalid={(state.validated && (state.previewImageUrl === ''))} onChange={previewImage} type="file" id="thumbnail" name="thumbnail" />
                        <CFormFeedback invalid>Please add a thumbnail</CFormFeedback>
                    </div>
                    {(state.previewImageUrl && state.previewImageUrl !== '') ?
                        (<div className="mb-3">
                            <img alt="preview" className="thumbnail-image" src={state.previewImageUrl} />
                        </div>) : ''}
                </CForm>
            </CCardBody>
            <CCardFooter className="text-right">
                <CButton form="postForm" type="submit" className="mr-1" color="primary" active={true}>
                    <CIcon icon={cilCheck} className="me-2" />
                    Create
                </CButton>
                <CButton form="postForm" type="reset" color="danger" disabled={false}>
                    <CIcon icon={cilBan} className="me-2" />
                    Reset
                </CButton>
            </CCardFooter>
        </CCard>
    )
}

export default Posts
