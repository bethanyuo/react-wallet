import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import "./styles.css";

const MyTextInput = ( { label, ...props } ) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField( props );
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MyCheckbox = ( { children, ...props } ) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField( { ...props, type: 'checkbox' } );
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MySelect = ( { label, ...props } ) => {
    const [field, meta] = useField( props );
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

// And now we can use these
const SignupForm = () => {
    return (
        <>
            <h1>Signup</h1>
            <h5>Create your PiñaPay Wallet today!</h5>
            <br></br>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    acceptedTerms: false, // added for our checkbox
                    userType: '', // added for our select
                }}
                validationSchema={Yup.object( {
                    firstName: Yup.string()
                        .max( 15, 'Must be 15 characters or less' )
                        .required( 'Required' ),
                    lastName: Yup.string()
                        .max( 20, 'Must be 20 characters or less' )
                        .required( 'Required' ),
                    email: Yup.string()
                        .email( 'Invalid email address' )
                        .required( 'Required' ),
                    acceptedTerms: Yup.boolean()
                        .required( 'Required' )
                        .oneOf( [true], 'You must accept the terms and conditions.' ),
                    userType: Yup.string()
                        .oneOf(
                            ['merchant', 'buyer'],
                            'Invalid Type'
                        )
                        .required( 'Required' ),
                } )}
                onSubmit={( values, { setSubmitting } ) => {
                    setTimeout( () => {
                        alert( JSON.stringify( values, null, 2 ) );
                        setSubmitting( false );
                    }, 400 );
                }}
            >
                <Form>
                    <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                    />

                    <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                    />

                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />

                    <MySelect label="User Type" name="userType">
                        <option value="">Select a user type</option>
                        <option value="merchant">Merchant</option>
                        <option value="buyer">Buyer</option>
                    </MySelect>

                    <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
                    </MyCheckbox>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

function App() {
    return <SignupForm />;
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);