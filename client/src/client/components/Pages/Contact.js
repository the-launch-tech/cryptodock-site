import React, { useState } from 'react'
import validate from '../../utils/validate'
import handleTextChange from '../../utils/handleTextChange'
import handleSelectChange from '../../utils/handleSelectChange'
import fieldsValid from '../../utils/fieldsValid'
import defaultFields from './contact/defaultFields'

export default function(props) {
  const [data, setData] = useState(defaultFields)
  const [valid, setValid] = useState(false)

  function onChange(newData) {
    setValid(fieldsValid(newData))
    setData(newData)
  }

  function handleContact(e) {
    e.preventDefault()
    // UtilsService.contact(data).catch(error)
  }

  return (
    <div className="py-10">
      <h3 className="font-head font-normal text-center my-5 cursor-default">CryptoDock Contact</h3>
      <div className="w-full max-w-sm my-20 mx-auto" style={{ maxWidth: 900 }}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-1/3 px-3 relative">
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
          <div className="w-1/3 px-3 relative">
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
          <div className="w-1/3 px-3 relative">
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
              type="email"
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
              htmlFor="organization"
            >
              Organization
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-3 border border-gray-1 rounded py-3 px-4 mb-3 leading-tight transition-all transition-200 focus:outline-none focus:bg-gray-0 font-body font-hairline"
              id="organization"
              name="organization"
              type="text"
              placeholder="Are you affiliated with an organization? If so, what organization?"
              defaultValue={data.organization.value}
              onChange={e => handleTextChange(e, data, null, onChange)}
            />
          </div>
          <div className="w-1/2 px-3 relative">
            <label
              className="block uppercase tracking-wide text-gray-3 text-xs font-bold mb-2 font-head font-normal"
              htmlFor="interest"
            >
              Interest
            </label>
            <select
              className="appearance-none block w-full bg-white text-gray-3 border border-gray-1 rounded py-3 px-4 mb-3 leading-tight transition-all transition-200 focus:outline-none focus:bg-gray-0 font-body font-hairline"
              onChange={e => handleSelectChange(e, data, validate.text, onChange)}
              defaultValue={data.organization.value}
            >
              <option value="general_question">General Question</option>
              <option value="product_question">Product Question</option>
              <option value="work_contrubution">Work Contrubution</option>
              <option value="beta_testing_list">Beta Testing List</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative">
            <label
              className="block uppercase tracking-wide text-gray-3 text-xs font-bold mb-2 font-head font-normal"
              htmlFor="message"
            >
              Please Elaborate
            </label>
            <textarea
              className="appearance-none block w-full bg-white text-gray-3 border border-gray-1 rounded py-3 px-4 mb-3 leading-tight transition-all transition-200 focus:outline-none focus:bg-gray-0 font-body font-hairline"
              id="message"
              name="message"
              placeholder="Please add any additional comments, or ask your question(s)!"
              defaultValue={data.message.value}
              onChange={e => handleTextChange(e, data, null, onChange)}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <button
            type="button"
            disabled={!valid}
            className="mx-auto px-10 py-3 font-head text-sm font-thin bg-blue-2 text-white border border-solid border-blue-2 rounded-lg cursor-pointer outline-none transition-all transition-200 hover:bg-white hover:text-blue-2 active:bg-blue-1 active:text-blue-2 disabled:bg-gray-1 disabled:text-gray-3 disabled:border-gray-1 disabled:cursor-none"
            onClick={handleContact}
          >
            Send Mail
          </button>
        </div>
      </div>
    </div>
  )
}
