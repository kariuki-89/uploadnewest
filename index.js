
async function onPageLoad() {
  // Get the current URL
  const currentUrl = window.location.href;

  // Get the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const paramsObject = Object.fromEntries(queryParams.entries());

  // Get the page name
  const pageName = window.location.pathname.split('/').pop();

  // Logging the results
  console.log("URL:", currentUrl);
  console.log("Query Parameters:", paramsObject);
  console.log("Page Name:", pageName);
  return{
    "url":currentUrl,
    "parameters":paramsObject,
    "pageName":pageName
  };
  // Example: Use the parameters or page name in your logic
  //document.querySelector('h1').textContent += ` - ${pageName}`;
}

// Attach the function to the window load event
window.onload = onPageLoad;

//redirect user to homepage
function homepageRedirect(url){
  window.location.href = url;
}

// Sample data for the table
// Sample data for the table with an added 'details' object
const tableData = [
  {
      checked: true,
      title: "Sales Agent",
      statusText: "Recently Used",
      statusClass: "status-active",
      status: "Active",
      date: "10/27/24",
      details: { department: "Sales", region: "North America" },
  },
  {
      checked: true,
      title: "Amazon Agent",
      statusText: "Recently Used",
      statusClass: "status-active",
      status: "Active",
      date: "10/19/24",
      details: { department: "Customer Service", region: "Europe" },
  },
  {
      checked: false,
      title: "X.1234com Agent",
      statusText: "Recently Created",
      statusClass: "status-offline",
      status: "Offline",
      date: "9/4/16",
      details: { department: "Development", region: "Global" },
  },
  {
      checked: false,
      title: "TestGPT",
      statusText: "Recently Used",
      statusClass: "status-wait",
      status: "Wait",
      date: "8/4/16",
      details: { department: "AI", region: "Global" },
  },
  {
      checked: false,
      title: "PicEdit Agent",
      statusText: "Recently Used",
      statusClass: "status-active",
      status: "Active",
      date: "7/27/13",
      details: { department: "Image Processing", region: "Asia" },
  },
];

let page_url=""
let urlParameters={}
let current_page=""

function gettheBaseURL(fullURL) {
  const url = new URL(fullURL);
  console.log(`${url.protocol}//${url.hostname}`) // Create a URL object
  return `${url.protocol}//${url.hostname}`; // Combine protocol and hostname
}
// Function to create and append rows to the table
async function populateTable(data) {

  const pageloaded=await onPageLoad();
  page_url=(pageloaded.url)
  urlParameters=(pageloaded.parameters)
  current_page=(pageloaded.pageName)
  // Get the table's tbody element
  let Selector
  if(current_page=="dashboard"){
    Selector="navigateDiv"
  }

  if(current_page=="agents"){
    Selector="agent_page"
  }
  if(current_page=="analytics"){
    Selector="analytic_page"
  }
  if(current_page=="settings"){
    Selector="settings_page"
  }
 console.log(Selector)
  if(Selector!=null&&Selector!=undefined){
  changeBackgroundColor(Selector,"#161616")
  }

  let theUser=localStorage.getItem("siteUserName")
  let theKey=localStorage.getItem("theToken")
  let theUniqueId=localStorage.getItem("uniqueId")
  console.log("dashboard",theUser,theKey,theUniqueId)
  let TheNameDisplay=document.querySelector("#thesiteusername")
  if(TheNameDisplay){
  setInputValueById("thesiteusername",theUser)
  }
  let baseUrl=await gettheBaseURL(page_url)
  let thepagesLoggedIn=current_page=="dashboard"||current_page=="agents"||current_page=="analytics"||current_page=="settings"
  keyNull=theKey==null||theKey==undefined
  if(keyNull&&thepagesLoggedIn){
    homepageRedirect(`${baseUrl}/login`)
  }
 
  if(current_page=="dashboard"){
  const tableBody = document.querySelector("#tbodyagents");
  //let theUser=localStorage.getItem("siteUserName")
  //let theKey=localStorage.getItem("theToken")
  //let theUniqueId=localStorage.getItem("uniqueId")
  console.log("dashboard",theUser,theKey,theUniqueId)
  setInputValueById("thesiteusername",theUser)
  // Clear existing rows (if any)
  tableBody.innerHTML = "";

  // Iterate over the data array and create rows
  data.forEach((item) => {
      // Create a new table row
      const row = document.createElement("tr");

      // Checkbox cell
      const checkboxCell = document.createElement("td");
      checkboxCell.classList.add("checkbox-cell");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.checked;
      checkboxCell.appendChild(checkbox);
      row.appendChild(checkboxCell);

      // Task name cell
      const taskNameCell = document.createElement("td");
      taskNameCell.classList.add("task-name-cell");
      const taskNameDiv = document.createElement("div");
      taskNameDiv.classList.add("task-name");
      const taskTitle = document.createElement("span");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = item.title;
      const statusText = document.createElement("span");
      statusText.classList.add("status-text");
      statusText.textContent = item.statusText;
      taskNameDiv.appendChild(taskTitle);
      taskNameDiv.appendChild(statusText);
      taskNameCell.appendChild(taskNameDiv);

      // Store object data in the dataset
      taskNameCell.dataset.details = JSON.stringify(item.details);
       
      // Add a click event to display the object data
      checkboxCell.addEventListener("click", () => {
        event.stopPropagation(); // Prevent row click
        const details = JSON.parse(taskNameCell.dataset.details);
        console.log("Details:", "details");
    });

      // Add a click event to display the object data
      row.addEventListener("click", () => {
          const details = JSON.parse(taskNameCell.dataset.details);
          console.log("Details:", details);
      });

 
      row.appendChild(taskNameCell);

      // Status cell
      const statusCell = document.createElement("td");
      statusCell.classList.add("status-cell");
      const statusBox = document.createElement("div");
      statusBox.classList.add("status-box", item.statusClass);
      const statusIcon = document.createElement("span");
      statusIcon.classList.add("status-icon");
      statusBox.appendChild(statusIcon);
      statusBox.append(" " + item.status);
      statusCell.appendChild(statusBox);
      row.appendChild(statusCell);

      // Date cell
      const dateCell = document.createElement("td");
      dateCell.classList.add("date-cell");
      dateCell.textContent = item.date;
      row.appendChild(dateCell);

      // Delete cell
      const deleteCell = document.createElement("td");
      deleteCell.classList.add("delete-cell");
      const deleteIcon = document.createElement("span");
      deleteIcon.classList.add("delete-icon");
      deleteIcon.innerHTML = "&#128465;"; // Trash can emoji
      deleteIcon.addEventListener("click", () => {
          row.remove(); // Delete the row on click
      });
      deleteCell.appendChild(deleteIcon);
      row.appendChild(deleteCell);

      // Append the row to the table body
      tableBody.appendChild(row);
  });
}
}
// Run the function when the page loads
window.onload = () => populateTable(tableData);


