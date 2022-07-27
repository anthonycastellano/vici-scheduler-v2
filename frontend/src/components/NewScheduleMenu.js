import CONSTANTS from "../store/constants";
import { MdOutlineNavigateBefore } from 'react-icons/md';

// styling
import './css/AdminMenu.scss';

const NewScheduleMenu = ({ setMode }) => {

    return (
        <div>
            <button className='back-btn' onClick={() => setMode(CONSTANTS.ADMIN_MODE_MENU)}><MdOutlineNavigateBefore/></button>
        </div>
    );
};

export default NewScheduleMenu;