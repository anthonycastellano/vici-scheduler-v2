const LIST_CONTRAST_COLOR = '#3c424f';

const employeeList = (employees) => employees.map((employee) => {
    return  (
        <li>
	        <p>{employee}</p>
	    </li>
    );
});

const getMonthString = (month) => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('en-US', {
        month: 'long'
    });
};

const ScheduleAccordionItem = ({
    schedule,
    index,
    showDescription,
    onClick,
    activeItem,
    ariaExpanded
}) => (
    <div
        style={{backgroundColor: index % 2 === 0 ? LIST_CONTRAST_COLOR : ''}}
        ref={showDescription ? activeItem : null}>
        <dt>
            <button 
                onClick={onClick}
                aria-expanded={ariaExpanded}
                aria-controls={`item${index}_desc`}
            >{`${getMonthString(schedule.month)} ${schedule.year}`}</button>
        </dt>

        <dd>
            <div
                id={`item${index}_desc`}
            >
                <h3>Leads</h3>
                <ul>{employeeList(schedule.leads)}</ul>
                <h3>Backups</h3>
                <ul>{employeeList(schedule.backups)}</ul>
            </div>
        </dd>
    </div>
);

export default ScheduleAccordionItem;
