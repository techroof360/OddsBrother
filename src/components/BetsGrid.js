import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import "../style/grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appConstants from "../resources/AppConstants";
import {
  faTrash,
  faMinusCircle,
  faPlusCircle,
  faTimesCircle,
  faEdit,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const BetsGrid = props => {
  const columnDefs = [
    { headerName: "Kickoff", field: "kickOff", minWidth: 50 },
    { headerName: "Match", field: "matchDesc", minWidth: 50 },
    { headerName: "Game", field: "betDesc", minWidth: 50 },
    { headerName: "Odds", field: "oddsPrice", minWidth: 50 },
    { headerName: "Stake", field: "stake", minWidth: 50 },
    {
      headerName: "Outcome",
      field: "stake",
      minWidth: 100,
      cellRendererFramework: function(params) {
        let wonIconColor, lostIconColor, voidIconColor;
        let iconSize = "fa-lg";

        switch (params.data.status) {
          case appConstants.WON_STATUS: {
            wonIconColor = "green";
            lostIconColor = voidIconColor = "grey";
            break;
          }
          case appConstants.LOST_STATUS: {
            lostIconColor = "red";
            wonIconColor = voidIconColor = "grey";
            break;
          }
          case appConstants.VOID_STATUS: {
            voidIconColor = "blue";
            wonIconColor = lostIconColor = "grey";
            break;
          }

          default: {
            wonIconColor = lostIconColor = voidIconColor = "grey";
            break;
          }
        }

        return (
          <div className="icons-block">
            <a
              href="#"
              onClick={() =>
                props.onActionBet(params.data, appConstants.WON_STATUS)
              }
            >
              <FontAwesomeIcon
                className={iconSize}
                color={wonIconColor}
                icon={faCheckCircle}
              />
            </a>{" "}
            <a
              href="#"
              onClick={() =>
                props.onActionBet(params.data, appConstants.LOST_STATUS)
              }
            >
              <FontAwesomeIcon
                className={iconSize}
                color={lostIconColor}
                icon={faTimesCircle}
              />
            </a>{" "}
            <a
              href="#"
              onClick={() =>
                props.onActionBet(params.data, appConstants.VOID_STATUS)
              }
            >
              <FontAwesomeIcon
                className={iconSize}
                color={voidIconColor}
                icon={faMinusCircle}
              />
            </a>
            {" | "}
            <a
              href="#"
              onClick={() => props.onDeleteEditAddBet(params.data, "delete")}
            >
              <FontAwesomeIcon className={iconSize} icon={faTrash} />
            </a>{" "}
            <a
              href="#"
              onClick={() => props.onDeleteEditAddBet(params.data, "edit")}
            >
              <FontAwesomeIcon className={iconSize} icon={faEdit} />
            </a>{" "}
            <a
              href="#"
              onClick={() => props.onDeleteEditAddBet(params.data, "add")}
            >
              <FontAwesomeIcon className={iconSize} icon={faPlusCircle} />
            </a>
          </div>
        );
      }
    }
  ];

  const defaultColDef = {
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true
  };

  useEffect(() => {
    // api.sizeColumnsToFit();
  });

  const onGridReady = params => {
    params.api.sizeColumnsToFit();
    //this.columnApi = params.columnApi;
  };

  return (
    <div className="ag-theme-balham" style={{ height: "400px" }}>
      <AgGridReact
        onGridReady={onGridReady}
        sideBar={true}
        reactNext={true}
        pagination={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={props.bets}
        enableColResize={true}
        paginationPageSize={10}
      ></AgGridReact>
    </div>

    // <Table hover>
    //   <thead>
    //     <tr>
    //       <th>#</th>
    //       <th>First Name</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <th scope="row">1</th>
    //       <td>Mark</td>
    //       <td>Otto</td>
    //       <td>@mdo</td>
    //     </tr>
    //     <tr>
    //       <th scope="row">2</th>
    //       <td>Jacob</td>
    //       <td>Thornton</td>
    //       <td>@fat</td>
    //     </tr>
    //     <tr>
    //       <th scope="row">3</th>
    //       <td>Larry</td>
    //       <td>the Bird</td>
    //       <td>@twitter</td>
    //     </tr>
    //   </tbody>
    // </Table>

    // <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
    //   <thead className="thead-light">
    //     <tr>
    //       <th className="text-center">Time</th>
    //       {/* <th>User</th> */}
    //       <th className="text-center">Match</th>

    //       <th className="text-center">Game</th>

    //       <th className="text-center">Odds</th>

    //       <th className="text-center">Stake</th>

    //       <th className="text-center">Outcome</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {props.bets && props.bets.length > 0 ? (
    //       props.bets.map((bet, index) => (
    //         <tr key={index}>
    //           <td className="text-center">{bet.kickOff}</td>
    //           <td className="text-center">{bet.matchDesc}</td>
    //           <td className="text-center">{bet.betType}</td>
    //           <td className="text-center">{bet.oddsPrice}</td>
    //           <td className="text-center">{bet.stake}</td>
    //           <td className="text-center">
    //             {" "}
    //             <a href="your link here">
    //               <FontAwesomeIcon icon={faTrash} />
    //             </a>{" "}
    //             <a href="your link here">
    //               <FontAwesomeIcon icon={faMinusCircle} />
    //             </a>{" "}
    //             <a href="your link here">
    //               <FontAwesomeIcon icon={faPlusCircle} />
    //             </a>{" "}
    //             <a href="your link here">
    //               <FontAwesomeIcon icon={faTimesCircle} />
    //             </a>{" "}
    //             <a href="your link here">
    //               <FontAwesomeIcon icon={faCheckCircle} />
    //             </a>
    //           </td>
    //         </tr>
    //       ))
    //     ) : (
    //       <tr>
    //         <td colSpan={3}>No users</td>
    //       </tr>
    //     )}
    //   </tbody>
    // </Table>
  );
};

export default BetsGrid;
