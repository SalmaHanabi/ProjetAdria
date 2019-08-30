import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { creacteDemande, getcomptes } from "../../actions/projectactions";
import AddLinks from "../Links/AddLinks";
import Step1 from "../AddDesign/Step1";
import classnames from "classnames";
class Form extends React.Component {
  componentDidMount() {
    this.props.getcomptes();
  }

  constructor() {
    super();

    this.state = {
      motif: "",
      status: "Registred",
      nombreCheque: "",
      compte: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //lifeCycle
  componentWillReceiveProps(nextProps) {
    //si component reçoit un objet errors donc on modifie l'objet errors de state par celui ci
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newDemande = {
      motif: this.state.motif,
      nombreCheque: this.state.nombreCheque,
      status: this.state.status,
      compte: JSON.parse(this.state.compte)
    };

    this.props.creacteDemande(newDemande, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { comptes } = this.props.compte;
    return (
      <center>
        <AddLinks />
        <Step1 />
        <div class="content  mt-4">
          <div class="animated fadeIn">
            <div class="row">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <div class="col-md-8">
                <div class="card">
                  <div class="card-header">
                    <strong>Fill in these Fields (Step 1) </strong>{" "}
                    <small> </small>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div class="card-body card-block">
                      <div class="form-group">
                        <label class=" form-control-label">
                          Account Number
                        </label>
                        <br />
                        <div>
                          <div class="input-group">
                            <div class="input-group-addon">
                              <i class="fa fa-user" />
                            </div>

                            <select
                              id="select"
                              class="form-control"
                              data-placeholder="Choose a Number..."
                              defaultValue={"-1"}
                              tabIndex="1"
                              name="compte"
                              onChange={this.onChange}
                              required
                            >
                              <option value={null}>Choose a number...</option>
                              {comptes.map(compte => (
                                <option
                                  value={JSON.stringify(compte)}
                                  key={compte.numCompte}
                                >
                                  {compte.numCompte}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <p>{errors.compte}</p>
                      </div>

                      <div class="form-group">
                        <label class=" form-control-label">
                          Pattern of this Request
                        </label>
                        <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-edit" />
                          </div>
                          <input
                            className={classnames("form-control", {
                              "is-invalid": errors.motif
                            })}
                            name="motif"
                            value={this.state.motif}
                            onChange={this.onChange.bind(this)}
                          />
                          {errors.motif && (
                            <div className="invalid-feedback">
                              {errors.motif}
                            </div>
                          )}
                        </div>
                        <small class="form-text text-muted">ex. xxxxxx</small>
                      </div>
                      <div class="form-group">
                        <label class=" form-control-label">
                          Number of checkbooks
                        </label>
                        <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-asterisk" />
                          </div>
                          <input
                            className={classnames("form-control", {
                              "is-invalid": errors.nombreCheque
                            })}
                            name="nombreCheque"
                            type="number"
                            value={this.state.nombreCheque}
                            onChange={this.onChange.bind(this)}
                          />
                          {errors.nombreCheque && (
                            <div className="invalid-feedback">
                              {errors.nombreCheque}
                            </div>
                          )}
                        </div>
                        <small class="form-text text-muted">between 1-10</small>
                      </div>

                      <button type="submit" class="btn btn-next">
                        <i class="fa fa-arrow-right" />
                        &nbsp; Next Step
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    );
  }
}

Form.propTypes = {
  creacteDemande: PropTypes.func.isRequired,
  compte: PropTypes.object.isRequired,
  getcomptes: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  compte: state.compte,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { creacteDemande, getcomptes }
)(Form);
