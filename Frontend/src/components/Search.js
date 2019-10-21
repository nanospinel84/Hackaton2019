import React from "react";
import { Link } from 'react-router-dom'
import "./Login.css";
import Idea from "./images/idea.png";
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

const queryUserCertificates = gql`
  query certificate($userId: String!) {
    getCertificateById(_id: $userId) {
      _id
      type
      description
      medic
      companyName
      hash
    }
  }
`;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      userPass: "",
      certVerific: false
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
  validar() {
    if (this.state.userName !== "") {
      console.log(this.state.userName);
      this.searchCert();
    } else {
      console.log('ERROOOOR, ALGUN CAMPO ESTA VACIOOO MK!!')
    }
  }

  searchCert() {
    client
      .query({
        query: queryUserCertificates,
        variables: {
          userId: this.state.userName
        }
      })
      .then(res => this.makeSearch(res));
  }

  makeSearch(res) {
    if(res.data.getCertificateById.length===1){
      console.log(res.data.getCertificateById);

      this.setState({ certVerific: true });
      console.log(this.state.certVerific);
    }else{
      this.setState({ certVerific: false });
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
      .then(res => this.manageQueryRegisterResult(res.data.createUser));
  }

  manageQueryRegisterResult(res2) {
    console.log(res2)
    alert("nombre: " + res2.name + "   clave:   " + res2.pasword);
  }

  certificadDiv(){
    if(this.state.certVerific){
      console.log("entre");
      return (
        <div>
          <h1>HOLA</h1>
        </div>
      );
    }
  }



  render() {
    
    
    return (
      
      <div class="w3-display-middle" >


        <div class="w3-row-padding w3-white" style={{ margin: "0 -16px", opacity: 0.8 }}>
          <br></br><br></br>

          <div class="w3-content w3-center">
            <img src={Idea} style={{ width: "50%" }} alt="Northern Lights" class="w3-margin-bottom" />
            <br></br>
            <h1 style={{ color: "#46b9aa" }}>Consulta</h1>
          </div>

          <br></br>
          <br></br>

          <div class="w3-container" style={{ padding: "0.01em 15%" }}>

            <div
              class="wrap-input100 validate"
            >
              <input
                class="input100"
                name="name"
                placeholder="Hash de Validadcion"
                onChange={this.handleInputChange.bind(this)}
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-id-card" aria-hidden="true"></i>
              </span>
            </div>


            <div class="container-login100-form-btn">
              <button
                class="login100-form-btn botonlogin"
                name="funcion"
                value="1"
                onClick={this.validar.bind(this)}
              >
                Validar
                </button>
            </div>

            <div class="text-center p-t-12">
              <span class="txt1">¿Ya tienes cuenta? Ingresa </span>
              <Link to="/">Aqui</Link>
            </div>
            <br />
            <hr />

            <div>
              {this.certificadDiv.bind(this)}
            </div>


            <br></br><br></br>
          </div>

        </div>
      </div>

      
    );

    
  }
}

export default Register;
