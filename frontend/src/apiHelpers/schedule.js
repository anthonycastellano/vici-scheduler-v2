import axios from 'axios';

const SCHEDULES_ENDPOINT = '/api/schedules';

const getSchedules = () => {
    return axios.get(SCHEDULES_ENDPOINT);
};

const deleteSchedule = (id) => {
    return axios.delete(SCHEDULES_ENDPOINT, { data: { _id: id } });
};

const updateSchedule = (id, leads, backups, assists) => {
    return axios.put(SCHEDULES_ENDPOINT, { _id: id, leads, backups, assists })
};

const createSchedule = (month, year, employees, withAssists) => {
    return axios.post(SCHEDULES_ENDPOINT, { month, year, employees, withAssists });
};

export {
    getSchedules,
    deleteSchedule,
    updateSchedule,
    createSchedule
};