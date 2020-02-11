import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { registerUser } from '../../actions/users/actions'
import validate from '../../utils/validate'
import handleTextChange from '../../utils/handleTextChange'
import handleSelectChange from '../../utils/handleSelectChange'
import fieldsValid from '../../utils/fieldsValid'
import defaultFields from './registration/defaultFields'

const { log, error } = console

function Registration({ auth, registerUser }) {
  const [data, setData] = useState(defaultFields)
  const [valid, setValid] = useState(false)

  function onChange(newData) {
    setValid(fieldsValid(newData))
    setData(newData)
  }

  function handleRegister(e) {
    e.preventDefault()
    const user = Object.assign({}, data)
    Object.keys(user).map(key => (user[key] = user[key].value))
    registerUser(user)
      .then(log)
      .catch(error)
  }

  return (
    <div className="py-10">
      <h3 className="font-head font-normal text-center my-5 cursor-default">Register</h3>
      <p className="text-center font-head font-normal mb-10 text-gray-3 cursor-default">
        If you already have a CryptoDock account please{' '}
        <Link
          to="/login"
          className="text-center font-head font-normal text-green-2 cursor-pointer transition-all transition-200 hover:text-blue-2 active:text-green-1"
        >
          login instead
        </Link>
        .
      </p>
      <p
        className="mx-auto text-center text-sm font-body font-hairline my-5 text-gray-3 cursor-default"
        style={{ maxWidth: 600 }}
      >
        By creating an account you may get on the shortlist of people who will be provided an API
        key and download of the application upon release. It isn't not certain where things will go,
        but the first step is exploration.
      </p>
      <div className="w-full max-w-sm my-20 mx-auto" style={{ maxWidth: 500 }}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-1/2 px-3 relative">
            <label
              className="block uppercase tracking-wide text-gray-3 text-xs font-bold mb-2 font-head font-normal"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-3 border border-gray-1 rounded py-3 px-4 mb-3 leading-tight transition-all transition-200 focus:outline-none focus:bg-gray-0 font-body font-hairline"
              id="first_name"
              name="first_name"
              type="text"
              placeholder="What's Your First Name?"
              defaultValue={data.first_name.value}
              onChange={e => handleTextChange(e, data, validate.text, onChange)}
            />
            {data.first_name.dirty && (
              <React.Fragment>
                {data.first_name.valid ? (
                  <p className="absolute text-green-2 text-xs italic  font-body">Great.</p>
                ) : (
                  <p className="absolute text-red-2 text-xs italic  font-body">
                    {data.first_name.error}
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="w-1/2 px-3 relative">
            <label
              className="block uppercase tracking-wide text-gray-3 text-xs font-bold mb-2 font-head font-normal"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-3 border border-gray-1 rounded py-3 px-4 mb-3 leading-tight transition-all transition-200 focus:outline-none focus:bg-gray-0 font-body font-hairline"
              id="last_name"
              name="last_name"
              type="text"
              placeholder="What's Your Last Name?"
              defaultValue={data.last_name.value}
              onChange={e => handleTextChange(e, data, validate.text, onChange)}
            />
            {data.last_name.dirty && (
              <React.Fragment>
                {data.last_name.valid ? (
                  <p className="absolute text-green-2 text-xs italic  font-body">Great.</p>
                ) : (
                  <p className="absolute text-red-2 text-xs italic  font-body">
                    {data.last_name.error}
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative">
            <label
              className="block uppercase tracking-wide text-gray-3 text-xs font-bold mb-2 font-head font-normal"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-3 border border-gray-1 rounded py-3 px-4 mb-3 leading-tight transition-all transition-200 focus:outline-none focus:bg-gray-0 font-body font-hairline"
              id="email"
              name="email"
              type="text"
              placeholder="What's Your Email?"
              defaultValue={data.email.value}
              onChange={e => handleTextChange(e, data, validate.email, onChange)}
            />
            {data.email.dirty && (
              <React.Fragment>
                {data.email.valid ? (
                  <p className="absolute text-green-2 text-xs italic  font-body">Great.</p>
                ) : (
                  <p className="absolute text-red-2 text-xs italic  font-body">
                    {data.email.error}
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-1/2 px-3 relative">
            <label
              className="block uppercase tracking-wide text-gray-3 text-xs font-bold mb-2 font-head font-normal"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-3 border border-gray-1 rounded py-3 px-4 mb-3 leading-tight transition-all transition-200 focus:outline-none focus:bg-gray-0 font-body font-hairline"
              id="password"
              name="password"
              type="password"
              placeholder="******************"
              defaultValue={data.password.value}
              onChange={e => handleTextChange(e, data, validate.password, onChange)}
            />
            {data.password.dirty && (
              <React.Fragment>
                {data.password.valid ? (
                  <p className="absolute text-green-2 text-xs italic  font-body">Great.</p>
                ) : (
                  <p className="absolute text-red-2 text-xs italic font-body">
                    {data.password.error}
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="w-1/2 px-3 relative">
            <label
              className="block uppercase tracking-wide text-gray-3 text-xs font-bold mb-2 font-head font-normal"
              htmlFor="password_confirm"
            >
              Confirm Password
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-3 border border-gray-1 rounded py-3 px-4 mb-3 leading-tight transition-all transition-200 focus:outline-none focus:bg-gray-0 font-body font-hairline"
              id="password_confirm"
              name="password_confirm"
              type="password"
              placeholder="******************"
              defaultValue={data.password_confirm.value}
              onChange={e => handleTextChange(e, data, validate.password_confirm, onChange)}
            />
            {data.password_confirm.dirty && (
              <React.Fragment>
                {data.password_confirm.valid ? (
                  <p className="absolute text-green-2 text-xs italic  font-body">Great.</p>
                ) : (
                  <p className="absolute text-red-2 text-xs italic  font-body ">
                    {data.password_confirm.error}
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <button
            type="button"
            disabled={!valid}
            className="mx-auto px-10 py-3 font-head text-sm font-thin bg-blue-2 text-white border border-solid border-blue-2 rounded-lg cursor-pointer outline-none transition-all transition-200 hover:bg-white hover:text-blue-2 active:bg-blue-1 active:text-blue-2 disabled:bg-gray-1 disabled:text-gray-3 disabled:border-gray-1 disabled:cursor-none"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(
  connect(
    ({ auth }) => {
      return { auth }
    },
    {
      registerUser,
    }
  )(Registration)
)
