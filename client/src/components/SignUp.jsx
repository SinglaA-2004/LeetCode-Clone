import React, { useState } from 'react';
import {
    MDBContainer,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
} from 'mdb-react-ui-kit';


function SignUp() {

    const [justifyActive, setJustifyActive] = useState('tab2');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab2'}>

                    <div className="text-center mb-3">
                        <p>Sign up with:</p>

                        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm"/>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm"/>
                            </MDBBtn>
                        </div>

                        <p className="text-center mt-3">or:</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' onChange={(e)=> setName(e.target.value)} label='Name' id='form1' type='text'/>
                    <MDBInput wrapperClass='mb-4' onChange={(e)=> setUserName(e.target.value)} label='Username' id='form1' type='text'/>
                    <MDBInput wrapperClass='mb-4' onChange={(e)=> setEmail(e.target.value)} label='Email' id='form1' type='email'/>
                    <MDBInput wrapperClass='mb-4' onChange={(e)=> setPassword(e.target.value)} label='Password' id='form1' type='password'/>

                    <MDBBtn className="mb-4 w-100" onClick={async (e)=> {
                        const response = await fetch("http://localhost:3000/signup", {
                            method: "POST",
                            body: JSON.stringify({
                                name : name,
                                username : username,
                                email : email,
                                password : password
                            })
                        })
                        const json = await response.json();
                        console.log(json);
                    }}>Sign up</MDBBtn>

                </MDBTabsPane>

            </MDBTabsContent>

        </MDBContainer>
    );
}

export default SignUp;