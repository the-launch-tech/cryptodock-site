import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header className="fixed z-50 w-full bg-blue-4 top-0 flex flex-wrap items-center justify-between px-2 py-3 shadow-md">
      <nav className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <ul className="flex justify-start items-center">
          <li className="nav-item">
            <Link
              to="/"
              className="px-3 py-2 flex items-center text-sm font-head uppercase font-thin text-white transition-all transition-200 hover:text-red-2"
            >
              CryptoDock
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
