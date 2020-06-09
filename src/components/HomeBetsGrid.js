import React, { useState, useEffect } from "react";
import "../style/grid.css";
import appConstants from "../resources/AppConstants";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const HomeBetsGrid = props => {
  const columnDefs = [
    // { headerName: "Time", field: "kickOff", minWidth: 50 },

    {
      headerName: "Time",
      field: "_embedded",
      minWidth: 100,
      autoHeight: true,
      cellRendererFramework: function(params) {
        let dateTime = "--/-- --:--";
        if (params.data.kickOffDate && params.data.kickOffTime) {
          let dateArr = params.data.kickOffDate.split("-");
          let date = dateArr[1] + "/" + dateArr[2];
          let timeArr = params.data.kickOffTime.split(":");
          let time = timeArr[0] + ":" + timeArr[1];

          dateTime = date + " " + time;
        }
        return <p>{dateTime}</p>;
      }
    },

    { headerName: "Match", field: "matchDesc", minWidth: 50 },
    { headerName: "Bet", field: "betDesc", minWidth: 50 },
    { headerName: "Odds", field: "odds", minWidth: 50 },
    { headerName: "Stake", field: "stake", minWidth: 50 },
    {
      headerName: "Bookie",
      field: "_embedded",
      minWidth: 100,
      autoHeight: true,
      cellRendererFramework: function(params) {
        return (
          <img
            style={{
              maxWidth: "80%"
            }}
            src={require("../image-uploads/" +
              params.data._embedded.bookie.poster)}
            alt="img"
          />
        );
      }
    }
  ];

  const defaultColDef = {
    // enableValue: true,
    // enableRowGroup: true,
    // enablePivot: true,
    // sortable: true,
    // filter: true
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
        sideBar={false}
        reactNext={false}
        pagination={false}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={props.bets}
        enableColResize={false}
        paginationPageSize={10}
        onRowClicked={props.onRowClick}
      ></AgGridReact>
    </div>
  );
};

export default HomeBetsGrid;
