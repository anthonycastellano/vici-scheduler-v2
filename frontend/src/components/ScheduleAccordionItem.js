

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
        const date = new Date(schedule.year, schedule.month - 1);
        const tableRows = [];

        for (let i = 0; i < schedule.leads.length; i++) {
            tableRows.push(
                <tr>
                    <td>
                        xx/xx
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
                                <h3>Leads</h3>
                            </th>
                            <th>
                                <h3>Backups</h3>
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
