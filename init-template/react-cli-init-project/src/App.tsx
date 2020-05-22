import React from 'react';

// component
import MyAngular from 'components/angular/index';
import MyVue from 'components/vue/index';
import MyReact from 'components/react/index';

// route
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';

// style
import './App.scss';

// antd
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


class App extends React.Component {
  state = {
    collapsed: false,
    openKeys: []
  };
  
  handleClick = (v: any) => {
    console.log('click ', v);
  };
  
  subMenuOpen = (openKeys: string[]) => {
    this.setState({openKeys: openKeys.slice(openKeys.length -1)}, () => {
      console.log(this.state.openKeys);
    })
  }

  toggle = () => {
    if(this.state.collapsed){
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }else {
      this.setState({
        collapsed: !this.state.collapsed,
        // openKeys: []
      });
    }
  };

  render() {
    return (
    <Layout>
      <BrowserRouter>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ background: '#fff' }}>
          <div className="logo">
            <img src="assets/logo.jpg" alt="logo" width={200} height={64}/>
          </div>
            <Menu
              mode="inline"
              defaultOpenKeys={['sub1']}
              onClick={this.handleClick}
              onOpenChange={this.subMenuOpen}
              openKeys={this.state.openKeys}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                  <Icon type="user" />
                  <span>angular</span>
                </span>
                }
              >
                <Menu.Item key="1"><Link to="/angular1">angular1</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/angular2">angular2</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/angular3">angular3</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/angular4">angular4</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                  <Icon type="laptop" />
                  <span>vue</span>
                </span>
                }
              >
                <Menu.Item key="5"><Link to="/vue1">vue1</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/vue2">vue2</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/vue3">vue3</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/vue4">vue4</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                  <Icon type="notification" />
                  <span>react</span>
                </span>
                }
              >
                <Menu.Item key="9"><Link to="/react1">react1</Link></Menu.Item>
                <Menu.Item key="10"><Link to="/react2">react2</Link></Menu.Item>
                <Menu.Item key="11"><Link to="/react3">react3</Link></Menu.Item>
                <Menu.Item key="12"><Link to="/react4">react4</Link></Menu.Item>
              </SubMenu>
            </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/angular1" component={MyAngular} />
              <Route path="/vue1" component={MyVue} />
              <Route path="/:frame" component={MyReact} />
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>)
  }
}

export default App;
