import classes from './css/AccordionItem.module.css';

const LIST_CONTRAST_COLOR = '#3c424f';

const EmployeeAccordionItem = ({
    employee,
    index,
    showDescription,
    onClick
}) => {
    return (
        <div
        className={classes.scheduleItem}
        style={{backgroundColor: index % 2 === 0 ? LIST_CONTRAST_COLOR : ''}}>
            <p>{employee.firstName} {employee.lastName}</p>
        </div>
    );
};

export default EmployeeAccordionItem;