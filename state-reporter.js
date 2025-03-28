// state-reporter.js
class StateReporter {
  onTestEnd(test, result) {
    if (!this.state) {
      this.state = {};
    }
    this.state[test.location.file + "::" + test.title] = result.duration;
  }

  onEnd() {
    console.log(JSON.stringify(this.state));
  }
}

module.exports = StateReporter;
