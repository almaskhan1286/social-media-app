// This file is dedicated for creating "pure function based logics" that can we used to handling robust type of functionality related with user...furthermore it is connected with user.js file for where we define class based data structure for the user, ultimately both of these files enhance the overall experience relalted to the user functionality in the app....

import API from "../api.js";
import User from "./user.js";

// variables...
const userProfile = document.getElementById('user-profile');
const singlePost = document.getElementById('single-post');
console.log("user-manager: single post",singlePost)
const postTem = document.getElementById('post-template');
const postStories = document.getElementById('post-stories');
const postSearch = document.getElementById('post-search');

const userName = document.getElementById('user-name');
const cardWrapper = document.getElementById('card-wrapper');
const suggestWrapper = document.getElementById('suggest-wrapper');
const userProfileBtns = document.querySelectorAll('.profile-btn')

const elementsToHide = [singlePost,postTem, postStories, postSearch];

// function to hide Elements..

function hideElements() {
    elementsToHide.forEach(function(element) {
        element.style.display = 'none';
    })
}

// Fucntion to show user-profile when when we click on userProfile's image, name, or username etc it hide the stories, search-bar, single-post-template and post-template

function handleUserProfile() {
    userProfileBtns.forEach(function(btn){
        btn.addEventListener('click', function (e) {
            hideElements();
            userProfile.style.display = 'flex';
        })
    })
}

// Function to fetch users from the API
function fetchAndHandleUsers() {
    API.fetchUsers()
        .then(data => {
            const users = data.users;
            if (users && users.length > 0) {
                users.forEach(userData => {
                    const user = new User(userData);
                    handleUserDisplay(user);
                    showNewMembers(user)
                    showSuggestedMembers(user);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching and handling users:', error);
        });
}

// Function to display users...

function handleUserDisplay(user) {
    if (!user) {
        console.error('User data is undefined');
    }
    // set user information to HTML elements..
    userName.textContent = user.username;
}

// Function to display new members...

function showNewMembers(user) {
    const cardContent = user.displayNewMembers();
    cardWrapper.appendChild(cardContent);
    return cardWrapper;
}

// Function to display suggested members...

function showSuggestedMembers(user) {
    const cardContent = user.displaySuggestedMem();
    suggestWrapper.appendChild(cardContent);
    return suggestWrapper;  
}




document.addEventListener('DOMContentLoaded', function () {
    fetchAndHandleUsers();
    handleUserProfile();
})