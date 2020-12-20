import React, { useState } from 'react';
import '../styles/Signup.css';
import UserDetails from './UserDetails';
import AdditionalUserDetails from './AdditionalUserDetails'
import Confirm from './Confirm'

function Signup() {
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState({
        firstname: '',
        lastname: '',
        username: '', 
        email: '',
        password: '',
        rollNo: '',
        phoneNo: '',
        gitHub: '',
        linkedIn: '',

    })

    const nextStep = () => {
        setStep(step+1);
    }
    const prevStep = () => {
        setStep(step-1);
    }
    const handleChange = (e) => {
        setUserDetails({ 
            ...userDetails,
            [e.target.name]: e.target.value })
    }

    switch(step) {
        case 1:
            return(
                <UserDetails 
                    nextStep = {nextStep}
                    userDetails = {userDetails}
                    handleChange = {handleChange}
                />
            );
        case 2:
            return(
                <AdditionalUserDetails
                    nextStep = {nextStep}
                    prevStep = {prevStep}
                    userDetails = {userDetails}
                    handleChange = {handleChange}                  
                />
            );
        case 3:
            return(
                <Confirm 
                prevStep = {prevStep}
                userDetails = {userDetails} 
                />
            );
        default:
            (console.log('This is a multi-step form built with React.'))    
    }
}

export default Signup;