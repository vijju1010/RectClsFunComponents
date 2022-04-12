import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './styles.css';

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className='text-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className='checkbox-input'>
                <input type='checkbox' {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </div>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </div>
    );
};
const MyRadio = ({ children, ...props }) => {
    // added for our radio
    const [field, meta] = useField(props);
    return (
        <div>
            <label className='radio-input'>
                <input type='radio' {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </div>
    );
};

const FormikYupUseField = () => {
    return (
        <div className='my-box'>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    acceptedTerms: false, // added for our checkbox
                    jobType: '', // added for our select
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .min(2, 'Must be at least 2 characters')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    acceptedTerms: Yup.boolean()
                        .required('Required')
                        .oneOf(
                            [true],
                            'You must accept the terms and conditions.'
                        ),
                    jobType: Yup.string()
                        .oneOf(
                            ['Student', 'Teacher', 'non-Teaching', 'other'],
                            'Invalid Job Type'
                        )
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}>
                <Form>
                    <MyTextInput
                        label='First Name'
                        name='firstName'
                        type='text'
                        placeholder='FirstName'
                    />
                    <br />
                    <MyTextInput
                        label='Last Name'
                        name='lastName'
                        type='text'
                        placeholder='LastName'
                    />
                    <br />
                    <MyTextInput
                        label='Email Address'
                        name='email'
                        type='email'
                        placeholder='Email Address'
                    />
                    <br />
                    <MyRadio label='Job Type' name='jobType' value='Student'>
                        Student
                    </MyRadio>
                    <br />
                    <MySelect label='Job Type' name='jobType'>
                        <option value=''>Select a job type</option>
                        <option value='Student'>Designer</option>
                        <option value='Teacher'>Developer</option>
                        <option value='Non-teaching'>Product Manager</option>
                        <option value='other'>Other</option>
                    </MySelect>
                    <br />
                    <MyCheckbox name='acceptedTerms'>
                        I accept the terms and conditions
                    </MyCheckbox>
                    <br />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    );
};
export default FormikYupUseField;
