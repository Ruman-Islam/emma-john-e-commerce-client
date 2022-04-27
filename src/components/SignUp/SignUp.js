import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons"
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useSignInWithGoogle, useSignInWithFacebook, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './SignUp.css';

const SignUp = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
    const [userName, setUserName] = useState({ value: "", error: "" });

    const [signInWithGoogle, , loadingGoogle,] = useSignInWithGoogle(auth);
    const [signInWithFacebook, , loadingFacebook,] = useSignInWithFacebook(auth);
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);

    if (user) {
        navigate(from, { replace: true });
    }

    const handleUserName = e => {
        const userNameInput = e.target.value;
        if (userNameInput) {
            setUserName({ value: userNameInput, error: "" });
        }
    }

    const handleEmail = e => {
        const emailInput = e.target.value;
        if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailInput)) {
            setEmail({ value: emailInput, error: "" });
        } else {
            setEmail({ value: "", error: "Invalid email" })
        }
    }

    const handlePassword = e => {
        const passwordInput = e.target.value;
        if (passwordInput.length < 6) {
            setPassword({ value: "", error: "Password is too short" })
        } else if (!/^(?=.*[A-Z])/.test(passwordInput)) {
            setPassword({ value: '', error: "Password should contain capital letter" })
        } else if (!/(?=.*[!@#$&*])/.test(passwordInput)) {
            setPassword({ value: '', error: 'Password should contain special character' })
        } else if (!/(?=.*[0-9])/.test(passwordInput)) {
            setPassword({ value: '', error: 'Password should contain number' })
        } else {
            setPassword({ value: passwordInput, error: "" })
        }
    }

    const handleConfirmPassword = e => {
        const confirmPasswordInput = e.target.value;
        if (confirmPasswordInput !== password.value) {
            setConfirmPassword({ value: "", error: "Password didn't match" });
        } else {
            setConfirmPassword({ value: confirmPasswordInput, error: "" })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (userName.value === "") {
            setUserName({ value: "", error: "Username is required" })
        } if (email.value === "") {
            setEmail({ value: "", error: "Email is required" })
        } if (password.value === "") {
            setPassword({ value: "", error: "Password is required" })
        }
        if (email.value && password.value && confirmPassword.value) {
            createUserWithEmailAndPassword(email.value, password.value)
                .then(async () => {
                    await updateProfile({ displayName: userName.value })
                        .then(() => {
                            console.log('user name updated');
                        });
                })
        }
    }

    const handleGoogle = e => {
        e.preventDefault();
        signInWithGoogle()
            .then(() => navigate(from, { replace: true }))
    }

    const handleFacebook = e => {
        e.preventDefault();
        signInWithFacebook()
            .then(() => navigate(from, { replace: true }))
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h5>Sign Up</h5>
                <label htmlFor="username">Username</label>
                <input onBlur={handleUserName} type="text" id="username" />
                {userName.error && (
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {userName.error}
                    </small>
                )}
                <label htmlFor="email">Email</label>
                <input onBlur={handleEmail} type="email" id="email" />
                {email.error && (
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {email.error}
                    </small>
                )}
                <label htmlFor="password">Password</label>
                <input onBlur={handlePassword} type="password" id="password" />
                {password.error && (
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {password.error}
                    </small>
                )}
                <label htmlFor="confirm-password">Confirm Password</label>
                <input onBlur={handleConfirmPassword} type="password" id="confirm-password" />
                {confirmPassword.error && (
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {confirmPassword.error}
                    </small>
                )}
                <br />
                <button
                    className='login-btn' type='submit'>
                    {loading ? 'Loading...' : ' Create account'}
                </button>
                {error &&
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {error?.message}
                    </small>
                }
                <small>
                    Already have an account?
                    <Link to='/login'>
                        Log in
                    </Link>
                </small>
                <div className='or-line'>
                    <div></div>
                    <small>or</small>
                    <div></div>
                </div>
                <button
                    onClick={handleGoogle}
                    className='social-btn'>
                    <div
                        className='social-icon-wrapper'>
                        <FontAwesomeIcon className="icon" icon={faGoogle} />
                    </div>
                    <div className='social-btn-text-wrapper'>
                        <small>
                            {loadingGoogle ? 'Loading...' : 'Continue with Google'}
                        </small>
                    </div>
                </button>
                <hr />
                <button
                    onClick={handleFacebook}
                    className='social-btn'>
                    <div
                        className='social-icon-wrapper'>
                        <FontAwesomeIcon className="icon" icon={faFacebook} />
                    </div>
                    <div className='social-btn-text-wrapper'>
                        <small>
                            {loadingFacebook ? 'Loading...' : 'Continue with Facebook'}
                        </small>
                    </div>
                </button>
            </form>
        </div>
    );
};

export default SignUp;