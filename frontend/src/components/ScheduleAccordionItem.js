import { getMonthString, getSaturdays } from "../helpers/calendarHelpers";

// create a <tr> for each weekend in a schedule to be rendered in item description
const renderEmployeeRows = (schedule) => {
    const saturdays = getSaturdays(schedule.year, schedule.month);

    const tableRows = [];

    for (let i = 0; i < schedule.leads.length; i++) {
        tableRows.push(
            <tr>
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
    index,
    showDescription,
    onClick,
    activeItem
}) => {
    const buttonText = showDescription ? <b>{`${getMonthString(schedule.month)} ${schedule.year}`}</b> : <span>{`${getMonthString(schedule.month)} ${schedule.year}`}</span>;

    return (
        <div
            className={`schedule-accordion ${index % 2 === 0 && 'alt'}`} // alternate styles for schedule list items
            ref={showDescription ? activeItem : null}>
            <dt>
                <button onClick={onClick}>{buttonText}</button>
            </dt>
    
            <div className={`schedule-accordion-desc ${showDescription ? 'shown' : 'hidden'}`}>
                <dd>
                    <table>
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
                        { renderEmployeeRows(schedule) }
                    </table>
                </dd>
            </div>
        </div>
    );
}

export default ScheduleAccordionItem;
