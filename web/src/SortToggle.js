import React from 'react';

class SortToggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      ascending: true
    };
  }

  render() {
    var className = 'fa table-sort ';
    if (this.state.active !== true) {
      className += 'fa-sort table-sort-inactive';
    } else if (this.state.ascending) {
      className += 'fa-sort-asc';
    } else {
      className += 'fa-sort-desc';
    }
    return (
      <span className={className} onClick={() => this.props.onClick()}></span>
    );
  }
}

export default SortToggle;
