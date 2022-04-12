import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './styles.css';

const Formi = () => (
    <div className='my-box'>
        <Formik
            initialValues={{ email: '', password: '', checked: [], radio: '' }}
            validate={(values) => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                    )
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Required';
                } else if (values.password.length < 6) {
                    errors.password = 'Password must be at least 6 characters';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}>
            {({
                isSubmitting,
                values,
                /* and other goodies */
            }) => (
                <Form>
                    <Field
                        type='email'
                        name='email'
                        placeholder='Email'></Field>
                    <ErrorMessage name='email' component='div'></ErrorMessage>
                    <br />
                    <Field
                        type='password'
                        name='password'
                        placeholder='Password'></Field>
                    <ErrorMessage
                        name='password'
                        component='div'></ErrorMessage>
                    <br />
                    <br />
                    <label>Gender : {values.radio}</label>
                    <br />
                    <Field type='radio' name='radio' value='Male' />
                    Male
                    <Field type='radio' name='radio' value='Female' />
                    Female
                    <br />
                    <div role='group' aria-labelledby='checkbox-group'>
                        <label>
                            <Field type='checkbox' name='checked' value='One' />
                            One
                        </label>
                        <label>
                            <Field type='checkbox' name='checked' value='Two' />
                            Two
                        </label>
                        <label>
                            <Field
                                type='checkbox'
                                name='checked'
                                value='Three'
                            />
                            Three
                        </label>
                    </div>
                    <button type='submit' disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>

                // <form onSubmit={handleSubmit}>
                //     <input
                //         type='email'
                //         name='email'
                //         onChange={handleChange}
                //         placeholder='email'
                //         onBlur={handleBlur}
                //         value={values.email}
                //     />
                //     {errors.email && touched.email && errors.email}
                //     <br />
                //     <br />
                //     <input
                //         type='password'
                //         name='password'
                //         placeholder='password'
                //         onChange={handleChange}
                //         onBlur={handleBlur}
                //         value={values.password}
                //     />
                //     {errors.password && touched.password && errors.password}
                //     <br />
                //     <br />
                //     <button type='submit' disabled={isSubmitting}>
                //         Submit
                //     </button>
                // </form>
            )}
        </Formik>
    </div>
);

export default Formi;
