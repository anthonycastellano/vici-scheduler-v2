import axios from 'axios';

const getSchedules = () => {
    return axios.get(`/api/schedules`);
};

export { getSchedules };