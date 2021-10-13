
const LoginForm = () => {
  return (
    <>
      <div>
        <label>Username: </label>
        <input type="text" />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" />
      </div>
      <button>Login</button>
    </>
  )
}

const SignUpForm = () => {
  return (
    <>
      <div>
        <label>Username: </label>
        <input type="text" />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" />
      </div>
      <button>Create Account</button>
    </>
  )
}

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />

      <h1>Sign up</h1>
      <SignUpForm />
    </div>
  )
}

export default Login
