import React, { Component } from "react";
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;


export class SideMenu extends Component {

  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
    });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo">
              Locadora EAuditoria
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <NavLink to="/cliente" className="nav-text">Cliente</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/filme" className="nav-text">Filme</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/locacao" className="nav-text">Locacao</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/relatorio" className="nav-text">Relatorio</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <br />
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              
              {this.props.children}
            </div>
            
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

