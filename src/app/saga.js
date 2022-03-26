import { all } from 'redux-saga/effects';
import { todoSaga } from '../features/saga/demoSaga';


export default function* rootSaga() {
  yield all([todoSaga()]);
}