import React from 'react';
import PropTypes from 'prop-types';
import DateInput from './DateInput';
import Calendar from './Calendar';
import styles from './styles/Dates.css';

const { Component } = React;

export default class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DatesMaximized: false,
      formFocus: '',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
    };
    this.handleDatesFocus = this.handleDatesFocus.bind(this);
    this.handleDatesBlur = this.handleDatesBlur.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.clearAllInput = this.clearAllInput.bind(this);
  }

  handleDatesFocus() {
    this.setState({
      DatesMaximized: true,
    });
  }

  handleDatesBlur(event) {
    if (event.relatedTarget === null) {
      this.setState({
        DatesMaximized: false,
      });
    }
  }

  handleClose() {
    this.setState({
      DatesMaximized: false,
    });
  }

  handleFieldFocus(event) {
    const { name } = event.currentTarget;
    const focus = name.match(/(.+)Input/) ? name.match(/(.+)Input/)[1] : '';
    this.setState({
      formFocus: focus,
      fieldFocus: focus,
    });
  }

  handleFieldBlur() {
    this.setState({
      fieldFocus: '',
    });
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  clearInput(event) {
    event.preventDefault();
    const { name } = event.target;
    this.setState({
      [name]: '',
    });
  }

  clearAllInput(event) {
    event.preventDefault();
    this.setState({
      formFocus: '',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
    });
  }

  render() {
    const {
      DatesMaximized,
      formFocus,
      fieldFocus,
      checkInInput,
      checkOutInput,
    } = this.state;
    const { minNights } = this.props;

    const selectDates = DatesMaximized
      ? (
        <td>
          <div>
            Select dates
          </div>
          <div>
            {`Minimum stay: ${minNights} ${minNights === 1 ? 'night' : 'nights'}`}
          </div>
        </td>
      )
      : null;

    const calendar = DatesMaximized
      ? <Calendar />
      : null;

    const footer = DatesMaximized
      ? (
        <div>
          {/* <span><img src="./img/kb_no-hover.png" alt="keyboard icon" className={styles.keyboardIcon} /></span> */}
          <span className={styles.keyboardIcon} />
          {/* <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M29 5a2 2 0 0 1 1.995 1.85L31 7v18a2 2 0 0 1-1.85 1.995L29 27H3a2 2 0 0 1-1.995-1.85L1 25V7a2 2 0 0 1 1.85-1.995L3 5zm0 2H3v18h26zm-8 13v2H11v-2zm3-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm16-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg> */}
          <button type="button" onClick={this.clearAllInput}>Clear dates</button>
          <button type="button" onClick={this.handleClose}>Close</button>
        </div>
      )
      : null;

    return (
      <div
        tabIndex={1}
        onFocus={this.handleDatesFocus}
        onBlur={this.handleDatesBlur}
        className={styles.DatesContainer}
      >
        <table>
          <tbody>
            <tr>
              {selectDates}
              <DateInput
                onFieldFocus={this.handleFieldFocus}
                onFieldBlur={this.handleFieldBlur}
                dateType="check-in"
                DatesMaximized={DatesMaximized}
                formFocus={formFocus}
                fieldFocus={fieldFocus}
                input={checkInInput}
                onInput={this.handleInput}
                onClear={this.clearInput}
              />
              <DateInput
                onFieldFocus={this.handleFieldFocus}
                onFieldBlur={this.handleFieldBlur}
                dateType="checkout"
                DatesMaximized={DatesMaximized}
                formFocus={formFocus}
                fieldFocus={fieldFocus}
                input={checkOutInput}
                onInput={this.handleInput}
                onClear={this.clearInput}
              />
            </tr>
          </tbody>
        </table>
        {calendar}
        {footer}
      </div>
    );
  }
}

Dates.propTypes = {
  minNights: PropTypes.number.isRequired,
};
