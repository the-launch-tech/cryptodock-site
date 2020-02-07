import React from 'react'

export default function footer(props) {
  return (
    <footer className="bg-blue-4 py-5">
      <div className="">
        <ul className="mt-6 flex justify-center items-center">
          <li className="mx-2 p-0">
            <a
              href="mailto:daniel@thelaunch.tech"
              className="flex flex-col justify-center items-center text-white text-tiny transition-all transition-200 hover:text-red-2 font-head"
            >
              <i className="fal fa-envelope bg-red-2 text-white  shadow-lg text-2xl p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none inline-block text-center transition-all transition-200 hover:bg-white hover:text-red-2 mb-2"></i>{' '}
              Email
            </a>
          </li>
          <li className="mx-2 p-0">
            <a
              href="https://github.com/the-launch-tech"
              target="_blank"
              className="flex flex-col justify-center items-center text-white text-tiny transition-all transition-200 hover:text-red-2 font-head"
            >
              <i className="fab fa-github bg-red-2 text-white shadow-lg text-2xl p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none inline-block text-center transition-all transition-200 hover:bg-white hover:text-red-2 mb-2"></i>{' '}
              Github
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-1 container mx-auto" />
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <span className="w-full md:w-4/12 px-4 mx-auto text-center text-white font-head font-thin text-tiny">
          ©2020 CryptoDock, Daniel Griffiths at{' '}
          <a
            href="https://thelaunch.tech"
            target="_blank"
            className="text-white font-head font-thin text-tiny transition-all transition-200 hover:text-red-2"
          >
            The Launch
          </a>
        </span>
      </div>
    </footer>
  )
}
