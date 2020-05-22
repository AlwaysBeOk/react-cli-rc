import { observable, action, computed } from 'mobx';

class AddState {
  @observable num1 = 0;
  @observable num2 = 10;
  
  @action addNum1 = () => {
    this.num1 ++;
  };
  @action addNum2 = () => {
    this.num2 ++;
  };
  @computed get total() {
    return this.num1 + this.num2;
  }
}

const addState = new AddState();

export { addState };
