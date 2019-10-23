import React, { Component } from 'react';
import ResultList from './ResultList';
// import logo from './logo.svg';
import './bootstrap.css';
import './App.css';
import dummyData from './dummydata';

class App extends Component {

  constructor(props) {
    super(props);

    this.tests = []; // Raw list of all tests pulled from selected runsets
    this.runs = []; // Raw list of all runs pulled from selected runsets
    this.suites = []; // Raw list of all suites pulled from selected runsets

    this.sortedTests = [];
    this.data = dummyData;

    this.state = {
      runsets: []
    }
  }

  // Get the names of all runsets
  // TODO: Fix to clarify it gets the names and not objects
  getAllRunsets(data) {
    for (var runset of Object.keys(data)) {
      this.state.runsets.push(runset);
    }
  }

  getAllTestsFromRun(run) {
    var tests = [];
      for (var suite of Object.values(run.suites)) {
        for (var test of Object.values(suite.tests)) {
          tests.push(test);
        }
      }
    return tests;
  }

  // Pushes the runs, suites, and tests from the selected runset to be processed
  addDataFromRunset(runsetName) {
    for (var run of Object.values(this.data[runsetName])) {
      this.runs.push(run);
      for (var suite of Object.values(run.suites)) {
        this.suites.push(suite);
        for (var test of Object.values(suite.tests)) {
          this.tests.push(test);
        }
      }
    }
  }

  // Takes unsorted set of test objects and sorts them into sortedTests
  populateViewList(tests) {
    var indexOfTest, testObj;
    for (var i = 0; i<tests.length; i++) {
      indexOfTest = this.getIndexByName(tests[i].name, this.sortedTests);
      if (indexOfTest === -1) {
        // It's not in the list, so lets add it
        testObj = {
          name: tests[i].name,
          results: [],
          resultScore: 0
        };

        this.sortedTests.push(testObj);
      }
    }
  }

  // Attempt at generating results lists properly
  createResultsList() {
    var testsInRun, testResult, index;
    for (var run of Object.values(this.runs)) {
      testsInRun = this.getAllTestsFromRun(run);
      for (var test of Object.values(this.sortedTests)) {
        index = this.getIndexByName(test.name, testsInRun);
        if (index === -1) {
          test.results.push("Not Ran");
          test.resultScore = test.resultScore + 1;
        }
        else {
          testResult = testsInRun[index].status;
          test.results.push(testResult);
          if (testResult === "Pass") {
            test.resultScore = test.resultScore + 2;
          }
        }
      }
    }
  }

  // Get the index of a test with given name in the given list. Returns -1 if not found
  getIndexByName(name, list) {
    for (var i = 0; i<list.length; i++) {
      if (list[i].name === name) return i;
    }
    return -1;
  }

  render() {
    this.addDataFromRunset('VG_Dev_Acceptance'); // TODO: select which data set can be loaded
    this.getAllRunsets(this.data);

    this.populateViewList(this.tests);
    this.createResultsList();
    return (
      <div className="App">
        <main>
          <ResultList tests={this.sortedTests} />
        </main>
      </div>
      );
    }
}

export default App;
