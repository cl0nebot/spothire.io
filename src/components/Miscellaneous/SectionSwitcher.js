const React      = require('react');
const classNames = require('classnames');

const SecondaryMenu = require('../Global/SecondaryMenu');

class SectionSwitcher extends React.Component {
    constructor() {
        super();

        this.setActiveSection = this.setActiveSection.bind(this);

        this.state = {
            activeSectionIndex: 0
        }
    }

    setActiveSection(sectionKey) {
        const activeSectionIndex = this.props.sections.findIndex((section) => section.key === sectionKey);

        return this.setState({ activeSectionIndex });
    }

    render() {
        return (
            <div className={this.props.className}>
                <SecondaryMenu
                    className={this.props.secondaryMenuClassName}
                    items={this.props.sections.map((section, index) => {
                        return {
                            key: section.key,
                            text: section.name,
                            href: '#' + section.key,
                            isActive: index === this.state.activeSectionIndex
                        };
                    })}
                    onClick={this.setActiveSection}
                />
                {this.props.sections[this.state.activeSectionIndex].content}
            </div>
        );
    }
}

SectionSwitcher.defaultProps = {
    className: '',
    secondaryMenuClassName: 'ph4'
};

SectionSwitcher.propTypes = {
    sections: React.PropTypes.array.isRequired
};

module.exports = SectionSwitcher;
