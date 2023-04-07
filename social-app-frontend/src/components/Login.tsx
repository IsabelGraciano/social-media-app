import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import API_URL from '../../config';


function Login() : JSX.Element {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const [errorLoginUser, setErrorLoginUser] = useState(false)

    const submitCreateUserForm = async (event: { preventDefault: () => void; }): Promise<void> => {
        event.preventDefault();

        if (await userLoginInfoIsValid()) {
            navigate('/home')
        } else {
            setErrorLoginUser(true)
        }
    }

    const userLoginInfoIsValid = async () => {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
        const data = await response.json()
        if (data.msg === 'wrong-credentials') {
            return false
        }

        return true
    }

    const onChangeInput = (event: { target: { value: any; name: string; }; }): void => {
        const value = event.target.value
        if (event.target.name === 'username') {
            setUsername(value)
        }
        if (event.target.name === 'password') {
            setPassword(value)
        }
    }

    return(
        <div className="flex flex-col gap-4 h-screen items-center justify-center">
            <div className="w-[350px] h-[515px] border-gray-400 border-2 rounded-lg flex flex-col gap-4">
                <img className="w-20 h-20 mx-auto mt-4" src="./src/assets/images/logo-social-app.png" alt="" />
                <form
                    className="flex flex-col gap-3 items-center mx-auto"
                    action=""
                    method="POST"
                    onSubmit={submitCreateUserForm}
                >
                    <input
                        placeholder="Username"
                        className="rounded-md bg-gray-200 p-2 h-9 w-60"
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeInput}
                    />
                    <label htmlFor="username" />
                    
                    <input
                        placeholder="Password"
                        className="rounded-md bg-gray-200 p-2 h-9 w-60"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangeInput}
                    />
                    <label htmlFor="password" />

                    <input
                        className="text-brown font-bold bg-gray-200 rounded-full w-48 h-10 cursor-pointer"
                        type="submit"
                        value="Log in"
                    >
                    </input>

                    <p>Or</p>
                    <p>LOGIN WITH GOOLE</p>
                </form>
                {errorLoginUser && <p className='text-red-500 px-10 text-center'>The credentials are not correct</p>}
            </div>
            <div className="border-gray-400 border-2 rounded-lg mx-auto h-10 w-60 flex items-center justify-center">
                <p>Are you new? <Link className="text-brown hover:text-deep-brown" to="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login