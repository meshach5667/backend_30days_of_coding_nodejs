
const axios = require('axios');
async function fetchData() {
  try {
    const response = await axios.get('https://api.agify.io?name=michael');
    console.log(response.data);
  } catch (error) {

    console.error('Error fetching data:', error);
  }
}


fetchData();
