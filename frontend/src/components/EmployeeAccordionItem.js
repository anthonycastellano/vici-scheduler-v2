const renderScheduleList = (employee) => employee.schedules.map((schedule) => {
    // <tr> with two cells
    // m/y role
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
    const buttonText = showDescription ? <b>{`${employee.firstName} ${employee.lastName}`}</b> : <span>{`${employee.firstName} ${employee.lastName}`}</span>

    return (
        <div className={`employee-accordion ${index % 2 === 0 && 'alt'}`}>
            <dt>
                <button onClick={onClick}>{buttonText}</button>
            </dt>

            <div className={`employee-accordion-desc ${showDescription ? 'shown' : 'hidden'}`}>
                <dd>
                    <table>
                        <tr>
                            <td>Weekend</td><td>Role</td>
                        </tr>
                        {renderScheduleList(employee)}
                    </table>
                </dd>
            </div>
        </div>
    );
};

export default EmployeeAccordionItem;