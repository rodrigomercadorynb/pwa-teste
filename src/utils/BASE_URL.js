const BASE_URL = 'http://192.168.1.150:3000/api';

const { REACT_APP_API_URL } = process.env;

export default REACT_APP_API_URL || BASE_URL;
