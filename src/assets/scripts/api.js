import axios from 'axios';

const BASE_URL = 'https://api.openbrewerydb.org/breweries';

const API = {
    fetchAPIData(page = 1, perPage = 20){
        const url = `${BASE_URL}?page=${page}&per_page=${perPage}`;
        return axios.get(url);   
    }
}

export default API;