function logOutUser(){
  localStorage.clear();
  console.log("user logged out")
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


//Navigate to aother page on click
function navigateOnClick(selector, targetUrl) {
  // Select the element using the provided selector
  const element = document.querySelector(`#${selector}`);

  // Check if the element exists
  if (element) {
   
    window.location.href = targetUrl; // Navigate to the target URL
     
}}


//set background-color
function changeBackgroundColor(selector, color) {
  // Select the element using the provided selector
  const element = document.querySelector(`#${selector}`);

  // Check if the element exists
  if (element) {
      element.style.backgroundColor = color; // Change the background color
  } else {
      console.error(`No element found with selector: ${selector}`);
  }
}

//change textValue
function setInputValueById(id, value) {
  const element = document.getElementById(id);
  console.log("karis",value,element.innerHTML)
  
    element.innerHTML = value;
 
}

function checkCookie() {
  let user = getCookie("theagentnaviagatemove");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("theagentnaviagatemove", user, 365);
    }
  }
}

// Function to show an element
function showElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "flex"; // Makes the element visible
  }
}

// Function to hide an element
function hideElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "none"; // Hides the element
  }
}

//the click events
document.addEventListener("DOMContentLoaded", () => {
    // Select the login button
    const signUpButton = document.querySelector("#signup-button");
    const logInButton = document.querySelector("#login-button");
    const ResetButton = document.querySelector("#Reset-button");
    const idMain=getCookie("agentmultiagentwebide")
    const idTokenMain=getCookie("agentmultiagentwebtky")
    console.log(idMain,idTokenMain);
    const buttonDiv=document.querySelector(".div-block-4");
    const logOutButton=document.querySelector(".logoutbutton");

    if (logOutButton){
      document.querySelector(".logoutbutton").addEventListener("click", (event) =>{
        logOutUser()
        homepageRedirect("/")
      })}
    console.log("logout")
    if (buttonDiv){
    document.querySelectorAll(".div-block-4").forEach(div => {
      div.addEventListener("click", (event) => {
          console.log(`Button ID: ${event.target.id}`); // Log the ID of the clicked button
          let url="https://multiagentbase-pro-93abd0.webflow.io/"
          let page=""
          let clicked=""
          if(event.target.id=="navigateDiv"){
           page="dashboard"
           clicked=event.target.id
          }
          if(event.target.id=="agent_page"){
            page="agents"
            clicked=event.target.id
           }
           if(event.target.id=="analytic_page"){
            page="analytics"
            clicked=event.target.id
           }
           if(event.target.id=="settings_page"){
            page="settings"
            clicked=event.target.id
           }
           navigateOnClick(clicked,`${url}${page}`)
      });
  });
}
    //console.log(signUpButton.id,logInButton.id,ResetButton.id)

    // Add click event listener to the login button
    if(signUpButton!=null&&signUpButton!=undefined){
    signUpButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the form from submitting

        // Get the values of email and password fields
        const fullName = document.querySelector("input[id='Full-Name-Signup']").value;
        const email = document.querySelector("input[id='Email-Signup']").value;
        const password = document.querySelector("input[id='Password-Signup']").value;
        const ConfirmPassword = document.querySelector("input[id='Confirm-Password-Signup']").value;
        console.log(ConfirmPassword)

        // Log the values to the console (you can replace this with your login logic)
        console.log("Email:", email);
        console.log("Password:", password);

        // Simulate login action
        let allFields=email && password&&fullName&&ConfirmPassword
        let confirmPasswordval=password==ConfirmPassword
        if (!allFields&&confirmPasswordval) {
          
          //action(email,password);
          showElementById("warningDialog")
          setInputValueById("error-message","All the fields should not be empty")
          
        } 
        
        if (!allFields&&!confirmPasswordval) {
          
          //action(email,password);
          showElementById("warningDialog")
          setInputValueById("error-message","All the fields should not be empty")
          
        } 

        if (allFields&&!confirmPasswordval) {
          showElementById("warningDialog")
          setInputValueById("error-message","Confirm password is not the same as the password") 
        } 

        if (allFields&&confirmPasswordval) {
          
          //action(email,password);
          action(email,password,fullName);
          showElementById("loader")
          
        } 
    })};

  if(logInButton!=null&&logInButton!=undefined){
    // Add click event listener to the login button
  logInButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting

  // Get the values of email and password fields
  const email = document.querySelector("input[id='Email-Signup']").value;
  const password = document.querySelector("input[id='Password-Signup']").value;

  // Log the values to the console (you can replace this with your login logic)
  console.log("Email:", email);
  console.log("Password:", password);

  // Simulate login action
  if (email && password) {
    console.log("testPage")
    //action(email,password);
    signInUser(email,password);
    showElementById("loader")
    
  } else {
    showElementById("warningDialog")
    setInputValueById("error-message","Please fill all the fields")
  }
})};

