import AuthForm from '../AuthForm/AuthForm'

function Register({ auth }) {
  return (
    <AuthForm
      sets='register'
      title='Добро пожаловать!'
      button='Зарегистрироваться'
      bottomText='Уже зарегистрированы?'
      bottomTextLink='Войти'
      bottomLink='/signin'
      auth={auth}
    />
  )
}

export default Register;