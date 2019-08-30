import React, { Component } from "react";

class Step1 extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="assetsADD/css/style.css" />

        <div class="f1-steps">
          <div class="f1-progress">
            <div
              class="f1-progress-line"
              data-now-value="12.5"
              data-number-of-steps="4"
            />
          </div>
          <div class="f1-step active">
            <div class="f1-step-icon">
              <i class="fa fa-user" />
            </div>
            <p>Request Informations</p>
          </div>
          <div class="f1-step">
            <div class="f1-step-icon">
              <i class="fa fa-question" />
            </div>
            <p>Confirm Add</p>
          </div>
          <div class="f1-step">
            <div class="f1-step-icon">
              <i class="fa  fa-check-square" />
            </div>
            <p>Result(Sign)</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Step1;
