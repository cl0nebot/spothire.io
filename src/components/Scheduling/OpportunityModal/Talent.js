const React      = require('react');
import classNames from 'classnames';

import ButtonBar from '../../Buttons/ButtonBar';
import RadioButton from '../../Buttons/RadioButton';

class OpportunityModalTalent extends React.Component {
    constructor() {
        super();

        this.updateInviteType = this.updateInviteType.bind(this);
        this.renderSelectionInterface = this.renderSelectionInterface.bind(this);
    }

    updateInviteType(inviteType) {
        const opportunity = { ...this.props.opportunity };

        opportunity.talent.invited = inviteType;

        this.props.updateOpportunity(opportunity);
    }

    renderSelectionInterface() {
        let selectionInterface;

        switch (this.props.opportunity.talent.invited) {
            case 'all':
                selectionInterface = (
                    <p>All talent will be invited.</p>
                );
                break;
            case 'available':
                selectionInterface = (
                    <p>Only talent available to work during the opportunity will be invited.</p>
                );
                break;
            case 'selected':
                selectionInterface = (
                    <p>Selection interface...</p>
                );
                break;
            default:
                break;
        }

        return selectionInterface;
    }

    render() {
        return (
            <div className="mt3">
                <p className="f6">Invited talent</p>
                <ButtonBar className="w-100 mt2">
                    {[
                        'All',
                        'Available',
                        'Selected'
                    ].map((inviteType) =>
                        <RadioButton
                            name="opp_talent_invited"
                            id={'opp_talent_invited_' + inviteType.toLowerCase()}
                            value={inviteType.toLowerCase()}
                            checked={this.props.opportunity.talent.invited === inviteType.toLowerCase()}
                            onClick={() => this.updateInviteType(inviteType.toLowerCase())}
                        >
                            {inviteType}
                        </RadioButton>
                    )}
                </ButtonBar>
                {this.renderSelectionInterface()}
            </div>
        )
    }
}

OpportunityModalTalent.propTypes = {
    updateOpportunity: React.PropTypes.func.isRequired,
    opportunity: React.PropTypes.object.isRequired
};

export default OpportunityModalTalent;