import React from "react";
import PropTypes from "./propTypes";

import { Table } from "reactstrap";

const UserProgressTable = ({ headers, usersData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {usersData.map(({ name, hash, date }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">{name}</td>
            <td className="align-middle text-center">{hash}</td>
            <td className="align-middle text-center">{date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

UserProgressTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.date
    })
  )
};

UserProgressTable.defaultProps = {
  headers: [],
  usersData: []
};

export default UserProgressTable;
