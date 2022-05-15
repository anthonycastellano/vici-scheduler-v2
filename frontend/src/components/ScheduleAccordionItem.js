
const employeeList = (employees) => employees.map((employee) => {
    return  (
        <li>
	    <p>{employee}</p>
	</li>
    )
});

const ScheduleAccordionItem = ({
    schedule,
    index,
    showDescription,
    ariaExpanded,
    onClick
}) => (
    <div className="schedule-item">
        <dt>
            <button
                aria-expanded={ariaExpanded}
                data-qa="schedule-item-button"
                onClick={onClick}>
                    {`${schedule.month}/${schedule.year}`}
            </button>
        </dt>

        <div id={`schedule${index}-desc`} hidden={!showDescription}>
            <dt>
                <p>Leads</p>
            </dt>
            <dd >
                <ul>
                    {employeeList(schedule.leads)}
                </ul>
            </dd>
            
            <dt>
                <p>Backups</p>
            </dt>
            <dd>
                <ul>
                    {employeeList(schedule.backups)}
                </ul>
            </dd>
        </div>
    </div>
);

export default ScheduleAccordionItem;
