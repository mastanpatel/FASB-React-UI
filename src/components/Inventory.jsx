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
import { Upload } from "@progress/kendo-react-upload";
import { Link } from "react-router-dom";
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

  // const downloadFile = () => {
  //   window.location.href = "./";
  // };

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
            {/* <a href="../src/contents/sample.txt" download>
              Click to download
            </a> */}
            {/* <button onClick={downloadFile} /> */}
            
            <Link
              to="/contents/Inventory-Template.xlsx"
              target="_blank"
              download
            >
              <button className="download-btn">Download</button>
              
            </Link>

            <Upload
              batch={false}
              multiple={false}
              defaultFiles={[]}
              withCredentials={false}
              saveUrl={
                "https://demos.telerik.com/kendo-ui/service-v4/upload/save"
              }
              removeUrl={
                "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
              }
            ></Upload>
            <button
              className="export-btn"
              title="Export Excel"
              // className="k-button k-primary"
              onClick={excelExport}
            >
              Export to Excel
            </button>
          </GridToolbar>
          <Column
            field="longDealName"
            title="Deal Name"
            minResizableWidth={190}
          />
          <Column
            field="CurrentControllingClass"
            title="Class"
            minResizableWidth={80}
          />
          <Column field="CurrentControllingCusip" title="Cusip" />
          <Column field="Consolidate" title="Consolidate" />
          <Column field="Comment" title="Comment" />
          <Column field="CreatedBy" title="Created By" />
          <Column field="CreateTimeStamp" title="Create Time Stamp" />
          <Column field="ModifiedBy" title="Modified By" />
          <Column field="ModifyTimeStamp" title="Modify Time Stamp" />
          <Column cell={CommandCell} minResizableWidth={200} />
        </Grid>
      </ExcelExport>
    </div>
  );
};

export default Inventory;
