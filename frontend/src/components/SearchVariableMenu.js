import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SearchVariableMenu = ({ searchVariables, setSearchVariables }) => {

  return <div>
    <Formik
      initialValues={{ name: '' }}
      validate={values => {
        const errors = {};
        /*
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
         */
        return errors;
      }}

      onSubmit={(values) => {
        setSearchVariables(values)
      }}
    >
      {({ handleSubmit }) => (
        <Form onBlur={handleSubmit}>
          <Field type="text" name="name" placeholder="search by name"/>
        </Form>
      )}
    </Formik>
  </div>
}

export default SearchVariableMenu