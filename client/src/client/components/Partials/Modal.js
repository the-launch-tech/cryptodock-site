import React from 'react'

export default function({ children, closeModal, visible }) {
  return (
    <div
      style={{
        width: 400,
        height: 'auto',
        left: `calc(50% - 200px)`,
        top: `calc(50% - 200px)`,
        zIndex: 100,
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
      }}
      className="fixed p-5 bg-white shadow-xl border border-solid border-gray-0 transition-200 transition-all"
    >
      <i
        style={{ top: 5, right: 5 }}
        className="fal fa-times absolute text-xl cursor-pointer text-red-2 transition-all transition-200 hover:text-gray-3"
        onClick={closeModal}
      ></i>
      <div className="block w-full h-full">{children}</div>
    </div>
  )
}
