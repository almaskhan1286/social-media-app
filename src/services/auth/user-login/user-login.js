// Function to LogIn the user and store the token into the local storage...

function handleUserLogin(username, password) {
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30, 
    }),
  })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to login.');
        }
        return res.json();
    })
    .then(data => {
        const token = data.token;
        localStorage.setItem('token', token);
        alert('SignIn Successfully.');
        window.location.replace('.............');
    })
    .catch(error => {
        console.error('Error during SignIn: ', error.message)
        alert('Invalid username or password. Please try again.');
    });
}


// Interacting with form...

document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter username and password in both fields.');
        return;
    }

    handleUserLogin(username, password);
})