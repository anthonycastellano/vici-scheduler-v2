const ScheduleAccordionItem = ({
    schedule,
    index,
    showDescription,
    onClick,
    title,
    activeItem
}) => {
    const buttonText = showDescription ? <b>{title}</b> : <span>{title}</span>;

    // create a <tr> for each weekend in a schedule to be rendered in item description
    const renderEmployeeRows = () => {
        // get saturday dates for the month
        const saturdays = [];
        let day = 1;
        let date = new Date(schedule.year, schedule.month - 1, day);
        while (date.getMonth() === schedule.month - 1) {
            if (date.getDay() === 6) {
                saturdays.push(date.getDate());
                day += 7;
                date = new Date(schedule.year, schedule.month - 1, day);
                continue;
            }
            date = new Date(schedule.year, schedule.month - 1, ++day);
        }

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
                        { renderEmployeeRows() }
                    </table>
                </dd>
            </div>
        </div>
    );
}

export default ScheduleAccordionItem;
