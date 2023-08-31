import AuthForm from '../AuthForm/AuthForm'


function Register({
  setCurrentUser,
  setIsLoading,
  setLoggedIn,
  isLoggedIn,
  navigate
}) {


  return (
    <AuthForm
      sets='register'
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      bottomText='Уже зарегистрированы?'
      bottomTextLink='Войти'
      bottomLink='/signin'
      setCurrentUser={setCurrentUser}
      setIsLoading={setIsLoading}
      setLoggedIn={setLoggedIn}
      isLoggedIn={isLoggedIn}
      navigate={navigate}
    />
  )
}

export default Register;