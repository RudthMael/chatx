import auth from './auth';
import rooms from './rooms';

export default function* rootSaga() {
  yield [
    auth(),
    rooms()
  ];
}
