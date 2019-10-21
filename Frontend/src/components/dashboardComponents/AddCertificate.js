import React from "react";
import ApolloClient, { gql } from "apollo-boost";
import "../Login.css";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  request: operation => { }
});

const registerQuery = gql`
  mutation certificate(
    $type: String!
    $userId: String!
    $medic: String!
    $description: String!
    $companyName: String!
    $hash: String!
  ) {
    createCertificate(
      type: $type
      userId: $userId
      description: $description
      medic: $medic
      companyName: $companyName
      hash: $hash
    ) {
      _id
      type
      userId
      description
      medic
      companyName
    }
  }
`;

class AddCertificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      userId: "",
      description: "",
      medic: "",
      companyName: "",
      hash: "",
      registradoPor: this.props.nameCompany
    };
  }

  handleInputChange(event) {
    if (event.target.name === "identificacion") {
      this.setState({ userId: event.target.value });
    } else if (event.target.name === "descripcion") {
      this.setState({ description: event.target.value });
    } else if (event.target.name === "medico") {
      this.setState({ medic: event.target.value });
    }
    this.setState({ hash: "3E3DDASD123DSA1" });
  }

  registrar() {
    if (
      this.state.userId !== "" &&
      this.state.description !== "" &&
      this.state.medic !== ""
    ) {
      var typeValue = this.refs.certificadoType.value;
      console.log(typeValue);
      var actualTypeValue = "";
      if (typeValue === "Laboral") {
        actualTypeValue = "Certificado Laboral";
      } else if (typeValue === "Estudiantil") {
        actualTypeValue = "Certificado Estudiantil";
      } 
      console.log(actualTypeValue);
      this.setState({ type: actualTypeValue }, () => {
        this.makeRegisterQuery();
      });
    } else {
      console.log("ERROOOOR, ALGUN CAMPO ESTA VACIOOO MK!!");
    }
  }

  makeRegisterQuery() {
    console.log(this.state.type);
    client
      .mutate({
        mutation: registerQuery,
        variables: {
          type: this.state.type,
          userId: this.state.userId,
          medic: this.state.medic,
          description: this.state.description,
          companyName: this.state.registradoPor,
          hash: this.state.hash
        }
      })
      .then(res => this.manageQueryRegisterResult(res.data.createCertificate));
  }

  manageQueryRegisterResult(res2) {
    console.log(res2);
    alert("tipo: " + res2.type + "   descripción:   " + res2.description);
    this.props.history.push(`/certificaciones`);
  }

  render() {
    return (
      <div class="w3-container w3-content w3-center w3-padding-64">
        <div class="w3-card w3-round w3-white">
          <div class="w3-container">
            <div class="login10-form">
              <hr />
              <h2>Nuevo Certificado</h2>
              <text> Elija el tipo de certificado que desea generar</text>
              <div class="wrap-input100 validate-input">
                
                <select ref="certificadoType" name="certificado" className="input100">
                  <option value="Laboral">Laboral</option>
                  <option value="Estudiantil">Estudiantil</option>
                </select>
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-wpexplorer" aria-hidden="true"></i>
                </span>
              </div>

              <div class="wrap-input100 validate-input">
                <input
                  class="input100"
                  name="identificacion"
                  placeholder="Numero de identificación"
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
                  name="descripcion"
                  placeholder="Descripción del certificado"
                  onChange={this.handleInputChange.bind(this)}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-file-text-o" aria-hidden="true"></i>
                </span>
              </div>

              <div class="wrap-input100 validate-input">
                <input
                  class="input100"
                  name="medico"
                  placeholder="Persona que certifica"
                  onChange={this.handleInputChange.bind(this)}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i>
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
                  Generar Certificado
          </button>
              </div>
              <br />
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCertificate;
