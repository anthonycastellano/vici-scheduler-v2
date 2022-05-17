import classes from './css/ScheduleAccordionItem.module.css';

const LIST_CONTRAST_COLOR = '#3c424f';

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
    onClick
}) => (
    <div className={classes.scheduleItem} style={{backgroundColor: index % 2 == 0 ? LIST_CONTRAST_COLOR : ''}}>
        <dt>
            <button onClick={onClick}>
                {`${schedule.month}/${schedule.year}`}
            </button>
        </dt>

        <div class={classes.scheduleDesc} hidden={!showDescription}>
            <dt>
                <h3>Leads</h3>
            </dt>
            <dd >
                <ul>
                    {employeeList(schedule.leads)}
                </ul>
            </dd>
            
            <dt>
                <h3>Backups</h3>
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
