import Page from "../Page";
import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import "../styles/reduction.scss";
import UserProgressTable from "../dashboardUtils/utils/UserProgressTable";

const userProgressTableData = [
  {
    name: "Transaccion #1",
    hash: "14JASJ123JAJ",
    date: "10/09/2019"
  },
  {
    name: "Transaccion #2",
    hash: "13WQWEJ123JAJ",
    date: "11/08/2019"
  },
  {
    name: "Transaccion #3",
    hash: "3FSAF3JAJ",
    date: "10/08/2019"
  },
  {
    name: "Transaccion #4",
    hash: "04DEfr423JAJ",
    date: "03/08/2019"
  },
  {
    name: "Transaccion #5",
    hash: "4323DEDE1",
    date: "10/07/2019"
  },
  {
    name: "Transaccion #6",
    hash: "4EFRFA134",
    date: "20/07/2019"
  }
];

const HistoryPage = () => {
  return (
    <Page
      title="Historial de transacciones"
     >
      <Card>
        <CardHeader style={{color: "black", textAlign: "center"}}>Ultimas transacciones realizadas</CardHeader>
        <CardBody>
          <UserProgressTable
            headers={["Nombre de la transaccion", "Hash", "Fecha"]}
            usersData={userProgressTableData}
          />
        </CardBody>
      </Card>
    </Page>
  );
};

export default HistoryPage;
