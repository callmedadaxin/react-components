import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default function Loading (props) {
  const { size, className, style } = props
  const classes = classNames({
    [`loading-${size}`]: true
  }, className)

  return (
    <div className={classes} style={style}>
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
      <div className='bar' />
    </div>
  )
}

Loading.defaultProps = {
  size: 'sm'
}
Loading.propTypes = {
  size: PropTypes.string
}
