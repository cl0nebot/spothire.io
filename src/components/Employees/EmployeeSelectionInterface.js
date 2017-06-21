import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PersonSchema from '../../schemas/Person';
import GroupSchema from '../../schemas/Group';
import BasicButton from '../../components/Buttons/BasicButton';
import SelectEmployees from './EmployeeSelection/SelectEmployees';
import ReviewSelectedEmployees from './EmployeeSelection/ReviewSelectedEmployees';

// Rule data
import filterKeys from '../../data/peopleFilterRules/filterKeys.json';
import filterTypes from '../../data/peopleFilterRules/filterTypes.json';

// demo data
import employees from '../../data/people.json';
const groups = [...Array(10).keys()].map((number) => {
    return {
            id: number,
            name: `Sample Group ${number + 1}`,
            employees: employees,
            type: 'static'
        };
    });

class EmployeeSelectionInterface extends React.Component {
    constructor(props) {
        super();

        this.unSelectById = this.unSelectById.bind(this);

        this.addCustomRule = this.addCustomRule.bind(this);

        this.state = {
            selectedEmployees: {
                employees: [
                    props.employees[0],
                    props.employees[1],
                    props.employees[2],
                ],
                groups: [
                    props.groups[0],
                    props.groups[1],
                ],
                customRules: [],
            }
        };

        this.filterKeys = filterKeys;
        this.filterTypes = filterTypes;

        this.selectionCategories = [
            {
                key: 'employees',
                title: 'Employees',
                selections: this.state.selectedEmployees.employees,
                renderMethod: (employee, className) => {
                    return (
                        <p className={className}>{employee.firstName} {employee.lastName}</p>
                    );
                },
            },
            {
                key: 'groups',
                title: 'Groups',
                selections: this.state.selectedEmployees.groups,
                renderMethod: (group, className) => {
                    return (
                        <p className={className}>{group.name} <span className="ml2 f6">({group.employees.length} employees)</span></p>
                    );
                },
            },
            {
                key: 'custom',
                title: 'Custom Rules',
                selections: this.state.selectedEmployees.customRules,
                renderMethod: (rule, className) => {
                    const filterKey = this.filterKeys.find((filterKey) => filterKey.value === rule.key);
                    const filterType = this.filterTypes.find((filterType) => filterType.value === rule.type);

                    return (
                        <p className={className}>{filterKey.label} that {filterType.label} “{rule.value}”<span className="ml2 f6">(15 employees)</span></p>
                    );
                },
            },
        ];
    }

    addCustomRule(rule) {
        let selectedEmployees = {...this.state.selectedEmployees};

        selectedEmployees.customRules.push(rule);

        this.setState({ selectedEmployees });
    }

    unSelectById(categoryKey, selectionId) {
        alert('Unselecting...');
    }

    render() {
        const filteredSelectionCategories = this.selectionCategories.filter((category) => this.props.enabledSelectionCategories.includes(category.key));

        return (
            <div className={classNames(this.props.className)}>
                <div className="flex">
                    <div className="w-50 mr4">
                        <h3 className="mt0 f6 lh-title ttu">Select Employees</h3>
                        <SelectEmployees selectionCategories={filteredSelectionCategories} onAddCustomRule={this.addCustomRule}/>
                    </div>
                    <div className="w-50">
                        <h3 className="mt0 f6 lh-title ttu">Selected Employees</h3>
                        <ReviewSelectedEmployees selectedEmployees={this.state.selectedEmployees} unSelectById={this.unSelectById} selectionCategories={filteredSelectionCategories}/>
                    </div>
                </div>

                <div className="tr">
                    <BasicButton className="button--positive">Add Employees</BasicButton>
                </div>
            </div>
        );
    }
}

EmployeeSelectionInterface.defaultProps = {
    className: '',
    employees: employees,
    groups: groups,
    enabledSelectionCategories: ['employees', 'groups', 'custom'],
};

EmployeeSelectionInterface.propTypes = {
    className: PropTypes.string,
    employees: PropTypes.arrayOf(PersonSchema).isRequired,
    groups: PropTypes.arrayOf(GroupSchema).isRequired,
    enabledSelectionCategories: PropTypes.array,
};

export default EmployeeSelectionInterface;
