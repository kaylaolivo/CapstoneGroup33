import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const responseGoogle = (response) => {
    // Handle the Google authentication response here
    console.log(response);
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        clientId="august-ascent-377000"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
