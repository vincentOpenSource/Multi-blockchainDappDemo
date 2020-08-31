import React, { useState } from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import { NeoDemo } from './neo/NeoDemo';
import { Web3Demo } from './web3/Web3Demo';

const {
  Header, Content, Footer, Sider,
} = Layout;
function App() {

  const [state, setState] = useState({ menuID: '0' });

  const menuClick = (e) => {
    setState({
      menuID: e.key
    });
  }
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo" />
        <Menu onClick={menuClick} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <span className="nav-text">Web3 Demo</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span className="nav-text">NEO Demo</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {state.menuID === '1' && <h1>--- Web3 Demo ---</h1>}
          {state.menuID === '2' && <h1>--- NEO Demo ---</h1>}
        </Header>
        <Content style={{ padding: 24, background: '#fff', minHeight: 360 }} >
          {state.menuID === '1' && <Web3Demo />}
          {state.menuID === '2' && <NeoDemo />}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Demo ©2019 Created by Vincent
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
