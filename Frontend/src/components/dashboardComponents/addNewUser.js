import React from "react";
import ApolloClient, { gql } from "apollo-boost";
import "../Login.css";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  request: operation => { }
});

const registerQuery = gql`
  mutation user(
    $userName: String!
    $userEmail: String!
    $userCedula: String!
    $registradoPor: String!
  ) {
    createUser(
      name: $userName
      email: $userEmail
      cedula: $userCedula
      registradoPor: $registradoPor
    ) {
      _id
      name
      email
      cedula
      registradoPor
    }
  }
`;

class addNewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      userCedula: "",
      registradoPor: this.props.nameCompany
    };
  }

  handleInputChange(event) {
    console.log(event);
    if (event.target.name === "name") {
      this.setState({ userName: event.target.value });
    } else if (event.target.name === "email") {
      this.setState({ userEmail: event.target.value });
    } else if (event.target.name === "cedula") {
      this.setState({ userCedula: event.target.value });
    }
  }

  registrar() {
    if (
      this.state.userName !== "" &&
      this.state.userEmail !== "" &&
      this.state.userCedula !== ""
    ) {
      this.makeRegisterQuery();
    } else {
      console.log("ERROOOOR, ALGUN CAMPO ESTA VACIOOO MK!!");
    }
  }

  makeRegisterQuery() {
    client
      .mutate({
        mutation: registerQuery,
        variables: {
          userName: this.state.userName,
          userEmail: this.state.userEmail,
          userCedula: this.state.userCedula,
          registradoPor: this.state.registradoPor
        }
      })
      .then(res => this.manageQueryRegisterResult(res.data.createUser));
  }

  manageQueryRegisterResult(res2) {
    console.log(res2);
    alert("nombre: " + res2.name + "   email:   " + res2.email);
    this.props.history.push(`/usuarios`);
  }

  render() {
    console.log(this.props.idUser);
    return (
      <div class="w3-container w3-content w3-center w3-padding-64">
        <div class="w3-card w3-round w3-white">
          <div class="w3-container">
            <span class="login100-form-title"></span>

            <div class="wrap-input100 validate">
              <input
                class="input100"
                name="name"
                placeholder="Nombre del usuario"
                onChange={this.handleInputChange.bind(this)}
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-id-card" aria-hidden="true"></i>
              </span>
            </div>

            <div class="wrap-input100 validate-input">
              <input
                class="input100"
                name="email"
                placeholder="Email del usuario"
                onChange={this.handleInputChange.bind(this)}
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div class="wrap-input100 validate-input">
              <input
                class="input100"
                name="cedula"
                placeholder="Cedula del usuario"
                onChange={this.handleInputChange.bind(this)}
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-address-card" aria-hidden="true"></i>
              </span>
            </div>

            <div class="wrap-input100 validate-input">
              <input
                class="input100"
                name="registradoPor"
                placeholder={this.state.registradoPor}
                value={this.state.registradoPor}
                disabled
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-hospital" aria-hidden="true"></i>
              </span>
            </div>

            <div class="container-login100-form-btn">
              <button
                class="login100-form-btn botonlogin"
                name="funcion"
                value="1"
                onClick={this.registrar.bind(this)}
              >
                Registrar usuario
          </button>
            </div>
            <br />
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default addNewUser;
