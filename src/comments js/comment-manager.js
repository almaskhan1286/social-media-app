import {Comment} from './comment.js';
import { renderCommentsOnPage } from './comment.js';

 class CommentManager {
    
        constructor() {
            this.comments = localStorage.getItem('commentData') ? JSON.parse(localStorage.getItem('commentData')) : [];
            this.form = document.getElementById('post-comment');
            this.postRender = document.getElementById('post-render');
        }

        postComment(commentData) {
            if (commentData) {
                const id = this.comments.length + 1; 
                const timestamp = new Date().toString();
                const comment = new Comment(id, "Author", timestamp, commentData);
                console.log("COMMENT IN CLASS", comment);
                this.comments.push(comment);
                this.saveComments();
                alert("Comment is successfully posted.✔️")
                this.resetInput();
            } else {
                alert("Comment is not posted.❌")
            }
        }       

        editComment(commentId, newContent) {
            const commentIdNumber = parseInt(commentId, 10);
            const commentToUpdate = this.comments.find(comment => comment.id === commentIdNumber);

            if (commentToUpdate) {              
                commentToUpdate.content = newContent;   // Update the content of the comment           
                this.saveComments();
                renderCommentsOnPage(this.comments);
                alert("Comment updated successfully.✔️");

            } else {
                alert("Comment not found.❌");
            }
        }

        deleteComment(commentId) {
            const commentIdNumber = parseInt(commentId, 10);
            const index = this.comments.findIndex(comment => comment.id === commentIdNumber);      
        
            if (index !== -1) {             
                this.comments.splice(index, 1);         // Remove the comment from the array
                this.saveComments();                     
                renderCommentsOnPage(this.comments);    // Render the comments on the page to reflect the changes
                alert("Comment deleted successfully.✔️");
            } else {
                alert("Comment not found.❌");
            }
        }        

        saveComments(commentData) {      
                localStorage.setItem("commentData", JSON.stringify(this.comments));
        }

        resetInput() {
            this.form.value = '';
        }

        renderComment() {
            let storedComments = JSON.parse(localStorage.getItem('commentData')) || [];
            // console.log("STORED COMMENTS: ", storedComments)
            if (storedComments !== null && Array.isArray(storedComments)) {
                this.comments = storedComments.map(data => new Comment(data.id, data.author, data.timestamp, data.content));
                // console.log("DATA: ",this.comments)
                return this.comments;
            } else {
                alert("No Product data found in local storage.❌")
                return [];
            }
        }

        showSinglePost() {

        }
        
    }



export default CommentManager;