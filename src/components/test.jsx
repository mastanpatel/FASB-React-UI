import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import products from '../common/products.json';
const columns = [{
  field: "ProductID",
  title: "ID",
  minWidth: 50
}, {
  field: "ProductName",
  title: "Name",
  minWidth: 200
}, {
  field: "Category.CategoryName",
  title: "CategoryName",
  minWidth: 200
}, {
  field: "UnitPrice",
  title: "Price",
  minWidth: 100
}, {
  field: "UnitsInStock",
  title: "In stock",
  minWidth: 100
}];
const ADJUST_PADDING = 4;
const COLUMN_MIN = 4;

export const Test = () => {
  const minGridWidth = React.useRef(0);
  const grid = React.useRef(null);
  const [gridData, setGridData] = React.useState(products);
  const [applyMinWidth, setApplyMinWidth] = React.useState(false);
  const [gridCurrent, setGridCurrent] = React.useState(0);
  React.useEffect(() => {
    grid.current = document.querySelector('.k-grid');
    window.addEventListener('resize', handleResize);
    columns.map(item => item.minWidth !== undefined ? minGridWidth.current += item.minWidth : minGridWidth.current);
    setGridCurrent(grid.current.offsetWidth);
    setApplyMinWidth(grid.current.offsetWidth < minGridWidth.current);
  }, []);

  const handleResize = () => {
    if (grid.current.offsetWidth < minGridWidth && !applyMinWidth) {
      setApplyMinWidth(true);
    } else if (grid.current.offsetWidth > minGridWidth) {
      setGridCurrent(grid.current.offsetWidth);
      setApplyMinWidth(false);
    }
  };

  const setWidth = minWidth => {
    // eslint-disable-next-line no-unused-expressions
    minWidth === undefined ? minWidth = 0 : null;
    let width = applyMinWidth ? minWidth : minWidth + (gridCurrent - minGridWidth.current) / columns.length;
    // eslint-disable-next-line no-unused-expressions
    width < COLUMN_MIN ? width : width -= ADJUST_PADDING;
    return width;
  };

  return <div>
        <Grid style={{
      height: '400px'
    }} data={gridData}>
          {columns.map((column, index) => {
        return <Column field={column.field} title={column.title} key={index} width={setWidth(column.minWidth)} />;
      })}
        </Grid>
      </div>;
};