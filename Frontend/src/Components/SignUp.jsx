import axios from 'axios';
import React, { useState } from 'react'
import { RiLoader2Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [input, setInput] = useState({
        userName: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post('http://localhost:8000/user/signup', input, { withCredentials: true })
            console.log("response is:", res);

            if (res.data.success) {
                alert(res.data.message);
                localStorage.setItem('email', input.email);
                navigate(`/otp-verify`);
            }

        } catch (error) {
            console.log("Error in handleSignUp :", error);
            alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center w-screen h-screen px-3'>
            <form onSubmit={handleSignUp} className='shadow-xl drop-shadow md:min-w-[35vw] min-w-72 flex flex-col gap-5 p-8 rounded-md'>

                {/* form to take the user details from the client */}
                <div className='text-center'>
                    <h1 className='font-bold text-xl'>LOGO</h1>
                    <p className='text-sm font-medium my-2'>SignUp to Chat with your Friends.</p>
                </div>
                <div>
                    <h1 className='font-semibold'>Username</h1>
                    <input type="text"
                        className='border-2 w-full rounded-md h-8 pl-2 font-medium my-2'
                        onChange={handleInput} value={input.userName} name='userName' required />
                </div>
                <div>
                    <h1 className='font-semibold'>Email</h1>
                    <input type="email"
                        className='border-2 w-full rounded-md h-8 pl-2 font-medium my-2'
                        onChange={handleInput} value={input.email} name='email' required />
                </div>
                <div>
                    <h1 className='font-semibold'>Password</h1>
                    <input type="password"
                        className='border-2 w-full rounded-md h-8 pl-2 font-medium my-2'
                        onChange={handleInput} value={input.password} name='password' required />
                </div>

                {/* display loading on the signup */}
                {
                    loading ? (
                        <button className='bg-gray-700 text-xl py-1 rounded text-white hover:bg-gray-900 flex items-center justify-center'>
                            <RiLoader2Line className='animate-spin mr-3' />
                            Please Wait . . .
                        </button>

                    ) : (
                        <button type='submit' className='bg-gray-700 text-xl py-1 rounded text-white hover:bg-gray-900'>SignUp</button>
                    )
                }

                {/* link to send the user to the signin page if he already created a account */}
                <span className='text-center'>Already have an Account? <Link to="/signin" className="text-blue-500 hover:underline">SignIn</Link></span>
            </form>

        </div>
    )
}

export default SignUp