import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionsCreators } from 'redux';
import * as chatActionCreators from './actions/chatActionCreators';
import { Formik, Form, Field } from 'formik';

function App () {
  const { messages, error, isFetching } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const { getMessagesAction, newMessagesAction } = bindActionsCreators(chatActionCreators, dispatch);

  useEffect(() => {
    getMessagesAction();
  }, []);

  return (
    <>
      <Formik
        initialValues = {{ text: '' }}
        onSubmit={values => newMessagesAction(values)}
      >
      {formik => <Form>
        <Field name='text'></Field>
        <button type='onsubmit'>Send message</button>
      </Form>}
      </Formik>
      <ol>
        {messages.map(m => <li key={m._id}>m.text</li>)}
        {isFetching && <li>Loading...</li>}
        {error && <li>Error</li>}
      </ol>
    </>
  );
}

export default App;
