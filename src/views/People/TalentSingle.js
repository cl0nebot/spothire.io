import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

class TalentSingleView extends React.Component {
    constructor() {
        super();
    }

    render() {
        const wrapperClasses = classNames({
            [this.props.className]: true
        });

        return (
            <div className="pa4 bg-near-white">
                talent single
            </div>
        );
    }
}

TalentSingleView.defaultProps = {
    className: '',
};

TalentSingleView.propTypes = {
    className: PropTypes.string,
};

export default TalentSingleView;
