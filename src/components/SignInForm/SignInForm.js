import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";

import "./SignInForm.scss";

import { signInSuccess, postUser } from "../../actions/signInActions";

export class SignInForm extends Component {
  state = { errorMessage: null };

  handleSignIn = bool => {
    this.props.signInSuccess(bool);
  };

  // componentDidMount() {
  //   this.temp();
  // }

  // temp = response => {
  //   console.log("calling temp response: ", response);
  //   if (response) {
  //     console.log("yes response!!");
  //     return <MapContainer />;
  //   } else {
  //     return (
  //       <div className="container-fluid signInForm-container">
  //         <div className="container">
  //           <div className="card text-center rounded">
  //             <img className="card-img-top" src="" alt="" />
  //             <div className="card-body">
  //               <h1 className="card-title">
  //                 Welcome to
  //                 <br />
  //                 map-share-api!
  //               </h1>
  //               <p className="card-text">This is the best webapp ever.</p>

  //               <GoogleLogin
  //                 className="btn"
  //                 clientId="249486761636-7v9e2d4eopnh2hcedo5fa3uu0uqvg7t1.apps.googleusercontent.com"
  //                 buttonText="Login with Google!"
  //                 onSuccess={this.temp}
  //                 onFailure={this.temp}
  //                 isSignedIn={true}
  //               />
  //               {this.state.errorMessage ? (
  //                 <div className="error-message">
  //                   Please sign in to use map-share-api
  //                 </div>
  //               ) : null}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // };

  responseGoogle = response => {
    if (response.error) {
      this.setState({ errorMessage: response.error });
      this.handleSignIn(false, response.error);
    } else {
      this.handleSignIn(true);
      this.props.postUser(response.w3);
    }
  };

  render() {
    return (
      <div className="container-fluid signInForm-container">
        <div className="container">
          <div className="card text-center rounded">
            <img className="card-img-top" src="" alt="" />
            <div className="card-body">
              <h1 className="card-title">
                Welcome to
                <br />
                Map-Share!
              </h1>
              <p className="card-text">This is the best webapp ever.</p>

              <GoogleLogin
                className="btn"
                clientId="249486761636-7v9e2d4eopnh2hcedo5fa3uu0uqvg7t1.apps.googleusercontent.com"
                buttonText="Login with Google!"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                isSignedIn={true}
              />
              {this.state.errorMessage ? (
                <div className="error-message">
                  Please sign in to use Map-Share
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInSuccess: bool => dispatch(signInSuccess(bool)),
    postUser: data => dispatch(postUser(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);

/*<div className="container-fluid login-button">
<div className="col-md-12 text-center">
<button id="singlebutton" name="singlebutton" className="btn btn-primary">
  <GoogleLogin
    clientId="249486761636-7v9e2d4eopnh2hcedo5fa3uu0uqvg7t1.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    isSignedIn={true}
  />
</button>
</div>
</div>*/

// render={renderProps => (
//   <button className="btn btn-primary" onClick={renderProps.onClick}>This is my custom Google button</button>
// )}
