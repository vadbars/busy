import React, { Component, PropTypes } from 'react';
import { Gateway } from 'react-gateway';
import { getElementPosition } from '../tooltip/tooltipHelpers';
import SimplePopover from './SimplePopover';

const initialState = {
  active: false,
  pos: null,
};

/**
 * This component will open a Popover that will be closed by clicking outside the popover
 *
 * Usage:
 *
 * <Popover
 *   title="My Popover title"
 *   content={
 *     <p>This is my <b>custom</b>
 *     body and I can even use <Link to="/">react components</Link> inside it</p>
 *   }
 *   className="CustomClassname" // default will be .BusyPopover
 * />
 */
export default class Popover extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'BusyPopover',
    value: null,
  };

  showPopover = (e) => {
    e.preventDefault();
    const pos = e.target && getElementPosition(e.target);
    const posInBrowser = e.target && e.target.getBoundingClientRect();

    this.setState({
      active: true,
      pos,
      posInBrowser,
    });
  };

  removePopover = () => {
    this.setState(initialState);
  };

  renderPopover() {
    const { className, title, content } = this.props;
    const { pos, posInBrowser, active } = this.state;

    if (!active) return null;

    return (
      <Gateway into="popover">
        <SimplePopover
          pos={pos}
          posInBrowser={posInBrowser}
          className={className}
          title={title}
          content={content}
          removePopover={() => this.removePopover()}
        />
      </Gateway>
    );
  }

  render() {
    return (
      <span onClick={this.showPopover}>
        {this.props.children}
        {this.renderPopover()}
      </span>
    );
  }
}
