import React from 'react';

import PropTypes from 'prop-types';
import PersonSchema from '../../schemas/Person';

import classNames from 'classnames';

import BasicButton from '../../components/Buttons/BasicButton';

import Icon from 'react-geomicons';

// dummy data
import users from '../../data/users.json';
const groups = [...Array(10).keys()].map((number) => {
    return {
        id: number,
        name: `Sample Group ${number + 1}`,
        talent: users
    };
});

class TalentSelectionInterface extends React.Component {
    constructor() {
        super();

        this.unSelectById = this.unSelectById.bind(this);

        this.renderSelectedTalents = this.renderSelectedTalents.bind(this);

        this.state = {
            selectedTalents: {
                talents: [
                    users[0],
                    users[1],
                    users[2],
                ],
                groups: [
                    groups[0],
                    groups[1],
                ],
                customSelections: [],
            }
        }
    }

    unSelectById(categoryKey, selectionId) {

    }

    renderSelectedTalents() {
        const selectionCategories = [
            {
                key: 'talents',
                title: 'Talents',
                selections: this.state.selectedTalents.talents,
                renderMethod: (talent, className) => {
                    return (
                        <p className={className}>{talent.firstName}</p>
                    );
                },
            },
            {
                key: 'groups',
                title: 'Groups',
                selections: this.state.selectedTalents.groups,
                renderMethod: (group, className) => {
                    return (
                        <p className={className}>{group.name} <span className="ml2 f6">({group.talent.length} talents)</span></p>
                    );
                },
            },
            {
                key: 'custom',
                title: 'Custom',
                selections: this.state.selectedTalents.customSelections,
                renderMethod: (customSelection, className) => {
                    return (
                        <p className={className}>¯\_(ツ)_/¯</p>
                    );
                },
            },
        ];

        return (
            <div>
                {selectionCategories.map((category) => {
                    return (
                        <section className="mb3" key={category.key}>
                            <h4 className="f6 normal mt0 mb2">{category.title}</h4>

                            <ul className="list pa0 ma0">
                                {category.selections.map((selection) => {
                                    return (
                                        <li key={selection.id} className="mt0 flex">
                                            {category.renderMethod(selection, 'flex-auto')}
                                            <div className="tr">
                                                <Icon color="#555555" name="close" className="pointer" onClick={() => this.unSelectById(category.key, selection.id)}/>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className={classNames(this.props.className)}>
                <div className="flex">
                    <div className="w-50 mr">
                        <h3 className="mt0 f6 lh-title ttu">Select Talents</h3>
                    </div>
                    <div className="w-50">
                        <h3 className="mt0 f6 lh-title ttu">Selected Talents</h3>
                        {this.renderSelectedTalents()}
                    </div>
                </div>

                <div className="tr">
                    <BasicButton className="button--positive">Add Talents</BasicButton>
                </div>
            </div>
        );
    }
}

TalentSelectionInterface.defaultProps = {
    className: '',
};

TalentSelectionInterface.propTypes = {
    className: PropTypes.string,
    talents: PropTypes.arrayOf(PersonSchema).isRequired,
};

export default TalentSelectionInterface;
