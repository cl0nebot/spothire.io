const React      = require('react');
const classNames = require('classnames');

const Table = require('reactable').Table;
const Thead = require('reactable').Thead;
const Th    = require('reactable').Th;
const Tr    = require('reactable').Tr;
const Td    = require('reactable').Td;

const BasicButton = require('../Buttons/BasicButton');

class ShiftList extends React.Component {
    constructor() {
        super();

        this.renderShiftRow = this.renderShiftRow.bind(this);
        this.renderShiftCell = this.renderShiftCell.bind(this);
        this.renderHeaderCell = this.renderHeaderCell.bind(this);

        this.commonCellClasses = 'pa3';

        this.state = {
            shifts: [
                {
                    start: new Date(),
                    end: new Date(),

                }
            ]
        };
    }

    renderShiftRow(shift, index) {
        const shiftClasses = classNames({
            'ph3 pa2 mt0 hover-bg-black-10': true
        });

        return (
            <Tr key={shift.id} className={shiftClasses}>
                {this.renderShiftCell('index', `${index + 1}`)}
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

    renderHeaderCell(column, value, className) {
        const cellClasses = classNames({
            'f6 normal tl bb bw1 b--white-40': true,
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
            'bg-white ba b--black-20 sh-shadow-2 ': true,
            [this.props.className]: true
        });

        return (
            <div className={wrapperClasses}>
                <Table className="w-100" cellSpacing="0">
                    <Thead>
                    {this.renderHeaderCell('index', '#', '')}
                    {this.renderHeaderCell('startDate', 'Start Date', '')}
                    {this.renderHeaderCell('startTime', 'Start Time', '')}
                    {this.renderHeaderCell('endDate', 'End Date', '')}
                    {this.renderHeaderCell('endTime', 'End Time', '')}
                    {this.renderHeaderCell('controls', 'Controls', 'clip')}
                    </Thead>
                    {this.state.shifts.map((shift, index) => this.renderShiftRow(shift, index))}
                </Table>
            </div>
        )
    }
}

ShiftList.defaultProps = {
    className: ''
};

export default ShiftList;