import React from "react";
import { Link } from "react-router-dom";

const CreateButton = () => {
  return (
    <React.Fragment>
      <Link to="/AddDemande">
        <button type="button" class="btn btn-secondary">
          <i class="fa fa-plus" />
          &nbsp; Add Request
        </button>
      </Link>
    </React.Fragment>
  );
};
export default CreateButton;
