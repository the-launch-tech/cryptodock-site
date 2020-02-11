import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { updateUser } from '../../actions/users/actions'
import validate from '../../utils/validate'
import handleTextChange from '../../utils/handleTextChange'
import handleSelectChange from '../../utils/handleSelectChange'
import fieldsValid from '../../utils/fieldsValid'
import defaultFields from './update/defaultFields'
import Modal from '../Partials/Modal'

const { log, error } = console

function Profile({ auth, updateUser }) {
  const [data, setData] = useState(defaultFields)
  const [valid, setValid] = useState(true)
  const [visible, setVisible] = useState(false)

  function onChange(newData) {
    setValid(fieldsValid(newData))
    setData(newData)
  }

  function handleUpdate(e) {
    e.preventDefault()
    const user = Object.assign({}, data)
    Object.keys(user).map(key => (user[key] = user[key].value))
    updateUser(auth.id, user)
      .then(log)
      .catch(error)
  }

  function createKey(e) {
    e.preventDefault()
    openModal()
  }

  function closeModal(e) {
    e.preventDefault()
    setVisible(false)
  }

  function openModal() {
    setVisible(true)
  }

  return (
    <div className="py-10 container mx-auto">
      <Modal closeModal={closeModal} visible={visible}>
        <p className="font-body text-sm font-hairline text-gray-3">
          Experimental API Keys will be available for use soon.
        </p>
      </Modal>
      <h3 className="font-head font-normal text-center my-5 cursor-default">
        {auth ? `${auth.first_name} ${auth.last_name}` : 'Profile'}
      </h3>
      <div className="py-10 container mx-auto" style={{ maxWidth: 700 }}>
        <h5 className="font-head font-normal text-center my-5 cursor-default">Generate API Key</h5>
        <div className="my-5">
          <div className="border border-solid border-gray-1 rounded p-5 bg-gray-0-400">
            {auth.access_key ? (
              <pre>{auth.access_key}</pre>
            ) : (
              <p className="font-body font-hairline">No Key Exists</p>
            )}
          </div>
          <div className="flex justify-start items-center my-2">
            <button
              type="button"
              className="font-head px-3 py-1 text-tiny text-green-2 border border-solid border-green-2 bg-white rounded outline-none transition-200 transition-all hover:bg-green-2-850 hover:text-white active:bg-green-2"
              onClick={createKey}
            >
              Create New
            </button>
          </div>
        </div>
      </div>
      <div className="py-10 container mx-auto">
        <h5 className="font-head font-normal text-center my-5 cursor-default">
          Update Your Profile
        </h5>
        <div className="w-full max-w-sm my-20 mx-auto" style={{ maxWidth: 900 }}>
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
                defaultValue={auth.first_name}
                onChange={e => handleTextChange(e, data, validate.text, onChange)}
              />
              <React.Fragment>
                {!data.first_name.valid && (
                  <p className="absolute text-red-2 text-xs italic  font-body">
                    {data.first_name.error}
                  </p>
                )}
              </React.Fragment>
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
                defaultValue={auth.last_name}
                onChange={e => handleTextChange(e, data, validate.text, onChange)}
              />
              <React.Fragment>
                {!data.last_name.valid && (
                  <p className="absolute text-red-2 text-xs italic  font-body">
                    {data.last_name.error}
                  </p>
                )}
              </React.Fragment>
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
                defaultValue={auth.email}
                onChange={e => handleTextChange(e, data, validate.email, onChange)}
              />
              <React.Fragment>
                {!data.email.valid && (
                  <p className="absolute text-red-2 text-xs italic  font-body">
                    {data.email.error}
                  </p>
                )}
              </React.Fragment>
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
                defaultValue=""
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
                defaultValue=""
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
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
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
      updateUser,
    }
  )(Profile)
)
