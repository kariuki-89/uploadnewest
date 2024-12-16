const axios = require('axios');

let data = JSON.stringify({
  "email": "gacch4ii94343@gmail.com",
  "password": "12345567",
  "name": "john Doe",
  "accessToken": "emptyYes",
  "isOnline": true,
  "dateOfBirth": "12-12-12"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/signup',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

console.log(data)
