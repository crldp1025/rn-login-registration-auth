import axios from 'axios'

export const cookieToString = async (cookie: object) => {
  return JSON.stringify(cookie).split(';')[0].replace('["', '').split('=')[1];
}

export default axios.create({
  baseURL: process.env.API_BASE_URL
});