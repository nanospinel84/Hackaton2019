import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import PageSpinner from "./dashboardUtils/PageSpinner";
import "./styles/reduction.scss";
import componentQueries from "react-component-queries";
import ApolloClient, { gql } from "apollo-boost";
import LogIn from "../components/LogIn";
import Register from "../components/Register";

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

const UsersPage = React.lazy(() => import("./dashboardComponents/UsersPage"));


const CertificationsPage = React.lazy(() =>
  import("./dashboardComponents/CertificationsPage")
);
const HistoryPage = React.lazy(() =>
  import("./dashboardComponents/HistoryPage")
);
const AddNewUserPage = React.lazy(() =>
  import("./dashboardComponents/addNewUser")
);
const UserProfilePage = React.lazy(() =>
  import("./dashboardComponents/UserProfilePage")
);
const AddCertificate = React.lazy(() =>
  import("./dashboardComponents/AddCertificate")
);

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  request: operation => {}
});

const getCompanyQuery = gql`
  query company($id: String!) {
    getCompanyById(_id: $id) {
      _id
      name
    }
  }
`;

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params["id"],
      userName: ""
    };
    this.componentDidMount();
  }

  componentDidMount() {
    client
      .query({
        query: getCompanyQuery,
        variables: {
          id: this.state.userId
        }
      })
      .then(res => this.manageQueryResult(res));
  }

  manageQueryResult(res) {
    console.log(res.data.getCompanyById[0]);
    var resultData = res.data.getCompanyById[0].name;
    this.setState({ userName: resultData });
  }

  render() {
    return (
     <BrowserRouter basename={getBasename()}>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/Register" component={Register} />
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route path="/perfilUsuario/:id/" component={UserProfilePage} />
                
                <Route
                  path="/usuarios"
                  render={props => (
                    <UsersPage
                      idUser={this.state.userId}
                      nameCompany={this.state.userName}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/nuevoCertificado"
                  render={props => (
                    <AddCertificate
                      idUser={this.state.userId}
                      nameCompany={this.state.userName}
                      {...props}
                    />
                  )}
                />
                
                <Route
                  path="/certificaciones"
                  render={props => (
                    <CertificationsPage
                      idUser={this.state.userId}
                      nameCompany={this.state.userName}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/historial"
                  render={props => (
                    <HistoryPage
                      idUser={this.state.userId}
                      nameCompany={this.state.userName}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/nuevoUsuario"
                  render={props => (
                    <AddNewUserPage
                      idUser={this.state.userId}
                      nameCompany={this.state.userName}
                      {...props}
                    />
                  )}
                />
                
              </React.Suspense>
            </MainLayout>
            <Redirect to="/usuarios" />
          </Switch>
        </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: "xs" };
  }

  if (576 < width && width < 767) {
    return { breakpoint: "sm" };
  }

  if (768 < width && width < 991) {
    return { breakpoint: "md" };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: "lg" };
  }

  if (width > 1200) {
    return { breakpoint: "xl" };
  }

  return { breakpoint: "xs" };
};

export default componentQueries(query)(DashBoard);
