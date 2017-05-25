import React from 'react';

import PropTypes from 'prop-types';
import PersonSchema from '../schemas/Person';

import classNames from 'classnames';

import Box from '../components/Global/Box';
import BoxConnector from '../components/Global/BoxConnector';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import SelectableTimesheetTable from '../components/Employees/SelectableTimesheetTable';
import TimetableSummary from '../components/Employees/TimetableSummary';

class TimesheetView extends React.Component {
    constructor() {
        super();

        this.employeeCategories = [
            {
                value: 'all',
                label: 'All employees',
            },
            {
                value: 'underSubmitted',
                label: 'Employees with more hours submitted than worked',
            },
            {
                value: 'overSubmitted',
                label: 'Employees with more hours worked than submitted',
            },
        ];

        this.state = {
            searchQuery: '',
            selectedUserIds: [],
            employeeCategory: 'all', // oneOf['all', 'overSubmitted', 'underSubmitted']
        };
    }

    render() {
        const wrapperClasses = classNames({
            [this.props.className]: true
        });

        const filteredUsers = this.props.users.filter((user) => `${user.firstName} ${user.lastName}`.indexOf(this.state.searchQuery) > -1);

        let summarizedUsers = filteredUsers;

        if (this.state.selectedUserIds.length > 0) {
            summarizedUsers = filteredUsers.filter((user) => this.state.selectedUserIds.includes(user.id));
        }

        return (
            <div className="bg-near-white pa4">
                <Box>
                    <h2 className="f6 mt0 lh-title ttu">Summary</h2>

                    <p className="mt0 measure">Timesheet summary for {summarizedUsers.length} {(this.state.selectedUserIds.length > 0) ? 'selected' : 'displayed'} {(summarizedUsers.length === 1) ? 'employee' : 'employees'}.</p>

                    <TimetableSummary className="mt3" users={summarizedUsers}/>
                </Box>

                <BoxConnector isActive={this.state.searchQuery.length > 0}/>

                <Box>
                    <h2 className="f6 mt0 lh-title ttu">Filters</h2>

                    <label className="db mb2 f6" htmlFor="employees_category">Discrepancy type</label>
                    <Select
                        id="employees_category"
                        name="employees_category"
                        className="mt0"
                        options={this.employeeCategories}
                        value={this.state.employeeCategory}
                        onChange={(employeeCategory) => (employeeCategory !== null) ? this.setState({ employeeCategory: employeeCategory.value }) : this.setState({ employeeCategory: null })}
                    />

                    <p className="mt3">
                        <label className="f6 db" htmlFor="employees_search">Search</label>
                        <input className="mt2 w-100" type="text" id="employees_search" name="employees_search" value={this.state.searchQuery} onChange={(e) => this.setState({ searchQuery: e.target.value })}/>
                    </p>
                </Box>

                <BoxConnector isActive={this.state.searchQuery.length > 0}/>

                <SelectableTimesheetTable
                    users={filteredUsers}
                    onUpdateSelectedUsers={(selectedUserIds) => this.setState({ selectedUserIds })}
                />
            </div>
        );
    }
}

TimesheetView.defaultProps = {
    className: '',
};

TimesheetView.propTypes = {
    className: PropTypes.string,
    users: PropTypes.arrayOf(PersonSchema).isRequired,
};

export default TimesheetView;
