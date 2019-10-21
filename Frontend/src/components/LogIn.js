import "./Login.css";
import React from "react";
import { Link } from "react-router-dom";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  request: operation => { }
});

const query = gql`
  query company($userName: String!, $userPass: String!) {
    getUserCompany(email: $userName, password: $userPass) {
      _id
      name
      email
    }
  }
`;

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPass: ""
    };
  }

  handleUserName(event) {
    this.setState({ userName: event.target.value });
  }

  handleUserPassword(event) {
    this.setState({ userPass: event.target.value });
  }

  ingresar() {
    this.makeLogInQuery();
  }

  makeLogInQuery() {
    client
      .query({
        query: query,
        variables: {
          userName: this.state.userName,
          userPass: this.state.userPass
        }
      })
      .then(res => this.manageQueryResult(res));
  }

  manageQueryResult(res) {
    var resultData = [];
    resultData = res.data.getUserCompany;
    if (resultData.length > 0) {
      this.props.history.push(`/DashBoard/${resultData[0]["_id"]}`);
    } else {
      console.log("USUARIO NO EXISTE");
    }
  }

  render() {
    return (
      <div className="w3-display-middle">

        <div class="w3-row-padding w3-white " style={{ margin: "0 -16px", opacity: 0.8 }}>
          <br></br>

          <div class="w3-content w3-center ">
             <h1 style={{ color: "#4674b9" }}>Expertix</h1>
          </div>

          <hr />

          <div class="w3-container" style={{ padding: "0.01em 15%" }}>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Email del usuario"
                onChange={this.handleUserName.bind(this)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
            <div className="wrap-input100 validate-input" data-validate="La contraseña no es válida">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={this.handleUserPassword.bind(this)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button
                className="login100-form-btn botonlogin"
                onClick={this.ingresar.bind(this)}
              >
                Iniciar
                </button>
            </div>
            <hr />
            <div class="container">
              <button class="btn w3-hover-white"><Link to="/Register" > Regístrate</Link></button>
              <button class="btn w3-hover-white"><Link to="/Search" > Consulta </Link></button>
            </div>

          </div>
          <br></br>
          <br></br>


        </div>

      </div>
    );
  }
}

export default LogIn;
