import React from 'react';
// import ResultIndicator from './ResultIndicator';

class ResultItem extends React.Component {

  constructor(props) {
    super(props);

    this.name = this.props.data;
    this.state = {
      previousResultsSummary: this.props.results
    };
  }

  getResultClass(testStatus) {
    switch (testStatus) {
      case "Pass":
        return "indicator indicator-pass";
      case "Fail":
        return "indicator indicator-fail";
      case "Not Ran":
        return "indicator indicator-not-ran"
      default:
        break;
    // TODO
    }
  }

  // TODO: Split the results into individual TRs
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        {
          this.state.previousResultsSummary.map(result => {
            return <button key={result} className={this.getResultClass(result)}></button>;
          })
        }
      </tr>
    );
  }
}

export default ResultItem;
