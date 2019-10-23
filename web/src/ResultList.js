import React from 'react';
import ResultItem from './ResultItem';
import SortToggle from './SortToggle';

class ResultList extends React.Component {

  constructor(props) {
    super(props);
    // this.testList = [];
    this.state = {
      tests: this.props.tests
    }
    // this.state = {
    //   names: [],
    //   results: [],
    //   list: []
    // };
  }

  sortByNameAscending = () => {
    const { tests } = this.state;
    tests.sort(function(a, b) {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    });
    this.setState({ tests })
  }

  sortByNameDescending = () => {
    const { tests } = this.state;
    tests.sort(function(a, b) {
      if(a.name < b.name) { return 1; }
      if(a.name > b.name) { return -1; }
      return 0;
    });
    this.setState({ tests })
  }

  sortByResultsAscending = () => {
    const { tests } = this.state;
    tests.sort(function(a, b) {
      if(a.resultScore < b.resultScore) { return -1; }
      if(a.resultScore > b.resultScore) { return 1; }
      return 0;
    });
    this.setState({ tests })
  }

  sortByResultsDescending = () => {
    const { tests } = this.state;
    tests.sort(function(a, b) {
      if(a.resultScore < b.resultScore) { return 1; }
      if(a.resultScore > b.resultScore) { return -1; }
      return 0;
    });
    this.setState({ tests })
  }

  render() {
    return (
      <div className="container">
        <h2>Results</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                Test name
                <SortToggle onClick={this.sortByNameAscending}>asc</SortToggle>
              </th>
              <th>
                Previous Results
                <SortToggle onClick={this.sortByResultsAscending}>asc</SortToggle>
              </th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.tests.map(test => {
              return <ResultItem key={test.name} name={test.name} results={test.results} />;
            })
          }
          </tbody>
        </table>
        <button onClick={this.sortByNameAscending}>asc</button>
        <button onClick={this.sortByNameDescending}>desc</button>
        <button onClick={this.sortByResultsAscending}>asc</button>
        <button onClick={this.sortByResultsDescending}>desc</button>
      </div>
    );
  }
}

export default ResultList;
