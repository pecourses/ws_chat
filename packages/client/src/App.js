import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActionCreators from './actions/chatActionCreators';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const messageFormValidationSchema = yup.object({
  text: yup.string().min(1).max(512).required()
});

function App () {
  const { messages, error, isFetching } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const { getMessagesAction, newMessageAction } = bindActionCreators(chatActionCreators, dispatch);

  useEffect(() => {
    getMessagesAction();
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages.length, messages[0]]);

  return (
    <>
      <ol>
        {messages.map(m => <li key={m._id}>{m.text}</li>)}
        {isFetching && <li>Loading...</li>}
        {error && <li>Error</li>}
      </ol>
      <Formik
        initialValues = {{ text: '' }}
        onSubmit={values => newMessageAction(values)}
        validationSchema={messageFormValidationSchema}
      >
      {formik => <Form>
        <Field name='text'></Field>
        <button type='onsubmit'>Send message</button>
      </Form>}
      </Formik>
    </>
  );
}

export default App;
