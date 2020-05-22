import React from 'react';


import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class MyVue extends React.Component<any> {
  
  
  render() {
    return (
      <div>
        Vue
        <p>20kB min+gzip, 运行大小超快虚拟, DOM最省心的优化</p>
      </div>
    );
  }
}

export default MyVue;
