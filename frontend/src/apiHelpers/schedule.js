import axios from 'axios';

const SCHEDULES_ENDPOINT = '/api/schedules';

const getSchedules = () => {
    return axios.get(SCHEDULES_ENDPOINT);
};

const deleteSchedule = (id) => {
    return axios.delete(SCHEDULES_ENDPOINT, { data: { _id: id } });
};

const updateSchedule = (id, leads, backups) => {
    return axios.put(SCHEDULES_ENDPOINT, { _id: id, leads, backups })
};

const createSchedule = (month, year, employees) => {
    return axios.post(SCHEDULES_ENDPOINT, { month, year, employees });
};

export {
    getSchedules,
    deleteSchedule,
    updateSchedule,
    createSchedule
};