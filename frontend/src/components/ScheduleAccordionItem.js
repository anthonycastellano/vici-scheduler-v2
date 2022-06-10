const employeeList = (employees) => employees.map((employee) => {
    return  (
        <li>
	        <p>{employee}</p>
	    </li>
    );
});

const ScheduleAccordionItem = ({
    schedule,
    index,
    showDescription,
    onClick,
    title,
    activeItem
}) => {
    const buttonText = showDescription ? <b>{title}</b> : <span>{title}</span>

    return (
        <div
            className={`schedule-accordion ${index % 2 === 0 && 'alt'}`}
            ref={showDescription ? activeItem : null}>
            <dt>
                <button onClick={onClick}>{buttonText}</button>
            </dt>
    
            <div className={`schedule-accordion-desc ${showDescription ? 'shown' : 'hidden'}`}>
                <dd>
                    <h3>Leads</h3>
                    <ul>{employeeList(schedule.leads)}</ul>

                    <h3>Backups</h3>
                    <ul>{employeeList(schedule.backups)}</ul>
                </dd>
            </div>
        </div>
    );
}

export default ScheduleAccordionItem;
