import React from "react"

const FormLayout = ({ classname = 'w-full h-12 pt-2 relative' , children }) => {
  const [ firstChild , secondChild ] = React.Children.toArray(children)
  return (
    <div className={classname}>
      { firstChild }
      { secondChild }
    </div>
  )
}

export { FormLayout}