import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { resetUser, setUser } from '../../features/slices/userSlice';
import { authService } from '../../features/services/auth';
import Input from './input';

function Login() {

	const emailRef = React.createRef<HTMLInputElement>(), passwordRef = React.createRef<HTMLInputElement>();
	const dispatch = useAppDispatch();
	let [error, setError] = useState("");

	const user = useAppSelector((state) => state.user);
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		
		//  prevent page reload
		e.preventDefault();
		setError("");

		let email = emailRef.current?.value, password = passwordRef.current?.value;
		
		if(!email || !password) return

		//  login using firebase
		// 	saving the user in redux will be handled in app.tsx
		
		authService.signInUser(email, password)
		.then(user => dispatch(setUser(user)))
		.catch(error => {
			const errorCode = error.code;
			console.log(errorCode);

			switch(errorCode) {
				case "auth/wrong-password":
					setError("Email and password does not match");
					break;
				case "auth/user-not-found":
					setError("User does not exists");
					break;
				case "auth/user-disabled":
					setError("User Inactive");
					break;
				default: 
					setError("Something went wrong. Couldn't Log you in.")
			}
		});
	}

  return (
    <div>
			<h2>Login</h2>

			{error && <p>{error}</p>}
			
			<form onSubmit={e => handleSubmit(e)}>
				<Input label="Email" ref={emailRef} placeholder='email' required={true} type="email"></Input>
				<Input label="Password" ref={passwordRef} placeholder='password' required={true} type="password"></Input>
				<button type='submit'>Login</button>
			</form>
			<p>{user?.uid}</p>
			<button onClick={() => {
				authService.signOut();			
				dispatch(resetUser())
			}}>Logout</button>
		</div>
  )
}

export default Login