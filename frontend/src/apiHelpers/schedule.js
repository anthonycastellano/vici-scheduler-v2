import axios from 'axios';

const apiHost = window.env.API_HOST;
const apiPort = window.env.API_PORT;

const getSchedules = () => {
    return axios.get(`/api/schedules`);
};

export { getSchedules };