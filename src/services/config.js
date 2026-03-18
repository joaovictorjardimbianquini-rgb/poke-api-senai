import axios from 'axios';

const URL = 'https://pokeapi.co/api/v2';
const TIMEOUT = 10000;

export const AxiosWithoutToken = () => {
    return axios.create({
        baseURL: URL,
        timeout: TIMEOUT,
        signal: new AbortController().signal,
    });
};

export default AxiosWithoutToken;
