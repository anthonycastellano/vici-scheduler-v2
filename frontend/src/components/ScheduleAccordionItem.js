import { getMonthString, getSaturdays } from "../helpers/calendarHelpers";

// create a <tr> for each weekend in a schedule to be rendered in item description
const renderEmployeeRows = (schedule) => {
    const saturdays = getSaturdays(schedule.year, schedule.month);

    const tableRows = [];

    for (let i = 0; i < schedule.leads.length; i++) {
        tableRows.push(
            <tr key={`${schedule._id}-${saturdays[i]}`}>
                <td>
                    <p>{`${schedule.month}/${saturdays[i]}`}</p>
                </td>
                <td>
                    {schedule.leads[i]}
                </td>
                <td>
                    {schedule.backups[i]}
                </td>
            </tr>
        );
    }

    return tableRows;
}

const ScheduleAccordionItem = ({
    schedule,
    showDescription,
    onClick,
    activeItem
}) => {
    const buttonText = showDescription ? <b>{`${getMonthString(schedule.month)} ${schedule.year}`}</b> : <span>{`${getMonthString(schedule.month)} ${schedule.year}`}</span>;

    return (
        <div
            className={`schedule-accordion`}
            ref={showDescription ? activeItem : null}>
            <dt>
                <button onClick={onClick}>{buttonText}</button>
            </dt>
    
            <div className={`schedule-accordion-desc ${showDescription ? 'shown' : 'hidden'}`}>
                <dd>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <h3>Weekend</h3>
                                </th>
                                <th>
                                    <h3>Primary</h3>
                                </th>
                                <th>
                                    <h3>Secondary</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { renderEmployeeRows(schedule) }
                        </tbody>
                    </table>
                </dd>
            </div>
        </div>
    );
}

export default ScheduleAccordionItem;
