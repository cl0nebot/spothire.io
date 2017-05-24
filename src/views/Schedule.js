import React from 'react';

import PropTypes from 'prop-types';
import OpportunitySchema from '../schemas/Opportunity';

import Box from '../components/Global/Box';

import OverviewCalendar from '../components/Scheduling/OverviewCalendar';

import FilterContainer from '../components/Filters/FilterContainer';
import Filter from '../components/Filters/Filter';

import Select from 'react-select';

// storybook stuff
import { linkTo } from '@kadira/storybook';

// dummy data
import users from '../data/people.json';

class ScheduleView extends React.Component {
    constructor() {
        super();

        this.state = {
            filteredUserIds: []
        };
    }

    render() {
        return (
            <div>
                <div className="pa4 bg-near-white">
                    <div className="flex">
                        <FilterContainer className="mr3 w-third self-start" onResetFilters={() => this.setState({ filteredUserIds: [] })}>
                            <Select
                                multi
                                options={users
                                    .filter((user) => user.type === 'admin' || user.type === 'manager')
                                    .map((user) => {
                                        return {
                                            label: `${user.firstName} ${user.lastName}`,
                                            value: user.id,
                                        };
                                    })}
                                value={this.state.filteredUserIds}
                                onChange={(selectedUsers) => this.setState({ filteredUserIds: selectedUsers })}
                            />
                        </FilterContainer>
                        <Box className="flex-auto" title="Calendar">
                            <OverviewCalendar
                                events={this.props.events}
                                filter={{
                                    property: 'userId',
                                    values: this.state.filteredUserIds.map((user) => user.value)
                                }}
                                onSelectEvent={linkTo('Views', 'Schedule:OpportunitySingle')}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        );
    }
}

ScheduleView.defaultProps = {

};

ScheduleView.propTypes = {
    events: PropTypes.arrayOf(OpportunitySchema)
};

export default ScheduleView;
