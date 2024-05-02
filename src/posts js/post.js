// This file represents the structure of a single post and how it should be rendered. It's also focused on a single responsibility, which is handling the rendering logic of a post. Define the structure and rendering logic for individual posts. This includes how posts are displayed, interaction elements, and any animations or dynamic behavior...

class Post {
    constructor(postData,user) {
        // console.log("postData FOUND😃",postData)
        // console.log("USER FOUND😃",user.university)
        this.data = postData;
        this.user = user;
    }

    render() {
        if (!this.data || !this.user) {
            console.error('Error: Invalid user and post.')
            return null;
        }
        // Get the template for a post
        const postTemplate = document.getElementById('post-template').content.cloneNode(true);

        // get the root element within the cloned content...
        // const postRoot = postTemplate.getElementById('post-id')
        // console.log("🫚", postRoot)
        // postRoot.dataset.postId = this.data.id;  // Set the dataset on the root element
      
        
        // Populate the cloned template with post data
        postTemplate.getElementById('post-id').dataset.postId = this.data.id;
        postTemplate.querySelector('#post-title').textContent = this.data.title;
        postTemplate.querySelector('#post-body').textContent = this.data.body;
        postTemplate.querySelector('#post-tag').textContent = this.data.tags.join(', ');

        postTemplate.querySelector('#post-userImg').src = this.user.image;
        postTemplate.querySelector('#post-user').textContent = `${this.user.firstName} ${this.user.lastName}`;
        postTemplate.querySelector('#user-addition').textContent = this.user.university;

        return postTemplate;
    }

    renderSinglePost() {
        const singlePostTemp = document.getElementById('single-post');

        // populate or add post data into the single post template...
        singlePostTemp.querySelector('#single-post-title').textContent = this.data.title;
        singlePostTemp.querySelector('#single-post-body').textContent = this.data.body;
        // singlePostTemp.querySelectorAll('.post-tag').textContent = this.data.tags;
    }

    // postUserInfo() {
    //     const postCard = document.getElementById('user-info');
    //     postCard.querySelector('post-userImg').src = this.user.image;
    //     postCard.querySelector('post-user').textContent = this.user.firtName;
    //     return postCard;
    //     // const postUserImg = document.getElementById('post-userImg');
    //     // const postUserName = document.getElementById('post-user');
    // }
}

export default Post;
