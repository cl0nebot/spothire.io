const React      = require('react');
const classNames = require('classnames');

import moment from 'moment';

const Table = require('reactable').Table;
const Thead = require('reactable').Thead;
const Th    = require('reactable').Th;
const Tr    = require('reactable').Tr;
const Td    = require('reactable').Td;

const BasicButton = require('../Buttons/BasicButton');

import { ButtonCircle } from 'rebass';

import Icon from 'react-geomicons';

class ShiftList extends React.Component {
    constructor() {
        super();

        this.toggleShiftEditing = this.toggleShiftEditing.bind(this);
        this.deleteShift = this.deleteShift.bind(this);

        this.renderShiftRow = this.renderShiftRow.bind(this);
        this.renderShiftCell = this.renderShiftCell.bind(this);
        this.renderControls = this.renderControls.bind(this);
        this.renderHeaderCell = this.renderHeaderCell.bind(this);

        this.commonCellClasses = 'pa3';

        this.state = {
            currentlyEditingShiftId: null,
            shifts: [
                {
                    id: 0,
                    start: moment(new Date(2017, 4, 1, 8, 0)),
                    end: moment(new Date(2017, 4, 1, 16, 0)),
                },
                {
                    id: 1,
                    start: moment(new Date(2017, 4, 1, 16, 0)),
                    end: moment(new Date(2017, 4, 2, 0, 0)),
                }
            ]
        };
    }

    toggleShiftEditing(shiftId) {
        let currentlyEditingShiftId = parseInt(this.state.currentlyEditingShiftId);

        // Unset the currently editing shift if we’re toggling that shift. Else, set to the new shift ID.
        if (shiftId === currentlyEditingShiftId) {
            currentlyEditingShiftId = null;
        } else {
            currentlyEditingShiftId = shiftId;
        }

        return this.setState({ currentlyEditingShiftId });
    }

    deleteShift(shiftId) {
        let shifts = [...this.state.shifts];

        // Drop the shift by finding its index
        shifts.splice(shifts.findIndex((shift) => shift.id === shiftId), 1);

        return this.setState({ shifts });
    }

    renderShiftRow(shift, index) {
        const shiftClasses = classNames({
            'ph3 pa2 mt0 hover-bg-black-10': true
        });

        return (
            <Tr key={shift.id} className={shiftClasses}>
                {this.renderShiftCell('index', `${index + 1}`)}
                {this.renderShiftCell('startDate', shift.start.format('MMMM Do, YYYY'))}
                {this.renderShiftCell('startTime', shift.start.format('h:mm a'))}
                {this.renderShiftCell('endDate', shift.end.format('MMMM Do, YYYY'))}
                {this.renderShiftCell('endTime', shift.end.format('h:mm a'))}
                {this.renderShiftCell('length', `${shift.end.diff(shift.start, 'hours')} hrs`)}
                {this.renderShiftCell('controls', () => this.renderControls(shift))}
            </Tr>
        );
    }

    renderShiftCell(column, value, className) {
        const cellClasses = classNames({
            'bb b--black-20': true,
            [this.commonCellClasses]: true,
            [className]: true
        });

        return (
            <Td
                column={column}
                className={cellClasses}
            >
                {(typeof value == 'string') ? value : value()}
            </Td>
        );
    }

    renderControls(shift) {
        return (
            <div className="tr">
                <Icon color="#555555" name="compose" className="pointer" onClick={() => this.toggleShiftEditing(shift.id)}/>
                <Icon color="#555555" name="close" className="pointer ml2" onClick={() => this.deleteShift(shift.id)}/>
            </div>
        );
    }

    renderHeaderCell(column, value, className) {
        const cellClasses = classNames({
            'f6 normal tl bb bw1 b--black-20 no-select': true,
            [this.commonCellClasses]: true,
            [className]: true
        });

        return (
            <Th
                column={column}
                className={cellClasses}
            >
                {value}
            </Th>
        );
    }

    render() {
        const wrapperClasses = classNames({
            '': true,
            [this.props.className]: true
        });

        return (
            <div className={wrapperClasses}>
                <Table className="bg-white ba b--black-20 sh-shadow-2 w-100 table-layout-fixed" cellSpacing="0">
                    <Thead>
                    {this.renderHeaderCell('index', '#', 'w2')}
                    {this.renderHeaderCell('startDate', 'Start Date', '')}
                    {this.renderHeaderCell('startTime', 'Start Time', '')}
                    {this.renderHeaderCell('endDate', 'End Date', '')}
                    {this.renderHeaderCell('endTime', 'End Time', '')}
                    {this.renderHeaderCell('length', 'Length', '')}
                    {this.renderHeaderCell('controls', 'Controls', 'transparent w-10')}
                    </Thead>
                    {this.state.shifts.map((shift, index) => this.renderShiftRow(shift, index))}
                </Table>
                <div className="tr mt3">
                    <BasicButton className="button--positive">Add Shift</BasicButton>
                </div>
            </div>
        )
    }
}

ShiftList.defaultProps = {
    className: ''
};

export default ShiftList;