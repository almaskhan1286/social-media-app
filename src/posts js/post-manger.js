//This file could coordinate between the API and the rendering logic. It would fetch posts from API.js and then use Post.js to render them. It might also handle user interactions like liking posts, commenting, or sharing.

import API from "../api.js";
import Post from "./post.js";

// Variables...

const postTitles = document.querySelectorAll('#post-title');

// Get the sidebar and the toggle button
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");

const postContainer = document.getElementById('post-template');
const singlePost = document.getElementById('single-post');
const postTem = document.getElementById('post-template');
const postStories = document.getElementById('post-stories');
const postSearch = document.getElementById('post-search');

const elementsToHide = [postTem, postStories, postSearch];

// Function to hide elements...
function hideElements() {
    elementsToHide.forEach(function(element) {
        element.style.display = 'none';
    })
}


// Function to hide||show side-bar...
function showHideSibar() {
    sidebarToggle.addEventListener('click', function (e) {
        sidebar.classList.toggle('hidden');

        sidebarToggle.classList.toggle("fa-bars");
        sidebarToggle.classList.toggle("fa-xmark");
        
    })
}


// Function to fetch posts from API and render post with user information(fetch user also)...

function fetchPostsAndRender() {
    Promise.all([API.fetchPosts(), API.fetchUsers()])
        .then(([postData, userData]) => {
            const posts = postData.posts;
            const users = userData.users;
            // console.log("postData",posts)
            // console.log("userData",users)

            if (posts && Array.isArray(posts) && users && Array.isArray(users)) {
                // Get user data for the current post
                posts.forEach(post => {
                    // console.log("post::",post)
                    const user = users.find(user => user.id === post.userId);
                    // console.log("USER=====>", user)

                    if (user) {

                         // Limit the post body content
                         const limitedContent = limitPostContent(post.body, 50);
                         const limitedPost = { ...post, body: limitedContent };

                         // Create a new instance of the Post class
                         const postInstance = new Post(limitedPost, user);
 
                         const postElement = postInstance.render();
                        //  showSinglePost();

                        if (postElement) {
                            postContainer.appendChild(postElement);
                        } else {
                            console.log('Error: rendering post.❌')
                        } 
                    } else {
                        console.error('User not found for post.❌')
                    }

                    // Call function to limit the post body content
                    // const limitedContent = limitPostContent(post.body, 50);

                    // Render the post using the shared instance of the Post class
                    // const postElement = postInstance.render(posts,users);
                    // console.log("POST ELEMENTS", postElement)
                    // postContainer.appendChild(postElement);



                })
            } else {
                console.error('Invalid data: posts or users is missing or not an array.')
            }
        })
        .catch (err => console.error(err));
}

// Function to Limit the post content body...

function limitPostContent(content, maxWords) {
    // split content into words..
    const words = content.split(' ');

    // check if already maxWords exist..
    if (words.length <= maxWords) {
        return content;
    }

    // limit content to specified number of words..
    const limitContent = words.splice(0, maxWords).join(' ') + '...';

    return limitContent;
}


// Function to fetch single post data and render...

// function fetchPostsAndRender() {
//     Promise.all([API.fetchSinglePost(postId), API.fetchUsers()])
//         .then(([postData, userData]) => {
//             const posts = postData.posts;
//             const users = userData.users;
//             // console.log("postData",posts)
//             // console.log("userData",users)

//             if (posts && Array.isArray(posts) && users && Array.isArray(users)) {
//                 // Get user data for the current post
//                 posts.forEach(post => {
//                     // console.log("post::",post)
//                     const user = users.find(user => user.id === post.userId);
//                     // console.log("USER=====>", user)

//                     if (user) {

//                          // Limit the post body content
//                          const limitedContent = limitPostContent(post.body, 50);
//                          const limitedPost = { ...post, body: limitedContent };

//                          // Create a new instance of the Post class
//                          const postInstance = new Post(limitedPost, user);
 
//                          const postElement = postInstance.render();
//                         //  showSinglePost();

//                         if (postElement) {
//                             postContainer.appendChild(postElement);
//                         } else {
//                             console.log('Error: rendering post.❌')
//                         } 
//                     } else {
//                         console.error('User not found for post.❌')
//                     }
//                 })
//             } else {
//                 console.error('Invalid data: posts or users is missing or not an array.')
//             }
//         })
//         .catch (err => console.error(err));
// }

function fetchSinglePost(postId) {
    API.fetchSinglePost(postId) 
    .then(postData => {
        return postData;
    })
    .catch(error => 
        console.error('Error fetching post.❌',error))
}

// Function to show the specific post when we click on the post title...

function showSinglePost() {

    postContainer.addEventListener('click', function (e) {



        const postId = e.target.closest('.post').dataset.postId;
        console.log("🤔🤔🤔",postId)


        
        // console.log('event🤯🤯',e)
        // if (e.target.closest('#post-template')) {
        //     const postId = e.target.dataset.postId;
        //     console.log("🚩",postId)
        //     fetchSinglePost(postId)
        //     // .then(postData => {
        //     //     const postInstance = new Post(postData);
            //     postInstance.renderSinglePost(); // Render the single post
            //     singlePost.appendChild(postInstance.render()); // Append the single post template
            // })
            // .catch(error => console.error('Error rendering single post:', error));


    //     }
    })

    // postTem.addEventListener('click', function (e) {
    //     console.log('eeeee',e)

        
    //     if (e.target.classList.contains('post-title')) {
    //         const postId = e.target.textContent.id;
    //         console.log("POST ID: 🚩",postId)
    //         hideElements();
    //         singlePost.style.display = 'flex';
    //         fetchSinglePost(postId);
    //     } else {
    //         console.error('Event not clicked!')
    //     }


    // })
}


document.addEventListener('DOMContentLoaded', function () {
    fetchPostsAndRender();
    showSinglePost();
    fetchSinglePost(2);
    showHideSibar();
})