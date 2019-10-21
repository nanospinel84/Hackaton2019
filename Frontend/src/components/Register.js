import React from "react";
import { Link } from 'react-router-dom'
import "./Login.css";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  request: operation => {
  }
});

const registerQuery = gql`
mutation user($userName: String!, $userEmail:String!, $userPass: String!) {
  createCompany(name: $userName, email:$userEmail, password: $userPass){
  _id,
  name,
  email,
  password
}
}
`;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      userPass: ""
    };
  }

  handleInputChange(event) {
    console.log(event)
    if (event.target.name === 'name') {
      this.setState({ userName: event.target.value });
    } else if (event.target.name === 'email') {
      this.setState({ userEmail: event.target.value });
    } else if (event.target.name === 'password') {
      this.setState({ userPass: event.target.value });
    }
  }

  registrar() {
    if (this.state.userName !== "" && this.state.userPass !== "" && this.state.userEmail !== "") {
      this.makeRegisterQuery()
    } else {
      console.log('ERROOOOR, ALGUN CAMPO ESTA VACIOOO MK!!')
    }
  }

  makeRegisterQuery() {
    client.mutate({
      mutation: registerQuery,
      variables: {
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        userPass: this.state.userPass
      }
    })
      .then(res => this.manageQueryRegisterResult(res.data.createCompany));
  }

  manageQueryRegisterResult(res2) {
    console.log(res2)
    alert("Registro Exitoso");
  }



  render() {
    return (
      <div class="w3-display-middle" >

        <div class="w3-row-padding w3-white" style={{ margin: "0 -16px", opacity: 0.8 }}>

          <br></br>

          <div class="w3-content w3-center ">
            <h1 style={{ color: "#4674b9"}}>Registro</h1>
          </div>

          <hr />

          <div class="w3-container" style={{ padding: "0.01em 15%" }}>
            <div class="wrap-input100 validate">
              <input
                class="input100"
                name="name"
                placeholder="Nombre de la empresa"
                onChange={this.handleInputChange.bind(this)}
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-id-card" aria-hidden="true"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input"
            >
              <input
                class="input100"
                name="email"
                placeholder="Email de la empresa"
                onChange={this.handleInputChange.bind(this)}
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input"
            >
              <input
                class="input100"
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                onChange={this.handleInputChange.bind(this)}
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div class="container-login100-form-btn">
              <button
                class="login100-form-btn botonlogin"
                name="funcion"
                value="1"
                onClick={this.registrar.bind(this)}
              >
                Registrar
                </button>
            </div>

            <br/>

            <div class="text-center p-t-12">
              <span class="txt1">¿Ya tienes cuenta? Ingresa </span>
              <Link to="/">Aqui</Link>
            </div>
          </div>

          <br />
          <hr />
          <div class="text-center p-t-5 ">
            <span class="txt1">Por crear la cuenta, debes aceptar los Terminos y Condiciones</span>
          </div>

          <br></br>
        </div>
      </div>
    );
  }
}

export default Register;
