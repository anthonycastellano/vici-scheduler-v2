import axios from 'axios';

const getSchedules = () => {
    return axios.get(`/api/schedules`);
};

const deleteSchedule = (id, token) => {
    return axios.delete('/api/schedules', { data: { _id: id, token } });
};

export {
    getSchedules,
    deleteSchedule
};