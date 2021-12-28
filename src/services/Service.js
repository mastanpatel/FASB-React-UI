import { sampleInventory } from '../common/sample-inventory';
let data = [...sampleInventory ];

const generateId = (data) => 
data.reduce((acc, current) => Math.max(acc, current.FASBInventoryID), 0) + 1;

export const insertItem = (item) => {
  item.FASBInventoryID = generateId(data);
  item.inEdit = false;
  data.unshift(item);
  return data;
};
export const getItems = () => {
  return data;
};
export const updateItem = (item) => {
  let index = data.findIndex((record) => record.FASBInventoryID === item.FASBInventoryID);
  data[index] = item;
  return data;
};
export const deleteItem = (item) => {
  let index = data.findIndex((record) => record.FASBInventoryID === item.FASBInventoryID);
  data.splice(index, 1);
  return data;
};