import Alert from '../index'
import React from 'react'
import {shallow} from 'enzyme'

const props = {
  message: '测试',
  description: 'aaa'
}
describe('Alert', () => {
  it('render success alert', () => {
    const comp = shallow(<Alert {...props} type="success"/>)
    expect(comp).toMatchSnapshot()

    expect(comp.find('.base-alert-success').length).toBe(1)
    expect(comp.find('.base-alert-message').text()).toEqual(props.message)
    expect(comp.find('.base-alert-description').text()).toEqual(props.description)
  })
  it('render error alert', () => {
    const comp = shallow(<Alert {...props} type="error"/>)
    expect(comp).toMatchSnapshot()

    expect(comp.find('.base-alert-error').length).toBe(1)
  })
})