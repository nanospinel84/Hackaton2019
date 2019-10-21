import Content from "./Content";
import Navegationbar from "./Navegationbar";
import React from "react";

class MainLayout extends React.Component {


  render() {
    console.log(this.props.companyId);
    const { children } = this.props;
    return (
      <main>
        <Navegationbar />
        <div style={{ marginTop: "15px" }}/>
        <Content fluid onClick={this.handleContentClick}>
          {children}
        </Content>
      </main>
    );
  }
}

export default MainLayout;
