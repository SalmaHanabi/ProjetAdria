import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import Step1 from "../AddDesign/Step1";
import {
  updateDemande,
  getcomptes,
  getDemandeById,
  getAbonnee
} from "../../actions/projectactions";
import classnames from "classnames";
import AddLinks from "../Links/AddLinks";

class ThirdStep extends Component {
  componentDidMount() {
    //recuperation de l'id de la demande
    const id  = this.props.id;
    this.props.getcomptes();
    this.props.getDemandeById(id, this.props.history);
    this.props.getAbonnee(this.props.history);
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: "",
      motif: "",
      status: "Signed",
      nombreCheque: "",
      compte: {
        abonne: {},
        beneficiaire: "",
        numCompte: "",
        soldeComptable: "",
        soldeCompte: ""
      },
      password: "",
      showModal: false,
      objError: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e)
  {
    const { abonnee } = this.props.abonnee;
    const { demande } = this.props.demande;
    var bcrypt = require('bcryptjs');
          bcrypt.compare(this.state.password,demande.compte.abonne.password,(err, res)=>{
            if (res) {
              this.setState({
                id: demande.id,
                motif: demande.motif,
                status: "Signed",
                nombreCheque: demande.nombreCheque,
                compte: demande.compte
              });
              this.state.compte = demande.compte;
              console.log("Compte", this.state.compte);
              const newDemande = {
                id: demande.id,
                motif: demande.motif,
                status: "Signed",
                nombreCheque: demande.nombreCheque,
                compte: this.state.compte
              };
              this.close();
              this.props.updateDemande(newDemande, this.props.history);
            } else {
              this.setState({
                objError: "Error!! Wrong Password!"
              });
            }
    });
    e.preventDefault();
   
    
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  
  render() {
    const { demande } = this.props.demande;
    return (
      <div>
        <AddLinks />
      
        <div class="content mt-4">
          <div class="animated fadeIn">
            <br />
            <br />
            <div class="row">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <div class="col-md-8">
                <aside class="card">
                  <div class="card-header user-header alt bg-dark">
                    <div class="media">
                      <div class="media-body">
                        <h2 class="text-light display-6">Request Details</h2>
                        <p>Informations</p>
                      </div>
                    </div>
                  </div>

                  <table className="table table-striped table-bordered">
                    <tbody key={demande.id}>
                      <tr>
                        <th>Account Number of Request</th>
                        <td>
                          {demande.compte ? demande.compte.numCompte : "0"}
                        </td>
                      </tr>
                      <tr>
                        <th>Pattern of Request</th>
                        <td>{demande.motif}</td>
                      </tr>
                      <tr>
                        <th>Date of Request</th>
                        <td>{demande.dateCreation}</td>
                      </tr>
                      <tr>
                        <th>Checkbook Number</th>
                        <td>{demande.nombreCheque}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>{demande.status} </td>
                      </tr>
                    </tbody>
                  </table>

                  <button class="btn btn-secondary" onClick={this.open}>
                    <i class="fa fa-check-square" />
                    &nbsp; Sign Request
                  </button>
                  <Link to="/ListAll">
                  <button class="btn btn-secondary">
                    <i class="fa fa-check-square" />
                    &nbsp; Back To List
                  </button>
                  </Link>
                </aside>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Modal
            className="modal-container"
            show={this.state.showModal}
            onHide={this.close}
            animation={true}
            bsSize="small"
          >
            <div class="modal-header">
              <h5 class="modal-title" id="smallmodalLabel">
                Your Password
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <Modal.Body>
              <input
                className={classnames("form-control", {
                  "is-invalid": this.state.objError
                })}
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.onChange.bind(this)}
              />
              {this.state.objError && (
                <div className="invalid-feedback">{this.state.objError}</div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <button onClick={this.onSubmit} class="btn btn-danger">
                Sign
              </button>
              <button onClick={this.close} class="btn btn-secondary">
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

ThirdStep.propTypes = {
  getDemandeById: PropTypes.func.isRequired,
  updateDemande: PropTypes.func.isRequired,
  compte: PropTypes.object.isRequired,
  demande: PropTypes.object.isRequired,
  getcomptes: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getAbonnee: PropTypes.func.isRequired,
  abonnee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  compte: state.compte,
  demande: state.demande,
  errors: state.errors,
  abonnee: state.abonnee
});

export default connect(
  mapStateToProps,
  { updateDemande, getcomptes, getDemandeById, getAbonnee }
)(ThirdStep);
