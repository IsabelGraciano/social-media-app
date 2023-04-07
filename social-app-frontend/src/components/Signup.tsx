import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import API_URL from '../../config';


function Signup() : JSX.Element {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [wrongField, setWrongField] = useState('')
    const [errorCreateUser, setErrorCreateUser] = useState(false)
    const navigate = useNavigate()

    const submitCreateUserForm = async (event: { preventDefault: () => void; }): Promise<void> => {
        event.preventDefault();
        console.log('here')

        if (await userInfoIsValid()) {
            createUser()
        } else {
            setErrorCreateUser(true)
        }
    }

    const createUser = async() => {
        console.log('in create user method')

        const userData = {
            name,
            email,
            username,
            password
        }
        console.log('bf response')
        const response = await fetch(`${API_URL}/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        console.log('after response')
        // TO-DO: handle error here
        const data = response.json()
        navigate('/login')
    }

    const userInfoIsValid = async () => {
        const response = await fetch(`${API_URL}/users/validate-creation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, username, password
            })
        })
        const data = await response.json()

        if (data.emailExists) {
            setWrongField('email')
        }
        if (data.usernameExists) {
            setWrongField('username')
        }

        return !data.emailExists && !data.usernameExists
    }

    const onChangeInput = (event: { target: { value: any; name: string; }; }): void => {
        const value = event.target.value
        if (event.target.name === 'fullName') {
            setName(value)
        }
        if (event.target.name === 'email') {
            setEmail(value)
        }
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
                        placeholder="Full name"
                        className="rounded-md bg-gray-200 p-2 h-9 w-60"
                        type="text"
                        name="fullName"
                        value={name}
                        onChange={onChangeInput}
                    />
                    <label htmlFor="fullName" />

                    <input
                        placeholder="Email"
                        className="rounded-md bg-gray-200 p-2 h-9 w-60"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChangeInput}
                    />
                    <label htmlFor="email" />

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
                        value="Sign up"
                    >
                    </input>

                    <p>Or</p>
                    <p>LOGIN WITH GOOLE</p>
                </form>
                {errorCreateUser && <p className='text-red-500 px-10 text-center'>The {wrongField} is not available</p>}
            </div>
            <div className="border-gray-400 border-2 rounded-lg mx-auto h-10 w-60 flex items-center justify-center">
                <p>Have an account? <Link className="text-brown hover:text-deep-brown" to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Signup