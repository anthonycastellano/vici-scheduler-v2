

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
        <dd>
            <p id={`schedule${index}-desc`}>
                {schedule.leads}
            </p>
        </dd>
    </div>
);

export default ScheduleAccordionItem;