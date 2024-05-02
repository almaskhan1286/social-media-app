// User Profile...

class User {
    constructor(user) {
        // console.log("User DATA:",user.company?.department)
        this.id = user.id;
        this.username = user.username;
        this.image = user.image;
        this.depart = user.company?.department;
    }

    // method to display user information...
    displayNewMembers() {  
        const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
        
        cardTemplate.querySelector('#user-name').textContent = this.username;
        cardTemplate.querySelector('#user-img').src = this.image;
        cardTemplate.querySelector('#depart').textContent = this.depart;

        return cardTemplate;
    }

    displaySuggestedMem() {  
        const cardTemplate = document.querySelector('#suggest-template').content.cloneNode(true);
        
        cardTemplate.querySelector('#suggest-user').textContent = this.username;
        cardTemplate.querySelector('#suggest-img').src = this.image;
        cardTemplate.querySelector('#sector').textContent = this.depart;

        return cardTemplate;
    }
}

export default User;