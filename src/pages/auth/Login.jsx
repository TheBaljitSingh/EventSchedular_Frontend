import { Link } from "react-router-dom"
import { validateEmail } from "../../actions/validateEmail";
import { toast } from "react-toastify";

export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData.entries())

            //validating email
            if (!validateEmail(data.email)) {
                toast.error("Invalid Email")
                return
            }

            console.log('Submitting data:', data);
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'Login failed';
                throw new Error(errorMessage);
            }
            const { token } = await response.json();
            localStorage.setItem('token', token);
            console.log("Login Successful");
            window.location.href = '/profile';
        }
        catch (error) {
            console.error('Login Failed:', error.message);
            // Optionally, display the error message to the user
            alert('Login Failed: ' + error.message);
        }
    }



    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    pattern="/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i"
                                    className="block w-full rounded-md border-0 pl-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 pl-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member ?{' '}
                        <Link to="/Register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Register
                        </Link>
                    </p>

                    <p className="mt-1 text-center text-sm text-gray-500">
                        <Link to="/forgotpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}