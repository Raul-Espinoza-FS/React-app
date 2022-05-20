import APIBase from "./APIBase";

class PostsAPI extends APIBase {

    getPosts(page, many, direction) {
        return this.get('posts', {
            page: page,
            many: many,
            direction: direction,
        })
    }

    getPost(id){
        return this.get('posts/' + id);
    }

    savePost(data ) {
        return this.post('posts', data);
    }

    editPost(post_id, data ) {
        return this.patch('posts/' + post_id, data);
    }
    
    deletePost(post_id) {
        return this.delete('posts/' + post_id);
    }

    saveThumbnail(data) {
        return this.post('thumbnails', data);
    }
   
}

export default PostsAPI
