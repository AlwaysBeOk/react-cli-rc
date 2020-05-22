import React from 'react';


import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class MyAngular extends React.Component<any> {
  
  
  render() {
    return (
      <div>
        Angular
        <p>
          通过 Web Worker 和服务端渲染，达到在如今(以及未来）的 Web 平台上所能达到的最高速度。<br/>
          Angular 让你有效掌控可伸缩性。基于 RxJS、Immutable.js 和其它推送模型，能适应海量数据需求。<br/>
          <span>{process.env.REACT_APP_CONST_INT}</span>
        </p>
      </div>
    );
  }
}

export default MyAngular;
