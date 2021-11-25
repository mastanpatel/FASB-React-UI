import React, { useState } from 'react';
import { sampleProducts } from '../common/sample-products';
import { MyCommandCell } from './myCommandCell.jsx';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { sampleInventory } from '../common/sample-inventory';

const Inventory = (props) => {
    const editField = "inEdit";
    const [data, setData] = useState(sampleInventory);
    const [dataState, setDataState] = useState({ skip: 0, take: 10 })

    const generateId = data => data.reduce((acc, current) => Math.max(acc, current.FASBInventoryID), 0) + 1;

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
                            title="Add new"
                            className="k-button k-primary"
                            onClick={addNew}
                        >
                            Add new
                        </button>
                        {hasEditedItem && (
                            <button
                                title="Cancel current changes"
                                className="k-button"
                                onClick={cancelCurrentChanges}
                            >
                                Cancel current changes
                            </button>
                        )}
                    </GridToolbar>
                    {/* <Column field="ProductID" title="Id" width="50px" editable={false} />
                        <Column field="ProductName" title="Product Name" width="250px"/>
                        <Column field="UnitsInStock" title="Units" width="150px" editor="numeric" />
                        <Column field="Discontinued" title="Discontinued" editor="boolean" />
                        <Column cell={CommandCell} width="240px" /> */}
                    {/* <Column field="FASBInventoryID" title="FASBInventoryID"/>
                        <Column field="QuarterID" title="QuarterID"/>
                        <Column field="QuarterName" title="QuarterName"/>
                        <Column field="StartDate" title="StartDate"/>
                        <Column field="EndDate" title="EndDate"/>
                        <Column field="CCTrackingDealID" title="CCTrackingDealID"/>*/}
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
                    {/* <Column field="DealID" title="DealID"/>
                        <Column field="longDealName" title="longDealName"/>
                        <Column field="TreppDealName" title="TreppDealName"/>
                        <Column field="DealVintage" title="DealVintage"/>
                        <Column field="CMBSType" title="CMBSType"/>
                        <Column field="Cusip" title="Cusip"/>
                        <Column field="Class" title="Class"/>
                        <Column field="OriginalRating" title="OriginalRating"/>
                        <Column field="AdditionalbondDescription" title="AdditionalbondDescription"/>
                        <Column field="DoesBondNeedToBePriced" title="DoesBondNeedToBePriced"/>
                        <Column field="OriginalBalance" title="OriginalBalance"/>
                        <Column field="CurrentBalance" title="CurrentBalance"/>
                        <Column field="SuggestedCurrentBalance" title="SuggestedCurrentBalance"/>
                        <Column field="CurrentBalaneChangeComment" title="CurrentBalaneChangeComment"/>
                        <Column field="SuggestedCurrentBalanceTimestamp" title="SuggestedCurrentBalanceTimestamp"/>
                        <Column field="EffectiveBalance" title="EffectiveBalance"/>
                        <Column field="QuarterFirstMonthCurrentBalance" title="QuarterFirstMonthCurrentBalance"/>
                        <Column field="SubOrdination" title="SubOrdination"/>
                        <Column field="Coupon" title="Coupon"/>
                        <Column field="RatedMaturity" title="RatedMaturity"/>
                        <Column field="ControllingClassCusip" title="ControllingClassCusip"/>
                        <Column field="SpecialServicer" title="SpecialServicer"/>
                        <Column field="ConsolidatedInLastQuarter" title="ConsolidatedInLastQuarter"/>
                        <Column field="MadisonOwnershipPct" title="MadisonOwnershipPct"/>
                        <Column field="CDO2002OwnershipPct" title="CDO2002OwnershipPct"/>
                        <Column field="CDO2003OwnershipPct" title="CDO2003OwnershipPct"/>
                        <Column field="CDO2005OwnershipPct" title="CDO2005OwnershipPct"/>
                        <Column field="CDO2006OwnershipPct" title="CDO2006OwnershipPct"/>
                        <Column field="CDO2007OwnershipPct" title="CDO2007OwnershipPct"/>
                        <Column field="LNROwnershipPct" title="LNROwnershipPct"/>
                        <Column field="ThirdPartyOwnershipPct" title="ThirdPartyOwnershipPct"/>
                        <Column field="LNRPrice" title="LNRPrice"/>
                        <Column field="LNRPriceTimetamp" title="LNRPriceTimetamp"/>
                        <Column field="IsVRR" title="IsVRR"/>
                        <Column field="VRRPrice" title="VRRPrice"/>
                        <Column field="TreppCMBSFeedDate" title="TreppCMBSFeedDate"/>
                        <Column field="TreppPrice" title="TreppPrice"/>
                        <Column field="TreppSpread" title="TreppSpread"/>
                        <Column field="IsIO" title="IsIO"/>
                        <Column field="IsWACIO" title="IsWACIO"/>
                        <Column field="WACIOPrice" title="WACIOPrice"/>
                        <Column field="AverageVintageSpread" title="AverageVintageSpread"/>
                        <Column field="AverageVintagePrice" title="AverageVintagePrice"/>
                        <Column field="DCFPrice" title="DCFPrice"/>
                        <Column field="BusinessRuleApplied" title="BusinessRuleApplied"/>
                        <Column field="BusinessRuleApplyTimeStamp" title="BusinessRuleApplyTimeStamp"/>
                        <Column field="FinalPrice" title="FinalPrice"/>
                        <Column field="SuggestedPRice" title="SuggestedPRice"/>
                        <Column field="FASBLevel" title="FASBLevel"/>
                        <Column field="IsPEZ" title="IsPEZ"/>
                        <Column field="LevelUpdatedBy" title="LevelUpdatedBy"/>
                        <Column field="LevelUpdateTimeStamp" title="LevelUpdateTimeStamp"/>
                        <Column field="Comment" title="Comment"/>
                        <Column field="Yield" title="Yield"/>
                        <Column field="Duration" title="Duration"/>
                        <Column field="WAL" title="WAL"/>
                        <Column field="SuggestedPriceUpdateTimestamp" title="SuggestedPriceUpdateTimestamp"/>
                        <Column field="IsNonTreppBond" title="IsNonTreppBond"/>
                        <Column field="CreateTimeStamp" title="CreateTimeStamp"/>
                        <Column field="CreatedBy" title="CreatedBy"/>
                        <Column field="ModifyTimeStamp" title="ModifyTimeStamp"/>
                        <Column field="ModifiedBy" title="ModifiedBy"/>
                        <Column field="CapitalStructurePosition" title="CapitalStructurePosition"/> */}

                </Grid>
            </div>
            {/*                
            </div> */}
        </div>
    );
}

export default Inventory;