import AuthForm from '../AuthForm/AuthForm'

function Login({ auth }) {
  return (
    <AuthForm
      sets='login'
      title='Рады видеть!'
      button='Войти'
      bottomText='Ещё не зарегистрированы?'
      bottomTextLink='Регистрация'
      bottomLink='/signup'
      auth={auth}
    />
  )
}

export default Login;