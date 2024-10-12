import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RiLoader2Line } from "react-icons/ri";

const SignIn = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // function to handle input changes
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    // function to handle the sign in process
    const handleSignIn = async (e) => {};

    return (
        <div className='flex justify-center items-center w-screen h-screen px-3'>
            <form onSubmit={handleSignIn} className='shadow-xl drop-shadow md:min-w-[35vw] min-w-72 flex flex-col gap-5 p-8 rounded-md'>

                <div className='text-center'>
                    <h1 className='font-semibold text-xl'>Logo</h1>
                    <p className='text-sm font-medium my-2'>SignIn to Chat with your Friends.</p>
                </div>

                {/* takes the user's data from the client for signin */}
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
                        <button type='submit' className='bg-gray-700 text-xl py-1 rounded text-white hover:bg-gray-900'>SignIn</button>
                    )
                }

                {/* link to send the user to the signup page if he can't created a account */}
                <span className='text-center'>Don't have an Account? <Link to="/signup" className="text-blue-500 hover:underline">SignUp</Link></span>
            </form>

        </div>
    )
}

export default SignIn