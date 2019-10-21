import React, { Suspense } from "react";
import "../styles/reduction.scss";
import "./user.css";
import ApolloClient, { gql } from "apollo-boost";

var client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  request: operation => { }
});

var certificates = [];

const query = gql`
  query user($userId: String!) {
    getUserById(_id: $userId) {
      _id
      name
      email
      cedula
      registradoPor
    }
  }
`;

const queryUserCertificates = gql`
  query certificate($userId: String!) {
    getCertificateByUserId(userId: $userId) {
      _id
      type
      description
      medic
      companyName
      hash
    }
  }
`;

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params["id"],
      userName: "",
      userCedula: "",
      userEmail: "",
      userRegistradoPor: ""
    };
    this.componentDidMount();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    client
      .query({
        query: query,
        variables: {
          userId: this.state.userId
        }
      })
      .then(res => this.manageQueryResult(res));
  }

  consultCertificates() {
    client = new ApolloClient({
      uri: "http://localhost:3000/graphql",
      request: operation => { }
    });
    client
      .query({
        query: queryUserCertificates,
        variables: {
          userId: this.state.userCedula
        }
      })
      .then(res => this.manageQueryResultCertificates(res));
  }
  manageQueryResultCertificates(res) {
    console.log(res);
    certificates = res.data.getCertificateByUserId;
    this.forceUpdate();
  }

  manageQueryResult(res) {
    var user = res.data.getUserById[0];
    this.setState({ userName: user.name });
    this.setState({ userCedula: user.cedula });
    this.setState({ userEmail: user.email });
    this.setState({ userRegistradoPor: user.registradoPor });
    this.consultCertificates();
  }

  render() {
    return (

      <Suspense>

        <div class="w3-card w3-round w3-white" style={{ opacity: 0.8}}>
          <div class="w3-container w3-content w3-center w3-padding-64" style={{ maxWidth: "800px" }} id="band">
            <h2 class="w3-wide">Perfil</h2>

          </div>
        </div>
        <br></br>
        <div class="w3-row-padding">

          <div class="w3-third">
            <div class="w3-white w3-text-grey w3-card-4">
              <div class="w3-display-container">
                <img src="https://www.w3schools.com//w3images/avatar_hat.jpg" style={{ width: "100%" }} alt="Avatar" />
                <div class="w3-display-bottomleft w3-container w3-text-black">
                  <h2>{this.state.userName}</h2>
                </div>
              </div>
              <div class="w3-container">
                <br></br>
                <p><i class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i>{this.state.userRegistradoPor}</p>
                <p><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>{this.state.userCedula}</p>
                <p><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>{this.state.userEmail}</p>
                <p><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>{this.state.userId}</p>
                <hr></hr>

                <p class="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Skills</b></p>
                <p>Adobe Photoshop</p>
                <div class="w3-light-grey w3-round-xlarge w3-small">
                  <div class="w3-container w3-center w3-round-xlarge w3-teal" style={{ width: "90%" }}>90%</div>
                </div>
                <p>Photography</p>
                <div class="w3-light-grey w3-round-xlarge w3-small">
                  <div class="w3-container w3-center w3-round-xlarge w3-teal" style={{ width: "80%" }}>
                    <div class="w3-center w3-text-white">80%</div>
                  </div>
                </div>
                <br></br>

              </div>
            </div>

          </div>

          <hr />

          <div class="w3-twothird">





            {certificates.map(
              ({ type, description, medic, companyName }, index) => (
                <div class="w3-container w3-card w3-white w3-margin-bottom">
                  <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>{type}</h2>
                  <div class="w3-container">
                    <h5 class="w3-opacity"><b>{companyName}</b></h5>
                    <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i> {medic} <span class="w3-tag w3-teal w3-round">Medico</span></h6>
                    <p> {description} </p>
                    <hr></hr>
                  </div>
                </div>
              )
            )}






          </div>
        </div>

      </Suspense>
    );
  }
}
export default UserProfilePage;
