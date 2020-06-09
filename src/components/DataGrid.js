import React, { useEffect } from "react";
import "../style/grid.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const DataGrid = props => {
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

  // const onGridReady = params => {
  //   params.api.sizeColumnsToFit();
  //   gridApi = params.api;
  //   //this.columnApi = params.columnApi;
  // };

  return (
    <div className="ag-theme-balham" style={{ height: "400px" }}>
      <AgGridReact
        onGridReady={props.onGridReady}
        sideBar={true}
        reactNext={true}
        pagination={true}
        columnDefs={props.columnDefs}
        defaultColDef={defaultColDef}
        rowData={props.data}
        enableColResize={true}
        paginationPageSize={5}
        rowHeight={60}
      ></AgGridReact>
    </div>
  );
};

export default DataGrid;
