import React from "react";
import "../styles/reduction.scss";
import "./user.css";
import ApolloClient, { gql } from "apollo-boost";

var client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  request: operation => { }
});

var certificates = [];

const query = gql`
  query certificate($companyName: String!) {
    allCertificatesFromCompany(companyName: $companyName) {
      _id
      type
      description
      userId
      medic
      companyName
      hash
    }
  }
`;

class CertificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    };
    this.componentDidMount();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    client = new ApolloClient({
      uri: "http://localhost:3000/graphql",
      request: operation => { }
    });
    client
      .query({
        query: query,
        variables: {
          companyName: this.props.nameCompany
        }
      })
      .then(res => this.manageQueryResult(res));
  }

  manageQueryResult(res) {
    certificates = res.data.allCertificatesFromCompany;
    this.forceUpdate();
  }

  addCertificate() {
    this.props.history.push(`/nuevoCertificado`);
  }

  render() {
    return (
      <div>
        <div class="w3-card w3-round w3-white" style={{ opacity: 0.8, height: "100%"}}>
          <div class="w3-container w3-content w3-center w3-padding-16" style={{ display: "grid"}} id="band">
            <h2 class="w3-wide">Certificaciones</h2>
            <button className="button w3-hover-red" onClick={this.addCertificate.bind(this)}>
              Generar
          </button>

          </div>
        </div>

        <br></br>

        <div class="container">
          <div class="w3-twothird">
            {certificates.map(
              ({ type, description, medic, companyName }, index) => (
                <div class="w3-container w3-card w3-white w3-margin-bottom">
                  <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>{type}</h2>
                  <div class="w3-container">
                    <h5 class="w3-opacity"><b>{companyName}</b></h5>
                    <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i> {medic} <span class="w3-tag w3-teal w3-round">Identificacion</span></h6>
                    <p> {description} </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CertificationPage;
