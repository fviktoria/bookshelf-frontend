import { Formik } from 'formik';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Column } from '../components/layout/column';
import { Container } from '../components/layout/container';
import { Row } from '../components/layout/row';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { authenticate } from '../util/authenticate';

type LoginFormErrors = {
  username?: string;
  password?: string;
};

export const Login: FC = () => {
  const history = useHistory();

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

              if (!values.password) {
                errors.password = 'Required';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const res = await authenticate({ username: values.username, password: values.password });

              if (res.token) {
                Cookies.set('token', res.token, { expires: 1 });
                history.push('/');
                /** TODO: fix this!! - temporary fix because user context isn't set and mutate doesn't work */
                window.location.reload();
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
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={errors.username && touched.username ? errors.username : undefined}
                />

                <Input
                  type="password"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password ? errors.password : undefined}
                />
                <br />
                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </form>
            )}
          </Formik>
        </Column>
      </Row>
    </Container>
  );
};
