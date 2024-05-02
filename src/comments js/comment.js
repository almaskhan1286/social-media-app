import CommentManager from './comment-manager.js';
import API from '../api.js';

class Comment {                      
    constructor(id, author, timestamp, content) {
        this.id = id,
        this.author = author,
        this.timestamp = timestamp,
        this.content = content
    }
}

// variables...

const singlePost = document.getElementById('single-post');
const postTem = document.getElementById('post-template');
const postStories = document.getElementById('post-stories');
const searchBar = document.getElementById('post-search')
const postContainer = document.getElementById('post-container');

const postButton = document.getElementById('postButton');
const commentInput = document.getElementById('post-comment');
const postRender = document.getElementById('post-render');
const navigate = document.getElementById('navigate')



const hideList = [postTem, postStories, searchBar];
const showList = [postStories, postTem, searchBar]

// // Function to hide elements...
function hideElements() {
    hideList.forEach(function (element) {
        element.style.display = 'none';
    })
}

// Function Elements to show....
function elementsToShow() {
    showList.forEach(function (element) {
        element.style.display = 'flex';
    })
}

// Function to show single post when click on the comment button or any post it show the single post and hide the search bar and stories...

function showCommentsOfPost(commentManager) {
    postContainer.addEventListener('click', function (e) {

        if(e.target.classList.contains('comment-btn')) {
            hideElements();
            singlePost.style.display = 'flex';

            // Event Listener to navigate back
            singlePost.addEventListener('click', function (e) {

                if (e.target.contains(navigate)) {
                    singlePost.style.display = 'none';
                    elementsToShow();
                }
            })
        }
        
    })
}


// Function to add comment...

function handleCommentPost (commentManager) {
    postButton.addEventListener('click', function (e) {
        e.preventDefault();
        let commentData = commentInput.value;
        commentManager.postComment(commentData)
        alert("post add 😀")
        commentManager.resetInput();
    })
}

// Function to render comments...

function handleCommentsRendering(commentManager) {
    const storedComments = commentManager.renderComment();
    renderCommentsOnPage(storedComments);
    
}

// Function to render comments on page...

function renderCommentsOnPage(comments) {
    postRender.innerHTML = '';      // Clear previous comments

    if (Array.isArray(comments)) {
        comments.forEach(comment => {
            const commentMarkup = `
                <div class="p-5 comment-container">
                    <div class= "flex justify-between items-center">
                        <h3 class= "text-lg font-semibold">${comment.author} <span id="comment-timestamp-${comment.id}" class="text-gray-600 font-semibold text-sm">${updateTimeDifference(comment.timestamp)}</span></h3>
                            <div class="cursor-pointer mr-6">
                            <i class="material-icons mr-2 edit-btn" style="font-size: 1rem;" data-comment-id="${comment.id}">edit</i>
                            <i class="material-icons mr-2 delete-btn"  style="font-size: 1rem;" data-comment-id="${comment.id}">delete</i>
                            </div>
                            </div>
                            <p class="my-3 pl-5">${comment.content}</p>
                            <div class="cursor-pointer pl-5">
                            <i class="material-icons mr-2" style="font-size: 1rem;">thumb_up</i>   
                            <i class="material-icons mr-3" style="font-size: 1rem;">thumb_down</i>   
                            <i class="material-icons mr-2" style="font-size: 1rem;">reply</i>
                        <i class="material-icons mr-3" style="font-size: 1rem;">share</i>   
                    </div>


                </div>
            `;
            postRender.insertAdjacentHTML('beforeend', commentMarkup)

            // Dynamically update timestamp every minute
            const timeStampElement = document.getElementById(`comment-timestamp-${comment.id}`);
            setInterval(() => {
                const formattedTimeStamp = updateTimeDifference(comment.timestamp);
                timeStampElement.textContent = formattedTimeStamp;
            }, 60000);
        });
    } else {
        alert("Comments are not rendered properly.❌");
    }
}

