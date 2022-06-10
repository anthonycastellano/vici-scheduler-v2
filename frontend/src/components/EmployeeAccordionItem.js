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
        <div className={'employee-accordion ' + `${index % 2 === 0 && 'alt'}`}>
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