import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'
import { CoffeeContext } from '../store/CoffeeContext'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
// const initialForm = { email: 'docente@desafiolatam.com', password: '123456' }
const initialForm = { email: '', password: '' }

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  const { setDeveloper } = useContext(CoffeeContext)

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault()
    console.log('Holaaaa', user.email, user.password)
    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y password obligatorias.')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!')
    }
    console.log(user)
    axios
      .post(ENDPOINT.login, user)
      .then(({ data }) => {
        console.log('data', data)
        window.sessionStorage.setItem('token', data.token)
        window.alert('Usuario identificado con éxito 😀.')
        setDeveloper({})
        navigate('/perfil')
      })
      .catch(({ response: { data } }) => {
        console.error('data', data)
        window.alert(`${data.message} 🙁.`)
      })
  }

  return (
    <form
      onSubmit={handleForm}
      className='col-10 col-sm-6 col-md-3 m-auto mt-5 App'
    >
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className='form-group mt-1'>
        <label>Email</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Contraseña</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
        />
      </div>
      <button type='submit' className='btn btn-light mt-3 app'>
        Iniciar Sesión
      </button>

    </form>
  )
}

export default Login
