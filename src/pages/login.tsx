import { Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { FC } from 'react';
import { Column } from '../components/layout/column';
import { Container } from '../components/layout/container';
import { Row } from '../components/layout/row';
import { authenticate } from '../util/authenticate';

type LoginFormErrors = {
  username?: string;
  password?: string;
};

export const Login: FC = () => {
  return (
    <Container>
      <Row>
        <Column>
          <Formik
            initialValues={{ username: '', password: '' }}
            validate={(values) => {
              const errors: LoginFormErrors = {};
              if (!values.username) {
                errors.username = 'Required';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              const res = await authenticate({ username: values.username, password: values.password });
              console.log(res);

              if (res.token) {
                Cookies.set('token', res.token, { expires: 1 });
              }

              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && errors.username}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <br />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </Column>
      </Row>
    </Container>
  );
};
