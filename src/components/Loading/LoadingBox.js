import React from 'react'
import classNames from 'classnames'
import Loading from './Loading'

export default function LoadingBox (props) {
  const { className, children, style } = props
  const classes = classNames('loading-box', className)

  return (
    <div className={classes} style={style}>
      <Loading size="lg" className="loading-box-icon" />
      {children}
    </div>
  )
}
