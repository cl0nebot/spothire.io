import PropTypes from 'prop-types';

const OpportunitySchema = PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isAllDay: PropTypes.bool.isRequired,
    selectedDates: PropTypes.shape({
        start: PropTypes.object.isRequired,
        end: PropTypes.object.isRequired
    }).isRequired,
    talent: PropTypes.shape({
        invited: PropTypes.oneOf(['all', 'available', 'selected']).isRequired,
        confirmed: PropTypes.array
    }).isRequired
});

export default OpportunitySchema;