import React, { useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { InventoryCommandCell } from "./InventoryCommandCell.jsx";
import { insertItem, getItems, updateItem } from "../services/Service";
import { sampleInventory } from "../common/sample-inventory";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { process } from "@progress/kendo-data-query";

const editField = "inEdit";

const Inventory = () => {
  const [data, setData] = React.useState([]);
  const [dataState, setDataState] = useState({ skip: 0, take: 10 });
  const _export = React.useRef(null);
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  React.useEffect(() => {
    let newItems = getItems();
    setData(newItems);
  }, []); // modify the data in the store, db etc

  // const remove = (dataItem) => {
  //   const newData = deleteItem(dataItem);
  //   setData(newData);
  // };

  const add = (dataItem) => {
    dataItem.inEdit = true;
    const newData = insertItem(dataItem);
    setData(newData);
  };
  const update = (dataItem) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
  }; // Local state operations

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getItems().find(
      (p) => p.FASBInventoryID === dataItem.FASBInventoryID
    );
    const newData = data.map((item) =>
      item.FASBInventoryID === originalItem.FASBInventoryID
        ? originalItem
        : item
    );
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((item) =>
        item.FASBInventoryID === dataItem.FASBInventoryID
          ? { ...item, inEdit: true }
          : item
      )
    );
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.FASBInventoryID === event.dataItem.FASBInventoryID
        ? { ...item, [event.field || ""]: event.value }
        : item
    );
    setData(newData);
  };
  //   const addNew = () => {
  //     const newDataItem = {
  //       inEdit: true,
  //       Discontinued: false,
  //     };
  //     setData([newDataItem, ...data]);
  //   };

  const CommandCell = (props) => (
    <InventoryCommandCell
      {...props}
      edit={enterEdit}
      //   remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

  return (
    <div className="row my-4">
      <ExcelExport data={sampleInventory} ref={_export}>
        <Grid
          style={{
            height: "600px",
            // width : "700px"
          }}
          onDataStateChange={(e) => setDataState(e.dataState)}
          {...dataState}
          data={process(data, dataState)}
          pageable
          onItemChange={itemChange}
          editField={editField}
        >
          <GridToolbar>
            <button
              title="Export Excel"
              className="k-button k-primary"
              onClick={excelExport}
            >
              Export to Excel
            </button>
          </GridToolbar>
          <Column field="longDealName" title="Deal Name" width="190px" />
          <Column field="CurrentControllingClass" title="Class" width="80px" />
          <Column field="CurrentControllingCusip" title="Cusip" />
          <Column field="Consolidate" title="Consolidate" width="150px" />
          {/* <Column

    //field="Rules"
    // title="Edit"
    width="150px" */}

          {/* <Column
        field="Un"
        width="120px"itsInStock"
        title="Units
        editor="numeric"
      /> */}
          <Column field="longDealName" title="Deal Name" width="190px" />
          <Column field="CurrentControllingClass" title="Class" width="80px" />
          <Column field="CurrentControllingCusip" title="Cusip" />
          <Column field="Consolidate" title="Consolidate" width="80px" />

          <Column cell={CommandCell} width="200px" />
        </Grid>
      </ExcelExport>
    </div>
  );
};

export default Inventory;
