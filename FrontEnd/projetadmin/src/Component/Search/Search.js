import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as moment from "moment";
import {
  getcomptes,
  getdemandes,
  getDemandeByCompte,
  getDemandeByCompteAndStatut,
  getDemandeByStatut,
  getDemandeByDate,
  getDemandeByDateetStatut,
  getDemandeByDateEtCompte,
  getDemandeByDateEtCompteEtStatut
} from "../../actions/projectactions";

class Search extends Component {
  componentDidMount() {
    this.props.getcomptes();
    this.props.getdemandes();
  }
  constructor() {
    super();
    //state pour les champs de recherche: Date, NumAccount et Statut
    this.state = {
      numCompte: "",
      date: "",
      statut: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    //creation de l'objet recherche qui sera transmis à l'action
    const recherche = {
      numCompte: this.state.numCompte,
      date: this.state.date,
      statut: this.state.statut
    };
    //Recherche par numCompte
    if (
      recherche.numCompte !== "" &&
      recherche.statut === "" &&
      recherche.date === ""
    ) {
      this.props.getDemandeByCompte(recherche.numCompte, this.props.history);
    }

    //Recherche par statut
    if (
      recherche.numCompte === "" &&
      recherche.statut !== "" &&
      recherche.date === ""
    ) {
      this.props.getDemandeByStatut(recherche.statut, this.props.history);
    }

    //Recherche par Statut et numCompte
    if (
      recherche.numCompte !== "" &&
      recherche.statut !== "" &&
      recherche.date === ""
    ) {
      this.props.getDemandeByCompteAndStatut(
        recherche.numCompte,
        recherche.statut,
        this.props.history
      );
    }

    //Recherche par Date
    if (
      recherche.numCompte === "" &&
      recherche.statut === "" &&
      recherche.date !== ""
    ) {
      this.props.getDemandeByDate(recherche.date, this.props.history);
    }

    //Recherche par Date et Statut
    if (
      recherche.numCompte === "" &&
      recherche.statut !== "" &&
      recherche.date !== ""
    ) {
      this.props.getDemandeByDateetStatut(
        recherche.statut,
        recherche.date,
        this.props.history
      );
    }

    //Recherche par Date et Compte
    if (
      recherche.numCompte !== "" &&
      recherche.statut === "" &&
      recherche.date !== ""
    ) {
      this.props.getDemandeByDateEtCompte(
        recherche.numCompte,
        recherche.date,
        this.props.history
      );
    }
    // Recherche par les 3 champs:

    if (
      recherche.numCompte !== "" &&
      recherche.statut !== "" &&
      recherche.date !== ""
    ) {
      this.props.getDemandeByDateEtCompteEtStatut(
        recherche.numCompte,
        recherche.date,
        recherche.statut,
        this.props.history
      );
    }

    if(
      recherche.numCompte == "" &&
      recherche.statut == "" &&
      recherche.date == ""
    )
    {
      this.props.getdemandes();
    }
  }
  

  render() {
    //remplissage de dropDown des NumAccounts
    const { comptes } = this.props.compte;

    return (
      <div class="card">
        <div class="card-header">
          <strong> Search Request(s)</strong>
        </div>
        <div class="card-body card-block">
          <br />
          <form onSubmit={this.onSubmit} class="form-horizontal">
            <div class="row form-group">
              <div class="form-group">
                <div classe="col col-sm-3">
                  <div class="input-group">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div>
                      <i class="fa fa-user" />
                    </div>
                    &nbsp;&nbsp;{" "}
                    <select
                      id="select"
                      class="input-sm form-control-sm form-control"
                      data-placeholder="Choose a Number..."
                      defaultValue={"-1"}
                      tabIndex="1"
                      name="numCompte"
                      onChange={this.onChange}
                    >
                      <option value="-1">Choose a number...</option>
                      {comptes.map(compte => (
                        <option value={compte.numCompte} key={compte.numCompte}>
                          {compte.numCompte}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div class="form-group">
                <div class=" input-sm input-group">
                  <div>
                    <i class=" fa fa-calendar" />
                  </div>
                  &nbsp;&nbsp;{" "}
                  <input
                    class="input-sm form-control-sm form-control"
                    type="Date"
                    name="date"
                    placeholder="Date of Request"
                    onChange={this.onChange}
                  />
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div class="form-group">
                <div classe="col col-sm-3">
                  <div class="input-group">
                    &nbsp;
                    <div>
                      <i class="fa fa-tasks" />
                    </div>
                    &nbsp;&nbsp;{" "}
                    <select
                      id="select"
                      class="input-sm form-control-sm form-control"
                      data-placeholder="Choose a Number..."
                      defaultValue={"-1"}
                      tabIndex="1"
                      name="statut"
                      onChange={this.onChange}
                    >
                      <option value="">Choose a status...</option>
                      <option value="Registred">Registred</option>
                      <option value="Signed">Signed</option>
                      <option value="Abandoned">Abandoned</option>
                    </select>
                  </div>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <button type="submit" class="btn btn-sm">
                  <i class="fa fa-search" />
                  &nbsp; Search Request(s)
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  compte: PropTypes.object.isRequired,
  getcomptes: PropTypes.func.isRequired,
  demande: PropTypes.object.isRequired,
  getdemande: PropTypes.func.isRequired,
  getDemandeByCompte: PropTypes.func.isRequired,
  getDemandeByCompteAndStatut: PropTypes.func.isRequired,
  getDemandeByStatut: PropTypes.func.isRequired,
  getDemandeByDate: PropTypes.func.isRequired,
  getDemandeByDateetStatut: PropTypes.func.isRequired,
  getDemandeByDateEtCompte: PropTypes.func.isRequired,
  getDemandeByDateEtCompteEtStatut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  compte: state.compte,
  demande: state.demande,
  numCompte: state.numCompte
});

export default connect(
  mapStateToProps,
  {
    getcomptes,
    getdemandes,
    getDemandeByCompte,
    getDemandeByStatut,
    getDemandeByCompteAndStatut,
    getDemandeByDate,
    getDemandeByDateetStatut,
    getDemandeByDateEtCompte,
    getDemandeByDateEtCompteEtStatut
  }
)(Search);
