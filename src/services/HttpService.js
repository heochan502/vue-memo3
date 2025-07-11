import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {
  //입력 매소드
  async save(item) {
    console.log('save-item: ', item);
    const res = await axios.post('/memo', item);
    return res.data;
  }
  async getMemoList(params) {
    //get메소드 호출시, 2번쨰 인자는 객체를 보내고
    // 객체의 params속서에 객채를 보내면
    // 자동으로 쿼리스트링으로 변환해준다.
    // 위와 아래가 같다
    // const res = axios.get('/memo', {
    //   params: params
    // });
    // const res2 = await axios.get('/memo', {params});
    // console.log('params: ', params);
    const res = await axios.get('/memo', { params });
    console.log('getMemoList - res.data', res.data);
    console.log('params: ', params);
    return res.data;
  }

  async modify(item) {
    console.log('modify - item : ', item);
    const res = await axios.put('/memo', item);
    return res.data;
  }

  async findById(id) {
    console.log('findById - id ', id);    
    const res = await axios.get(`/memo/${id}`);
    return res.data;
  }
  async putMemo(item) {
    console.log('putMemo - item', item);
  }
  async deleteMemo(params) {
    console.log('deleteMemo - params', params);
    const res = await axios.delete('/memo', { params });
    return res.data;
  }
}

export default new HttpService();
