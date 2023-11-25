import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import {
    googleSignInStart,
    emailSignInStart,
  } from '../../store/user/user.action';

//default form values to initialize object
const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();

    //Pass Use State default form value object
    const [formFields, setFormFields] = useState(defaultFormFields);
    //Destructure four values to use as constants within component
    const { email, password } = formFields; 

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    //Triggers onSubmit event handler
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        // Generate auth id following successful authentication
        try {

            //Generate response when user successfully signs in
            dispatch(emailSignInStart(email, password));
            
            // Return form to default values following user creation
            resetFormFields();
       
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/invalid':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    //Generalize event information for the form input fields for setting and storing the formFields unified object.
    const handleChange = (event) => {
        
        // name will come through the event, value captures the form input. Target specifies the speciifc input to collect information from.
        const { name, value } = event.target;
        
        //Apply update on form fields, use [name] from the event above to update the appropriate field
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                
                <FormInput
                    label='Email'
                    type='email' 
                    required 
                    onChange={ handleChange } 
                    name='email' 
                    value={ email } 
                />
                
                <FormInput
                    label='Password'
                    type='password' 
                    required 
                    onChange={ handleChange } 
                    name='password' 
                    value={ password } 
                />
                <ButtonsContainer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.base} type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;