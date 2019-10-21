import React from 'react';
import { getColor } from '../dashboardUtils/utils/colors';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import Page from '../Page';
import '../styles/reduction.scss';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          32,
          34,
          5,
          45,
          40,
          12,
          32
        ],
        ...moreData,
      },
      {
        label: 'Dataset 2',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          32,
          34,
          5,
          45,
          40,
          12,
          32
        ],
        ...moreData2,
      },
    ],
  };
};

const genPieData = () => {
  return {
    datasets: [
      {
        data: [23, 15, 20, 31, 36],
        backgroundColor: [
          getColor('primary'),
          getColor('secondary'),
          getColor('success'),
          getColor('info'),
          getColor('danger'),
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
  };
};

const EstadisticsPage = () => {
  return (
    <Page title="Estadisticas" breadcrumbs={[{ name: 'Estadisticas', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Pie</CardHeader>
            <CardBody>
              <Pie data={genPieData()} />
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Doughnut</CardHeader>
            <CardBody>
              <Doughnut data={genPieData()} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default EstadisticsPage;
