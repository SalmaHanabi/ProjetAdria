import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  creacteDemande,
  getcomptes,
  getDemandeById,
  deleteDemande
} from "../../actions/projectactions";
import AddLinks from "../Links/AddLinks";
import { Link } from "react-router-dom";
import Step1 from "../AddDesign/Step1";

import Step2 from "../AddDesign/Step2";
class SecondStep extends Component {
  componentDidMount() {
    //recuperation de l'id de la demande
    const  id  = this.props.id;
    this.props.getcomptes();
    this.props.getDemandeById(id, this.props.history);
  }

  ClickDelete = e => {
    e.preventDefault();
    this.props.deleteDemande(e.target.value, this.props.history);
  };
  render() {
    const { demande } = this.props.demande;

    return (
      <center>
        {" "}
        <AddLinks />
       
        <div class="content  mt-4">
          <div class="animated fadeIn">
            <div class="row">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <div class="col-md-8">
                <div class="card">
                  <div class="card-header">
                    <strong>Confirm Request (Step 2) </strong> <small> </small>
                  </div>
                  <form>
                    <div class="card-body card-block">
                      <input type="hidden" name="id" value={demande.id} />
                      <div class="form-group">
                        <label for="disabledSelect" class=" form-control-label">
                          Account Number
                        </label>
                        <br />
                        <div>
                          <div class="input-group">
                            <div class="input-group-addon">
                              <i class="fa fa-user" />
                            </div>

                            <select
                              id="disabledSelect"
                              disabled
                              class="form-control"
                              data-placeholder="Choose a Number..."
                              defaultValue={"-1"}
                              tabIndex="1"
                              name="compte"
                            >
                              <option value={demande.compte}>
                                {demande.compte
                                  ? demande.compte.numCompte
                                  : "en cours"}
                              </option>
                            </select>
                          </div>
                        </div>
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
                            className="form-control"
                            name="motif"
                            value={demande.motif}
                            disabled
                          />
                        </div>
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
                            className="form-control"
                            name="nombreCheque"
                            type="number"
                            value={demande.nombreCheque}
                            disabled
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class=" form-control-label">
                          Date of this Request
                        </label>
                        <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-calendar" />
                          </div>

                          <input
                            class="form-control"
                            name="motif"
                            value={demande.dateCreation}
                            disabled
                          />
                        </div>
                      </div>
                      <Link to={`/thirdStep/${demande.id}`}>
                        <button class="btn btn-secondary">
                          <i class="fa fa-check-square" />
                          &nbsp; Confirm Request
                        </button>
                      </Link>
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <button
                        class="btn btn-danger"
                        onClick={this.ClickDelete}
                        value={demande.id}
                      >
                        <i class="fa  fa-times" />
                        &nbsp; Delete
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
SecondStep.propTypes = {
  getDemandeById: PropTypes.func.isRequired,
  creacteDemande: PropTypes.func.isRequired,
  compte: PropTypes.object.isRequired,
  demande: PropTypes.object.isRequired,
  getcomptes: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  deleteDemande: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  compte: state.compte,
  demande: state.demande,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { creacteDemande, getcomptes, getDemandeById, deleteDemande }
)(SecondStep);
