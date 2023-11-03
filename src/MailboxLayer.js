import axios from 'axios';

const BASE_URL = 'http://apilayer.net/api/check';
const ACCESS_KEY = '18b13fd97feedc415ec0520890795648';

export const verifyEmail = async (email) => {
  const response = await axios.get(BASE_URL, {
    params: {
      access_key: ACCESS_KEY,
      email,
    },
  });
   
  console.log(response.data)
  return response.data;
  
};

// const BASE_URL = 'http://apilayer.net/api/check';
// const ACCESS_KEY = '18b13fd97feedc415ec0520890795648';

// export const verifyEmail = async (email) => {
//   const url = `${BASE_URL}?access_key=${ACCESS_KEY}&email=${email}`;
//   const response = await fetch(url);
//   const data = await response.json();

//   return data;
// };
