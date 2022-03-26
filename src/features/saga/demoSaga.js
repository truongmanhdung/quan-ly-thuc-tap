import { call, put, takeLatest } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';

export const addTodoAsync = createAction('books/fetchBook/pending');

function* addTodoSaga(action) {
    yield console.log('đã kết nối với saga');
}

export function* todoSaga() {
  yield takeLatest(addTodoAsync, addTodoSaga);
}
