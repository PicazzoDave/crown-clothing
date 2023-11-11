import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from '../../utils/firebase.utils';

import './sign-up-form.syles.scss';

//default form values to initialize object
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {

    //Pass Use State default form value object
    const [formFields, setFormFields] = useState(defaultFormFields);
    //Destructure four values to use as constants within component
    const { displayName, email, password, confirmPassword } = formFields; 

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //Triggers onSubmit event handler
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        // Confirm password match
        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        // Create user object following authentication
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            
            // Include display name to user information
            await createUserDocumentFromAuth(user, { displayName });

            // Return form to default values following user creation
            resetFormFields();
       
        } catch(error) {
            if(error.code ==='auth/email-a;ready-in-use') {
                alert('Cannot create user, email already in use')
            } else {
                console.log('user creation encountered an error', error);
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
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput
                    label='Display Name'
                    type='text' 
                    required onChange={ handleChange } 
                    name='displayName' 
                    value={ displayName } 
                />
                
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
                    alue={ password } 
                />
                
                <FormInput
                    label='Confirm Password'
                    type='password' 
                    required 
                    onChange={ handleChange } 
                    name='confirmPassword' 
                    value={ confirmPassword } 
                />

                <Button buttonType='google' type='submit'>Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm; 