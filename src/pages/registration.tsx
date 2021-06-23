import { Formik } from 'formik';
import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Column } from '../components/layout/column';
import { Container } from '../components/layout/container';
import { Row } from '../components/layout/row';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { FormError } from '../components/ui/form-error';
import { registerUser } from '../hooks/mutations/use-registration-mutation';

type RegistrationFormErrors = {
  username?: string;
  password?: string;
  passwordRepeat?: string;
  email?: string;
};

export const Registration: FC = () => {
  const history = useHistory();
  const [resError, setResError] = useState(false);

  return (
    <Container>
      <Row>
        <Column>
          <Formik
            initialValues={{ username: '', password: '', passwordRepeat: '', email: '' }}
            validate={(values) => {
              const errors: RegistrationFormErrors = {};
              if (!values.username) {
                errors.username = 'Required';
              }

              if (!values.email) {
                errors.email = 'Required';
              }

              if (!values.password) {
                errors.password = 'Required';
              }

              if (!values.passwordRepeat || values.password !== values.passwordRepeat) {
                errors.passwordRepeat = 'Password and password repeat do not match.';
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              //const res = await authenticate({ username: values.username, password: values.password });
              try {
                const res = await registerUser(values.username, values.email, values.password);
                if (res) {
                  console.log(res);
                  history.push('/login');
                }
              } catch (error) {
                setResError(true);
                console.log(error);
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
              isValid,
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
                  type="email"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email ? errors.email : undefined}
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
                <Input
                  type="password"
                  name="passwordRepeat"
                  label="Repeat password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordRepeat}
                  error={errors.passwordRepeat && touched.passwordRepeat ? errors.passwordRepeat : undefined}
                />
                <br />
                <Button type="submit" disabled={isSubmitting}>
                  Register
                </Button>
                <br />
                {resError && <FormError>There was an error submitting the form.</FormError>}
              </form>
            )}
          </Formik>
        </Column>
      </Row>
    </Container>
  );
};
