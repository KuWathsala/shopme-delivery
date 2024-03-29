import { SubmissionError } from 'redux-form';
import * as actions from '../Store/Actions/index';
import {authVerify} from '../Store/Actions/Auth';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit=(values)=> {
  return sleep(1000).then(() => {
    // simulate server latency
    // if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
    //   throw new SubmissionError({
    //     username: 'User does not exist',
    //     _error: 'Login failed!'
    //   })
    // } else if (values.password !== 'redux-form') {
    //   throw new SubmissionError({
    //     password: 'Wrong password',
    //     _error: 'Login failed!'
    //   })
    // } else {
      //actions.auth(values.Email,values.Password);
      authVerify(values.Email,values.Password)
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      console.log(values);
      
 
       }) 
}

export default submit;