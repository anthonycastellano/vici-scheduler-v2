import CONSTANTS from "../store/constants";

const Stats = ({ setMode }) => {

    return (
        <div>
            <button onClick={() => setMode(CONSTANTS.ADMIN_MODE_MENU)}>Back</button>
        </div>
    );
};

export default Stats;