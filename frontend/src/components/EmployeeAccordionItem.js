const LIST_CONTRAST_COLOR = '#3c424f';

const scheduleList = (schedules) => schedules.map((schedule) => {
    return (
        <li>
            <p>{schedule}</p>
        </li>
    );
});

const EmployeeAccordionItem = ({
    employee,
    index,
    showDescription,
    onClick
}) => {
    return (
        <div
        style={{backgroundColor: index % 2 === 0 ? LIST_CONTRAST_COLOR : ''}}>
            <dt>
                <button onClick={onClick}>{employee.firstName} {employee.lastName}</button>
            </dt>

            <div hidden={!showDescription}>
                <dd>{scheduleList([1,2,3])}</dd>
            </div>
        </div>
    );
};

export default EmployeeAccordionItem;