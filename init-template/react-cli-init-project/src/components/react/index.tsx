import React from 'react';


import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class MyReact extends React.Component<any> {
  
  
  render() {
    return (
      <div>
        React
        <p>
          创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI。<br/>
          无论你现在正在使用什么技术栈，你都可以随时引入 React 来开发新特性，而不需要重写现有代码。
        </p>
      </div>
    );
  }
}

export default MyReact;
