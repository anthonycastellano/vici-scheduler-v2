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
    onClick,
    title
}) => {
    const buttonText = showDescription ? <b>{title}</b> : <span>{title}</span>

    return (
        <div className={`employee-accordion ${index % 2 === 0 && 'alt'}`}>
            <dt>
                <button onClick={onClick}>{buttonText}</button>
            </dt>

            <div className={`employee-accordion-desc ${showDescription ? 'shown' : 'hidden'}`}>
                <dd>{scheduleList([1,2,3])}</dd>
            </div>
        </div>
    );
};

export default EmployeeAccordionItem;