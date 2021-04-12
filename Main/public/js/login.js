const loginFormHandler = async (event) => {
  console.log("We are in the event handler")
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-login')
    const password = document.querySelector('#password-login')
  console.log(username)
  console.log(password)
   
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username: username.value, password: password.value }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }

  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  
  