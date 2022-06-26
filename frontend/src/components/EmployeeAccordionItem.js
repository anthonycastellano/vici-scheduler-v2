const renderScheduleList = (employee) => employee.schedules.map((schedule) => {
    return (
        <tr>
            <td><p>{schedule[0]}</p></td>
            <td><p>{schedule[1]}</p></td>
        </tr>
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
                    {
                        employee.schedules &&
                        <table>
                            <tr>
                                <td><h3>Weekend</h3></td><td><h3>Role</h3></td>
                            </tr>
                            {renderScheduleList(employee)}
                        </table>
                    }
                    {!employee.schedules && <p>No upcoming dates.</p>}
                </dd>
            </div>
        </div>
    );
};

export default EmployeeAccordionItem;