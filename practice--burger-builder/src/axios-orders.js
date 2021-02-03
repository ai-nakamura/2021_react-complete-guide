import axios from 'axios';

// send things to [baseURL]/[node name].json
const instance = axios.create({
  baseURL: 'https://react-my-burger-8295f-default-rtdb.firebaseio.com/'
});

export default instance;