import React from 'react';
import {Icon, Menu} from 'antd';


const SubMenu = Menu.SubMenu;




const Navbar=({logOut, user, collapsed, toggle, username, is_staff, is_superuser, profile})=> (
            <div className={'osw-navbar'}>
                <span>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                </span>
                <span>
                    <Menu
                        mode="horizontal">
                        <SubMenu key={'sub1'} title={<span>Hello, {username}</span>}>
                           {/* <Menu.Item>
                                <Icon type="pie-chart" />
                                <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="pie-chart" />
                                <span>Option 2</span>
                            </Menu.Item>
                            <Menu.Divider></Menu.Divider>*/}
                            <Menu.Item>
                               <span onClick={logOut}>
                                    <Icon type="logout" />
                                <span>Cerrar Sesión</span>
                               </span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </span>
            </div>
        );


export default Navbar;
