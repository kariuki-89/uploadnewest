
  var pathy = window.location.pathname;
console.log(pathy);
  changeBackgroundColor(pathy);
  function changeBackgroundColor(path) {
      if(path=="/dashboard"){
      // Get the element by its ID
      var element = document.getElementById('navigateDiv');
      
      // Change the background color
      element.style.backgroundColor = '#6B3FA0'; 
      }
     if(path=="/agent-page"){
      // Get the element by its ID
      var element = document.getElementById('agent_page');
      
      // Change the background color
      element.style.backgroundColor = '#6B3FA0'; 
      }
      if(path=="/task-page"){
      // Get the element by its ID
      var element = document.getElementById('task_page');
      
      // Change the background color
      element.style.backgroundColor = '#6B3FA0'; 
      }
     if(path=="/analytics"){
      // Get the element by its ID
      var element = document.getElementById('analytic_page');
      
      // Change the background color
      element.style.backgroundColor = '#6B3FA0'; 
      }
    if(path=="/profile"){
      // Get the element by its ID
      var element = document.getElementById('settings_page');
      
      // Change the background color
      element.style.backgroundColor = '#6B3FA0'; 
      }
    }
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv = document.getElementById('navigateDiv');
    
    // Add click event listener to the div
    navigateDiv.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/dashboard'; // Replace with the page you want to navigate to
    });
  });
  
   document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv2 = document.getElementById('agent_page');
    
    // Add click event listener to the div
    navigateDiv2.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/agent-page'; // Replace with the page you want to navigate to
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv3 = document.getElementById('task_page');
    
    // Add click event listener to the div
    navigateDiv3.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/task-page'; // Replace with the page you want to navigate to
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv4 = document.getElementById('analytic_page');
    
    // Add click event listener to the div
    navigateDiv4.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/analytics'; // Replace with the page you want to navigate to
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv4 = document.getElementById('settings_page');
    
    // Add click event listener to the div
    navigateDiv4.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/profile'; // Replace with the page you want to navigate to
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv4 = document.getElementById('loginButton');
    
    // Add click event listener to the div
    navigateDiv4.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/dashboard'; // Replace with the page you want to navigate to
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv4 = document.getElementById('loginGoogle');
    
    // Add click event listener to the div
    navigateDiv4.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/dashboard'; // Replace with the page you want to navigate to
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv4 = document.getElementById('loginApple');
    
    // Add click event listener to the div
    navigateDiv4.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/dashboard'; // Replace with the page you want to navigate to
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv4 = document.getElementById('createNewAccountText');
    
    // Add click event listener to the div
    navigateDiv4.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/signup'; // Replace with the page you want to navigate to
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the div element by its id
    var navigateDiv4 = document.getElementById('resetLink');
    
    // Add click event listener to the div
    navigateDiv4.addEventListener('click', function() {
      // Navigate to the desired page URL
      window.location.href = '/reset'; // Replace with the page you want to navigate to
    });
  });

