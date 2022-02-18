import axios from "axios";

const instance = axios.create({
    baseURL : 'http://localhost:5001/challenge-681e2/us-central1/api'
    //in baseURL we put the api(cloud function) url
});

export default instance;
