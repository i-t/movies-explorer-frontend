import AuthForm from '../AuthForm/AuthForm'


function Login({
  setCurrentUser,
  setIsLoading,
  setLoggedIn,
  isLoggedIn,
  navigate
}) {


  return (
    <AuthForm
      sets='login'
      title='Рады видеть!'
      btnText='Войти'
      bottomText='Ещё не зарегистрированы?'
      bottomTextLink='Регистрация'
      bottomLink='/signup'
      setCurrentUser={setCurrentUser}
      setIsLoading={setIsLoading}
      setLoggedIn={setLoggedIn}
      isLoggedIn={isLoggedIn}
      navigate={navigate}
    />
  )
}

export default Login;