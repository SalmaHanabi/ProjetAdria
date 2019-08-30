import React from "react";
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getcomptes,
  getdemandes,
  getDemandeById,
  updateDemande
} from "../../actions/projectactions";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
class List extends React.Component {
  componentDidMount() {
    this.props.getcomptes();
    this.props.getdemandes();
  }
  constructor() {
    super();

    this.onClick = this.ClickDetail.bind(this);
    this.state = {
      showModal: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  ClickDetail = e => {
    e.preventDefault();
    console.log("demande", e.target.value)
    this.props.getDemandeById(e.target.value, this.props.history);
    const demande = this.props.demande.demande;
    
  };
  ClickAbandon = e => {
    const { demande } = this.props.demande;

    this.close();
    const newDemande = {
      id: demande.id,
      motif: demande.motif,
      nombreCheque: demande.nombreCheque,
      status: "Abandoned",
      compte: demande.compte
    };

    console.log("History :", newDemande);
    this.props.updateDemande(newDemande, this.props.history);
  };

  open = e => {
    this.setState({ showModal: true });
    this.props.getDemandeById(e.target.value, this.props.history);
  };

  close() {
    this.setState({ showModal: false });
  }

  render() {
    const { demandes } = this.props.demande;
    const { demande } = this.props.demande;
    if (demandes.length !== 0) {
      return (
        <div>
          <link rel="apple-touch-icon" href="apple-icon.png" />
          <link rel="shortcut icon" href="favicon.ico" />
          <link
            rel="stylesheet"
            href="vendors/bootstrap/dist/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="vendors/font-awesome/css/font-awesome.min.css"
          />
          <link
            rel="stylesheet"
            href="vendors/themify-icons/css/themify-icons.css"
          />
          <link
            rel="stylesheet"
            href="vendors/flag-icon-css/css/flag-icon.min.css"
          />
          <link
            rel="stylesheet"
            href="vendors/selectFX/css/cs-skin-elastic.css"
          />
          <link rel="stylesheet" href="vendors/jqvmap/dist/jqvmap.min.css" />
          <link rel="stylesheet" href="assets/css/style.css" />

          

          <div className="content mt-3">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">My Requests</strong>
                    </div>
                    <div className="card-body">
                      <table
                        id="bootstrap-data-table-export"
                        className="table table-striped table-bordered"
                      >
                      <thead>
                          <tr>
                            <th>Account Number</th>
                            <th>Request's Date</th>
                            <th>Pattern</th>
                            <th>Checkbook's Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {demandes.map(demande => (
                            <tr key={demande.id}>
                              <td>{demande.compte.numCompte} </td>
                              <td>{demande.dateCreation} </td>
                              <td> {demande.motif} </td>
                              <td>{demande.nombreCheque}</td>
                              <td>
                                {demande.status === "Abandoned" && (
                                  <span class="h6 text-danger mb-0 pt-3">
                                    <strong>{demande.status}</strong>{" "}
                                  </span>
                                )}
                                {demande.status === "Registred" && (
                                  <span class="h6 text-info mb-0 pt-3">
                                    <strong>{demande.status}</strong>{" "}
                                  </span>
                                )}
                                {demande.status === "Signed" && (
                                  <span class="h6 text-success mb-0 pt-3">
                                    <strong>{demande.status}</strong>{" "}
                                  </span>
                                )}
                              </td>
                              <td>
                                <button
                                  class="btn btn-secondary btn-sm"
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#mediumModal"
                                  onClick={this.ClickDetail}
                                  value={demande.id}
                                >
                                  <i class="fa fa-info" />
                                  &nbsp; Detail
                                </button>
                                &nbsp;&nbsp;
                                {demande.status === "Signed" && (
                                  <Link to={`/updateRequest/${demande.id}`}>
                                    <button
                                      type="button"
                                      class="btn btn-info btn-sm"
                                      disabled
                                    >
                                      <i class="fa fa-edit" />
                                      &nbsp; Update
                                    </button>
                                  </Link>
                                )}{" "}
                                {demande.status !== "Signed" && (
                                  <Link to={`/updateRequest/${demande.id}`}>
                                    <button
                                      type="button"
                                      class="btn btn-info btn-sm"
                                    >
                                      <i class="fa fa-edit" />
                                      &nbsp; Update
                                    </button>
                                  </Link>
                                )}{" "}
                                &nbsp;&nbsp;
                                {demande.status === "Registred" && (
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    onClick={this.open}
                                    value={demande.id}
                                  >
                                    <i class="fa fa-exclamation" />
                                    &nbsp; Abandoned
                                  </button>
                                )}{" "}
                                {demande.status === "Signed" && (
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    onClick={this.open}
                                    value={demande.id}
                                    disabled
                                  >
                                    <i class="fa fa-exclamation" />
                                    &nbsp; Abandoned
                                  </button>
                                )}{" "}
                                {demande.status === "Abandoned" && (
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    onClick={this.open}
                                    value={demande.id}
                                    disabled
                                  >
                                    <i class="fa fa-exclamation" />
                                    &nbsp; Abandoned
                                  </button>
                                )}{" "}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="mediumModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="mediumModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="mediumModalLabel">
                    Request Details
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
                <div class="modal-body">
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
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
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
                  Confirm Abandon
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
                <p>Are you sure to abandon this Request?</p>
              </Modal.Body>

              <Modal.Footer>
                <button onClick={this.ClickAbandon} class="btn btn-danger">
                  Yes
                </button>
                <button onClick={this.close} class="btn btn-secondary">
                  No
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <link rel="apple-touch-icon" href="apple-icon.png" />
          <link rel="shortcut icon" href="favicon.ico" />
          <link
            rel="stylesheet"
            href="vendors/bootstrap/dist/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="vendors/font-awesome/css/font-awesome.min.css"
          />
          <link
            rel="stylesheet"
            href="vendors/themify-icons/css/themify-icons.css"
          />
          <link
            rel="stylesheet"
            href="vendors/flag-icon-css/css/flag-icon.min.css"
          />
          <link
            rel="stylesheet"
            href="vendors/selectFX/css/cs-skin-elastic.css"
          />
          <link rel="stylesheet" href="vendors/jqvmap/dist/jqvmap.min.css" />
          <link rel="stylesheet" href="assets/css/style.css" />


          <div class="card-body">
            <div class="sufee-alert alert with-close alert-danger alert-dismissible fade show">
              No Requests!!
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

List.propTypes = {
  compte: PropTypes.object.isRequired,
  getcomptes: PropTypes.func.isRequired,
  demande: PropTypes.object.isRequired,
  getdemande: PropTypes.func.isRequired,
  getDemandeById: PropTypes.func.isRequired,
  updateDemande: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  demande: state.demande,
  compte: state.compte,
  numCompte: state.numCompte
});

export default connect(
  mapStateToProps,
  { getcomptes, getdemandes, getDemandeById, updateDemande }
)(List);
