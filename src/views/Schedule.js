import React from 'react';

import PropTypes from 'prop-types';
import OpportunitySchema from '../schemas/Opportunity';

import Box from '../components/Global/Box';

import OverviewCalendar from '../components/Scheduling/OverviewCalendar';

import FilterContainer from '../components/Filters/FilterContainer';
import Filter from '../components/Filters/Filter';

// storybook stuff
import { linkTo } from '@kadira/storybook';

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
                        <FilterContainer className="mr3 w-third self-start">
                            <Filter
                                id="schedule_userId_filter"
                                label="Managers"
                                type="select"
                                data={{
                                    inputProps: {
                                        id: 'schedule_userId_filter'
                                    },
                                    options: [
                                        {
                                            value: '1',
                                            label: 'Option 1'
                                        },
                                        {
                                            value: '2',
                                            label: 'Option 2'
                                        }
                                    ],
                                    selectConfig: {
                                        multi: true
                                    }
                                }}
                            />
                        </FilterContainer>
                        <Box className="flex-auto" title="Calendar">
                            <OverviewCalendar
                                events={this.props.events}
                                filter={{
                                    property: 'userId',
                                    values: this.state.filteredUserIds
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