// Function to Handle Edit Comments...

function handleEditComment(commentManager) {
    // Event listener for getting edit comment Id...
    postRender.addEventListener('click', (e) => {

        const editBtn = e.target.closest(".edit-btn");
        const deleteBtn = e.target.closest(".delete-btn");
        console.log("DELETE BTN", deleteBtn)

        if (editBtn) {
            const commentId = editBtn.dataset.commentId;
            console.log("edit comment Id : ", commentId)
            const commentElement = editBtn.closest(".comment-container");
            const commentContentElement = commentElement.querySelector("p");
            const commentContent = commentContentElement.textContent;   // Store original comment content

            // Replace comment content with input field...
            const inputField = document.createElement("input");
            inputField.setAttribute("type", "text");
            inputField.setAttribute("value", commentContent);
            inputField.classList.add("border", "border-gray-300", "rounded-md", "p-2", "w-full", "outline-gray-500");
            commentContentElement.replaceWith(inputField);

            // Replace edit button with done button
            editBtn.style.display = "none"; // Hide edit button
            const deleteBtn = commentElement.querySelector(".delete-btn");
            deleteBtn.style.display = "none"; // Hide delete button
            const editButtonsContainer = commentElement.querySelector(".cursor-pointer.mr-6");
            editButtonsContainer.innerHTML += `
                <i class="material-icons mr-2 done-btn" style="font-size: 1rem;">done</i>
                <i class="material-icons mr-2 close-btn" style="font-size: 1rem;">close</i>
            `;

            // Event listener for saving changes
            const doneBtn = commentElement.querySelector(".done-btn");
            const closeBtn = commentElement.querySelector(".close-btn");

            doneBtn.addEventListener("click", function () {
                const newContent = inputField.value;
                commentManager.editComment(commentId, newContent);
            });

            closeBtn.addEventListener("click", function () {

                // Restore edit and delete buttons if changes are canceled
                editBtn.style.display = "inline";
                deleteBtn.style.display = "inline";

                // Restore comment content
                inputField.replaceWith(commentContentElement);

                // Remove done and close buttons
                doneBtn.remove();
                closeBtn.remove();

                // Show edit and delete buttons
                editBtn.style.display = "inline";
                deleteBtn.style.display = "inline";
            });
        }

        // Delete Comment...

        if (deleteBtn) {
            const commentId = deleteBtn.dataset.commentId;
            console.log("delete-comment-Id", commentId)
            commentManager.deleteComment(commentId);        // Call deleteComment method
        }
    });
}

// Function to calculate time difference and timestamp format...

function updateTimeDifference(commentTimeStamp) {
    const currentTime = new Date();
    const commentTime = new Date(commentTimeStamp);
    const timeDiff = Math.floor((currentTime - commentTime)/1000);

    if (timeDiff < 60) {
        return "Just now";
    } else if (timeDiff < 3600) {
        const minutesAgo = Math.floor(timeDiff / 60);
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 86400) {
        const hoursAgo = Math.floor(timeDiff / 3600);
        return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''}`;
    } else {
        const daysAgo = Math.floor(timeDiff / 86400);
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''}`;
    }
}

// Fetch posts from the API and render them in the post container...

API.fetchComments()
    .then(data => {
        const comments = data.comments;

        // console.log("Comment data",comments)

        if (comments && comments.length > 0) {
            comments.forEach(comment => {
                // console.log('COMMENT DATA===>',comment)
            })
        } else {
            console.log("No comments found.🙅‍♂️");
        }    
    })
    .catch(err => console.error(err));

// EventListeners...

document.addEventListener('DOMContentLoaded', function () {
    
    const commentManager = new CommentManager();
    handleCommentPost(commentManager);
    handleCommentsRendering(commentManager);
    handleEditComment(commentManager);
    showCommentsOfPost(commentManager);
    hideElements();
    elementsToShow();
    // elementsToHide();
})


export { Comment, renderCommentsOnPage }