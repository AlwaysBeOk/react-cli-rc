import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Button } from 'antd';
import './index.scss';
import styles from './button.module.scss';

@inject('store')
@observer
class MyButton extends React.Component<any> {
  
  render() {
    const { store } = this.props;
    return (
      <div>
        <button className={styles.error} onClick={store.addState.addNum1}>
          add1
        </button>
        <button className={styles.error} onClick={store.addState.addNum2}>
          add2
        </button>
        {/*<Button type="primary">*/}
          {/*antdButton*/}
        {/*</Button>*/}
      </div>
    );
  }
}

export default MyButton;
