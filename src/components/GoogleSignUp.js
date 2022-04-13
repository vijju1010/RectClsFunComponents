import React, { useEffect, useRef } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './styles.css';
import { GoogleIcon } from './GoogleIcon';

const MyTextInput = React.forwardRef(({ label, ...props }, iref) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className='text-input' {...field} {...props} ref={iref} />
            <br />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    );
});

const MyCheckbox = ({ children, ...props }) => {
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

const GoogleSignUp = () => {
    var getUsers = async () => {
        const response = await fetch('http://localhost:8000/getusers');
        const data = await response.json();
        var users = [];
        data.forEach((item, index) => {
            users.push(item.email);
        });
        return users;
    };
    var firstNameref = useRef();
    useEffect(() => {
        setTimeout(() => {
            firstNameref.current.focus();
        }, 1000);
    }, []);
    return (
        <div className='my-box'>
            <div className='d-flex flex-row bd-highlight mb-3'>
                <div className='mr-2'>
                    <GoogleIcon />
                    <br />
                    <span className='googleSt'>Create your Google Account</span>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            showPassword: false,
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            fetch('http://localhost:8000/reguser', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(values),
                            }).then((res) => {
                                console.log(res);
                            });
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                        validationSchema={Yup.object({
                            firstName: Yup.string()
                                .required('Required')
                                .max(15, 'Must be 15 characters or less')
                                .min(2, 'Must be at least 2 characters')
                                .matches(/^[a-zA-Z]+$/, 'Must be letters only')
                                .notOneOf(['admin', 'root'], 'Forbidden name'),
                            lastName: Yup.string()
                                .required('Required')
                                .max(15, 'Must be 15 characters or less')
                                .min(2, 'Must be at least 2 characters')
                                .matches(/^[a-zA-Z]+$/, 'Must be letters only')
                                .notOneOf(['admin', 'root'], 'Forbidden name'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required')
                                .test(
                                    'unique-email',
                                    'Email already exists',
                                    function (value) {
                                        console.log('reached');
                                        var { createError } = this;
                                        var p = new Promise(function (
                                            resolve,
                                            reject
                                        ) {
                                            fetch(
                                                'http://localhost:8000/getEmails'
                                            )
                                                .then((res) => {
                                                    return res.json();
                                                })
                                                .then((data) => {
                                                    console.log(data, 'data');
                                                    if (!data.includes(value)) {
                                                        console.log(
                                                            "doesn't exist"
                                                        );
                                                        resolve(true);
                                                    } else {
                                                        // resolve(false);
                                                        reject(
                                                            createError({
                                                                message:
                                                                    'Email already taken',
                                                            })
                                                        );
                                                    }
                                                });
                                        });
                                        return p;
                                        // return getUsers().then((users) => {
                                        //     return !users.includes(value);
                                        // });
                                    }
                                )
                                .notOneOf(
                                    [Yup.ref('password'), 'password'],
                                    'Password cannot be the same as email'
                                )
                                .notOneOf(
                                    ['admin@gmail.com', 'root@gmail.com'],
                                    'Forbidden Email'
                                ),
                            password: Yup.string()
                                .required('Required')
                                .min(5, 'Must be 5 characters or more')
                                .max(15, 'Must be 15 characters or less')
                                .matches(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    'Must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                                ),
                            confirmPassword: Yup.string()
                                .required('Required')
                                .oneOf(
                                    [Yup.ref('password')],
                                    'Passwords must match'
                                ),
                        })}>
                        {({ isSubmitting, values }) => (
                            <Form
                                action='http://localhost:8000/reguser'
                                method='post'>
                                <div className='d-flex flex-row bd-highlight mb-3'>
                                    <MyTextInput
                                        name='firstName'
                                        type='text'
                                        ref={firstNameref}
                                        placeholder='FirstName'
                                        style={{ marginRight: '10px' }}
                                        className='p-2 bd-highlight rounded mt-2'
                                    />
                                    <MyTextInput
                                        name='lastName'
                                        type='text'
                                        placeholder='LastName'
                                        className='p-2 bd-highlight rounded mt-2'
                                    />
                                </div>
                                <div className='d-flex flex-row bd-highlight mb-3'>
                                    <MyTextInput
                                        name='email'
                                        type='email'
                                        placeholder='Email Address'
                                        className='p-2 bd-highlight rounded border-right-0'
                                    />
                                </div>

                                <div className='d-flex flex-row bd-highlight mb-3'>
                                    <MyTextInput
                                        name='password'
                                        type={
                                            values.showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        placeholder='Password'
                                        className='p-2 bd-highlight rounded'
                                        style={{ marginRight: '10px' }}
                                    />
                                    <MyTextInput
                                        name='confirmPassword'
                                        type={
                                            values.showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        placeholder='Confirm Password'
                                        className='p-2 bd-highlight rounded'
                                        style={{ marginRight: '10px' }}
                                    />
                                </div>
                                <br />
                                <MyCheckbox
                                    label='Show Password'
                                    name='showPassword'
                                    type='checkbox'>
                                    Show Password
                                </MyCheckbox>
                                <br />
                                <div className='d-flex flex-row'>
                                    <div className='ml-4'>
                                        <a href='/login'>Sign in Instead</a>
                                    </div>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <button className='btn btn-primary'>
                                            Sign up
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div>
                    <img
                        src='https://ssl.gstatic.com/accounts/signup/glif/account.svg'
                        alt=''
                        width='244'
                        height='244'
                        className='j9NuTc TrZEUc'></img>
                    <p className='mr-2'>
                        {'One account. All of  Google working for you.'}
                    </p>
                    <p></p>
                </div>
            </div>
        </div>
    );
};

export default GoogleSignUp;
