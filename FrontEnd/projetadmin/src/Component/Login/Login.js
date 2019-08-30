import React from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions"
import jwt_decode from "jwt-decode";
import classnames from "classnames"

class Login extends React.Component{
    constructor() {
        super();
        this.state = {
          username: "",
          password: "",
          errors: {}
        };

       this.onChange = this.onChange.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
      }
      componentWillReceiveProps(nextProps) {
        if (nextProps.security.validToken) {
          this.props.history.push("/List");
        }
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

      onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
          username: this.state.username,
          password: this.state.password
        };
    
        this.props.login(LoginRequest,this.props.history);
      }
     
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    render(){
        const { errors } = this.state;
        return( 
        <div class="sufee-login d-flex align-content-center flex-wrap">
        <div class="container">
            <div class="login-content">
                <div class="login-logo">
                    <a href="index.html">
                        <img class="align-content" src="images/logo.png" alt=""/>
                    </a>
                </div>
                <div class="login-form">
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" 
                               className={classnames("form-control", {
                                "is-invalid": errors.username
                              })}
                              placeholder=" Username"
                              name="username"
                              value={this.state.username}
                              onChange={this.onChange} 
                            />
                            {errors.password && (
                             <div className="invalid-feedback">{errors.username}</div>   )}
                        </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" 
                                 name="password"
                                 className={classnames("form-control", {
                                    "is-invalid": errors.password
                                  })}
                                 placeholder="Password"
                                 value={this.state.password}
                                 onChange={this.onChange} 
                                />
                                 {errors.password && (
                             <div className="invalid-feedback">{errors.password}</div>   )}
                        </div>
                               
                                <button type="submit" class="btn btn-danger btn-flat m-b-30 m-t-30">Sign in</button>
                               
                    </form>
                </div>
            </div>
        </div>
    </div>)
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    { login }
  )(Login);
  