import Axios from 'axios';

console.dir(Axios.get);

class ListService {
  
  getList () {
    console.log('send request');
    return Axios.get('http://lemonof.com:82/api/getList').then( ( res ) => res.data.data )
  }
  
}

export default ListService;
