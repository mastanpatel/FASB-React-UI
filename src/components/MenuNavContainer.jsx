import React from 'react';
import { Menu, MenuItem } from '@progress/kendo-react-layout';
import { useHistory } from 'react-router-dom';


const MenuNavContainer = (props) => {
    const history = useHistory();
    const onSelect = (event) => {
        history.push(event.item.data.route);
    }
    return (
        <Menu onSelect={onSelect}>
            {/* <MenuItem text="Home" data={{ route: 'ManageQuarter' }}/>  */}
            <MenuItem text="Manage Quarter" data={{ route: '/ManageQuarter' }}/>
            <MenuItem text="Input Wizard" data={{ route: '/InputWizard' }}/>
            <MenuItem text="Inventory" data={{ route: '/Inventory' }}/>
            <MenuItem text="Control" data={{ route: '/Control' }}/>
            <MenuItem text="Reports" data={{ route: '/Reports' }}/>
        </Menu>
    );
}

export default MenuNavContainer;
