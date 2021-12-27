import React, { useState } from 'react';
import { sampleProducts } from '../common/sample-products';
import { MyCommandCell } from './myCommandCell.jsx';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { sampleInventory } from '../common/sample-inventory';
import { ExcelExport } from "@progress/kendo-react-excel-export";

const Inventory = (props) => {
    const editField = "inEdit";
    const [data, setData] = useState(sampleInventory);
    const [dataState, setDataState] = useState({ skip: 0, take: 10 })

    const generateId = data => data.reduce((acc, current) => Math.max(acc, current.FASBInventoryID), 0) + 1;
    const _export = React.useRef(null);

    const excelExport = () => {
      if (_export.current !== null) {
        _export.current.save();
      }
    };
    const removeItem = (data, item) => {
        let index = data.findIndex(p => p === item || item.FASBInventoryID && p.FASBInventoryID === item.FASBInventoryID);
        if (index >= 0) {
            data.splice(index, 1);
        }
    }


    const enterEdit = (dataItem) => {
        setData(data.map(item =>
            item.FASBInventoryID === dataItem.FASBInventoryID ?
                { ...item, inEdit: true } : item
        ));
    }

    const remove = (dataItem) => {

        const newData = [...data];
        removeItem(newData, dataItem);
        removeItem(sampleInventory, dataItem);
        setData([...newData]);
    }

    const add = (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.FASBInventoryID = generateId(sampleInventory);

        sampleInventory.unshift(dataItem);
        setData([...data])
    }

    const discard = (dataItem) => {
        const newData = [...data];
        removeItem(newData, dataItem);

        setData(newData);
    }

    const update = (dataItem) => {
        const newData = [...data]
        const updatedItem = { ...dataItem, inEdit: undefined };

        updateItem(newData, updatedItem);
        updateItem(sampleInventory, updatedItem);

        setData(newData);
    }

    const cancel = (dataItem) => {
        const originalItem = sampleInventory.find(p => p.FASBInventoryID === dataItem.FASBInventoryID);
        const newData = data.map(item => item.FASBInventoryID === originalItem.FASBInventoryID ? originalItem : item);

        setData(newData);
    }

    const updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.FASBInventoryID && p.FASBInventoryID === item.FASBInventoryID));
        if (index >= 0) {
            data[index] = { ...item };
        }
    }

    const itemChange = (event) => {
        const newData = data.map(item =>
            item.FASBInventoryID === event.dataItem.FASBInventoryID ?
                { ...item, [event.field]: event.value } : item
        );
        setData(newData);
    }

    const addNew = () => {
        const newDataItem = { inEdit: true, Discontinued: false };
        setData([newDataItem, ...data]);
    }

    const cancelCurrentChanges = () => {
        setData([...sampleInventory]);
    }
    let CommandCell = MyCommandCell({
        edit: enterEdit,
        remove: remove,

        add: add,
        discard: discard,

        update: update,
        cancel: cancel,

        editField: editField
    });
    const hasEditedItem = data.some(p => p.inEdit);
    return (
        <div className="container-fluid">
            <div className='row my-4'>
            
            <ExcelExport data={sampleInventory} ref={_export}>
                {/* <div className='col-12 col-lg-9 border-right'> */}
                <Grid
                    data={process(data, dataState)}
                    onItemChange={itemChange}
                    editField={editField}
                    pageable // uncomment to enable paging
                    // sortable // uncomment to enable sorting
                    // filterable // uncomment to enable filtering
                    onDataStateChange={(e) => setDataState(e.dataState)} // uncomment to enable data operations
                    {...dataState} // uncomment to enable data operations
                >

                    <GridToolbar>
                    <button
                        title="Export Excel"
                        className="k-button k-primary"
                        onClick={excelExport}
                    >
                        Export to Excel
                    </button>
                        {hasEditedItem && (
                            <button
                                title="Cancel current changes"
                                className="k-button"
                                onClick={cancelCurrentChanges}
                            >
                                Cancel current changes1
                            </button>
                        )}
                    </GridToolbar>
                   
                    <Column field="longDealName" title="Deal Name" width="190px" />
                    <Column field="CurrentControllingClass" title="Class" width="80px" />
                    <Column field="CurrentControllingCusip" title="Cusip" />
                    <Column field="Consolidate" title="Consolidate" width="150px" />
                    <Column
                        field="Rules"
                        title="Edit"
                        width="150px"
                        cell={(props) => {
                            // let field = props.field || "";
                            return (
                                <td>
                                    <button className="k-primary k-button">
                                        Edit
                                    </button>
                                    {/* <input
                                        disabled={false}
                                        type="checkbox"
                                        checked={props.dataItem[field]}
                                        /> */}
                                </td>
                            );
                        }}
                    />
                    <Column field="CCTrackingComment" title="Comment" width="300px" />
                    <Column field="CreateTimeStamp" title="CreateTimeStamp" />
                    <Column field="CreatedBy" title="CreatedBy" />
                    <Column field="ModifyTimeStamp" title="ModifyTimeStamp" />
                    <Column field="ModifiedBy" title="ModifiedBy" />
                    
                </Grid>
                </ExcelExport>
            </div>
            {/*                
            </div> */}
        </div>
    );
}

export default Inventory;