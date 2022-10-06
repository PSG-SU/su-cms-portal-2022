import React from 'react'

const Heading = ({children}) => {
  return (
    <div className="w-fit">
      <h1 className="text-4xl font-bold text-center">{children}</h1>
      <div className="w-[80%] bg-yellow h-1"></div>
    </div>
  );
}

export default Heading