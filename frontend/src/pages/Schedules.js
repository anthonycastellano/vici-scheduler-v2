import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSchedules } from '../apiHelpers/schedule';

const Schedules = () => {
    const schedules = useSelector(state => state.schedules);

    useEffect(() => {
      // fetch schedules
      getSchedules().then((schedules) => {
        console.log(schedules);
      });
    }, []);

    return <h1>All schedules</h1>;
};

export default Schedules;