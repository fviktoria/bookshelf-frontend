import { Formik } from 'formik';
import { FC } from 'react';
import { Column } from '../components/layout/column';
import { Container } from '../components/layout/container';
import { Row } from '../components/layout/row';
import { Input } from '../components/ui/input';
import { registerUser } from '../hooks/mutations/use-registration-mutation';

type RegistrationFormErrors = {
  username?: string;
  password?: string;
  passwordRepeat?: string;
  email?: string;
};

export const Registration: FC = () => {
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
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              //const res = await authenticate({ username: values.username, password: values.password });
              try {
                const res = await registerUser(values.username, values.email, values.password);
                if (res) {
                  console.log(res);
                }
              } catch (error) {
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
                />
                {errors.username && touched.username && errors.username}
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <Input
                  type="password"
                  name="passwordRepeat"
                  label="Repeat password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordRepeat}
                />
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
