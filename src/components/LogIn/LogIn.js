import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons"
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useSignInWithGoogle, useSignInWithFacebook, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useState } from 'react';
import './LogIn.css';
import axios from "axios";


const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, googleUser, loadingGoogle, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, facebookUser, loadingFacebook, facebookError] = useSignInWithFacebook(auth);
    const [signInWithEmailAndPassword, emailUser, loadingEmail, emailError] = useSignInWithEmailAndPassword(auth);

    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const handleEmail = e => {
        const emailInput = e.target.value;
        if ((emailInput === "")) {
            setEmail({ value: '', error: 'Email Required' })
        } else {
            setEmail({ value: emailInput, error: '' })
        }
    }

    const handlePassword = e => {
        const passwordInput = e.target.value;
        if (passwordInput === '') {
            setPassword({ value: '', error: 'Password Required' })
        } else {
            setPassword({ value: passwordInput, error: '' })
        }
    }

    // Email & Password sign in functionality //
    const handleSignInEmailPassword = async e => {
        e.preventDefault();
        if (email.value && password.value) {
            await signInWithEmailAndPassword(email.value, password.value);
        } else {
            setEmail({ value: '', error: 'Email Required' })
            setPassword({ value: '', error: 'Password Required' })
        }
    }

    if (emailUser) {
        const getToken = async () => {
            const { data } = await axios.post('https://tranquil-beach-24557.herokuapp.com/login', { email: emailUser?.user?.email })
            localStorage.setItem('accessToken', data);
            navigate(from, { replace: true })
        }
        getToken();
    }
    // ....................................//

    // Google sign in functionality //
    const handleGoogle = async e => {
        e.preventDefault();
        await signInWithGoogle()
    }

    if (googleUser) {
        const getToken = async () => {
            const { data } = await axios.post('https://tranquil-beach-24557.herokuapp.com/login', { email: googleUser?.user?.email })
            localStorage.setItem('accessToken', data);
            navigate(from, { replace: true })
        }
        getToken();
    }
    // ....................................//

    // Facebook sign in functionality //
    const handleFacebook = async e => {
        e.preventDefault();
        await signInWithFacebook()
    }

    if (facebookUser) {
        const getToken = async () => {
            const { data } = await axios.post('https://tranquil-beach-24557.herokuapp.com/login', { email: facebookUser?.user?.email })
            localStorage.setItem('accessToken', data);
            navigate(from, { replace: true })
        }
        getToken();
    }
    // ....................................//


    return (
        <div className='form-container'>
            <form onSubmit={handleSignInEmailPassword}>
                <h5>Log In</h5>
                <label htmlFor="email">Email</label>
                <input onBlur={handleEmail} type="email" name="" id="email" />
                {email.error && (
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {email.error}
                    </small>
                )}
                <label htmlFor="password">Password</label>
                <input onBlur={handlePassword} type="password" name="" id="password" />
                {password.error && (
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {password.error}
                    </small>
                )}
                <br />
                <button
                    className='login-btn' type='submit'>
                    {loadingEmail ? 'Loading...' : 'Login'}
                </button>
                {emailError &&
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {emailError?.message}
                    </small>
                }
                <small>
                    Ema-John?
                    <Link to='/signup'>
                        Create New Account
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
                {googleError &&
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {googleError?.message}
                    </small>
                }
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
                {facebookError &&
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {facebookError?.message}
                    </small>
                }
            </form>
        </div>
    );
};

export default SignIn;