if(ResetButton!=null&&ResetButton!=undefined){
  // Add click event listener to the login button
  ResetButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form from submitting

// Get the values of email and password fields
const email = document.querySelector("input[id='Email-Reset']").value;

// Log the values to the console (you can replace this with your login logic)
console.log("Email:", email);

// Simulate login action
if (email) {
  console.log("testPage")
  //action(email,password);
  ResetPassword(email);
  
} else {
    alert("Please fill in both fields.");
}
})};
});





 // Convert makeRequest to async function
async function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`HTTP Error: ${xhr.statusText}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send(JSON.stringify(data));
  });
}

// Usage with async/await
async function useMakeRequest(email,password,name) {
  try {
    const response = await makeRequest("http://127.0.0.1:8000/signup", "POST", {
      "email": email,
      "password": password,
      "name": name,
      "accessToken": "emptyYes",
      "isOnline": true,
      "dateOfBirth": "12-12-12"
    });
    //console.log(response); // Process the response as needed
    return response; // Return the response if needed for further handling
  } catch (error) {
    //console.error("Error:", error); // Handle the error
    throw error; // Rethrow the error if you want to propagate it
  }
}


//call signup action
async function action(email,password,fullname){
  
  result=await useMakeRequest(email, password,fullname)
  jsonResult=JSON.parse(result);
  console.log(jsonResult);
  if (jsonResult.status==="200 ok"){
    console.log("200 Ok")
      hideElementById("loader")
      uniqueId=jsonResult.data.fields.uuid.stringValue
      siteUserName=jsonResult.data.fields.name.stringValue
      theToken=jsonResult.data.fields.refreshToken.stringValue
      console.log(uniqueId,siteUserName,theToken)
      localStorage.setItem("siteUserName", siteUserName);
      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("theToken", theToken);
      setCookie("agentmultiagentwebtky",theToken,3)
      setCookie("agentmultiagentwebide",uniqueId,3)
      window.location.href = "https://multiagentbase-pro-93abd0.webflow.io/dashboard";
}
else{
  error=jsonResult.data.message;
  console.log(error);
  console.log(jsonResult);
  hideElementById("loader")
  showElementById("warningDialog")
  setInputValueById("error-message",error)
}
}

  // Wrap XMLHttpRequest in a Promise to use with async/await
  function sendRequest(data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:8000/signupanonymous", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.withCredentials = false;
  
      // When request is complete
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText); // resolve on success
          } else {
            reject(`Error: ${xhr.status} - ${xhr.statusText}`); // reject on error
          }
        }
      };
  
      // Send the data
      xhr.send(data);
    });
  }


async function CreateUserAnonymous(email){
  const data = JSON.stringify({
    "email": "anonymous34@gmail.com",
    "password": "12345",
    "name": "anonymous",
    "accessToken": "emptyYes",
    "isOnline": true,
    "dateOfBirth": "12-12-12"
  });
  try {
    myDATA = await sendRequest(data);
    DataJson=JSON.parse(myDATA);
    console.log(DataJson.fields);
    setCookie("agentmultiagentwebtky",DataJson.fields.refreshToken.stringValue,3)
    setCookie("agentmultiagentwebide",DataJson.fields.uuid.stringValue,3) // Await the response from sendRequest
    return(myDATA); // Output the response
  } catch (error) {
    return("Request failed:", error); // Handle errors
  }
}

// Prepare the data for the request

// Function to send the request
function sendRequest(data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/signin", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = false;

    // Handle state changes
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText); // Resolve on success
        } else {
          reject(`Error: ${xhr.status} - ${xhr.statusText}`); // Reject on error
        }
      }
    };

    // Send the request with the data
    xhr.send(data);
  });
}

// Function to use async/await
async function signInUser(email,password) {
  const data = JSON.stringify({
    "email": email,
    "password": password
  });
  try {
    const response = await sendRequest(data);// Await the promise from sendRequest
    let JsonResponse=JSON.parse(response)
    let status=JsonResponse.status
    console.log(status)
    if(status=="200 ok")
    {
      let accessToken=JsonResponse.data.idToken
      singleUser("users","email",email,accessToken)
      hideElementById("loader")
    }
    else{
      let errorMessage=JsonResponse.data.message
      console.log(errorMessage);
      console.log(JsonResponse);
      hideElementById("loader")
  
      showElementById("warningDialog")
      setInputValueById("error-message",errorMessage)
    }
    //setCookie("agentmultiagentwebide",JsonResponse.fields.uuid.stringValue,3)
    console.log(JsonResponse); // Log the response on success
  } catch (error) {
    console.error("Request failed:", error); // Log errors
  }
}


async function getUser(table,query,value,token) {
  var data = JSON.stringify({
    "tablename": table,
    "queryfield": query,
    "queryvalue": value,
    "refreshToken": token
  });

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.responseText);
        } else {
          reject(new Error(`Request failed with status ${this.status}: ${this.statusText}`));
        }
      }
    });

    xhr.open("POST", "http://127.0.0.1:8000/getsingleuserdata");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  });
}

async function singleUser(table,query,value,token){
  try {
    const response = await getUser(table,query,value,token);
    let JsonResponse=JSON.parse(response)
    console.log("test",JsonResponse);
    let theToken=JsonResponse.data[0].document.fields.refreshToken.stringValue
    let uniqueId=JsonResponse.data[0].document.fields.uuid.stringValue
    siteUserName=JsonResponse.data[0].document.fields.name.stringValue
    siteUniqueId=JsonResponse.data[0].document.fields.uuid.stringValue
    theSiteKey=JsonResponse.data[0].document.fields.refreshToken.stringValue
    localStorage.setItem("siteUserName", siteUserName);
    localStorage.setItem("uniqueId", uniqueId);
    localStorage.setItem("theToken", theToken);
    
  
    setCookie("agentmultiagentwebtky",theToken,3)
    setCookie("agentmultiagentwebide",uniqueId,3)
    console.log("200 Ok")
    window.location.href = `https://multiagentbase-pro-93abd0.webflow.io/dashboard?user=${siteUserName}&id=${siteUniqueId}&token=${theSiteKey}`;
    
  } catch (error) {
    console.log(error);
  }
}

async function ResetPassword (email) {
  const data = JSON.stringify({
    userEmail: email
  });

  const url = "http://127.0.0.1:8000/resetpassword";

  const xhrRequest = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      };

      xhr.onerror = function () {
        reject(new Error("Network error occurred"));
      };

      xhr.send(data);
    });
  };

  try {
    const response = await xhrRequest();
    console.log(response);
  } catch (error) {
    console.error("Error during the request:", error);
  }
};


console.log("page is loaded")
