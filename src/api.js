// data retrieval...Responsible for all interactions with your backend API. This includes fetching posts, posting new content, updating posts, etc. Keep this file focused on communication with the server.

class API {
    // Method for making API requests with common error handling and logging
    static async request(url, methodName) {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Failed to fetch ${methodName}`);
            }

            const data = await res.json();
            console.log(`API ${methodName.toUpperCase()} DATA:`, data);
            return data;
        } catch (error) {
            console.error(`Error fetching ${methodName}:`, error.message);
            throw error;
        }
    }

    // Method to generate fetch method for a specific API endpoint
    static async generateFetchMethod(apiUrl, methodName) {
        return this.request(apiUrl, methodName);
    }

    // Generate fetch methods for different APIs

    // These APIs are dedicated for the dummyjson.com for fetching posts, comments and users etc....
    static async fetchPosts() {
        return this.generateFetchMethod('https://dummyjson.com/posts', 'fetchPosts');
    }

    static async fetchSinglePost(postId) {
        return this.generateFetchMethod(`https://dummyjson.com/posts/${postId}`, 'fetchPosts');
    }

    static async fetchComments() {
        return this.generateFetchMethod('https://dummyjson.com/comments', 'fetchComments');
    }

    static async fetchUsers() {
        return this.generateFetchMethod('https://dummyjson.com/users?limit=5', 'fetchUsers');
    }

    static async fetchUserPosts(userId) {
        return this.request(`https://dummyjson.com/posts/user/${userId}`, 'fetchUserPosts'); // fetch post by user id
    }

    static async fetchPostComments(postId) {
        return this.request(`https://dummyjson.com/posts/${postId}/comments`, 'fetchPostComments');
    }
}

export default API;
