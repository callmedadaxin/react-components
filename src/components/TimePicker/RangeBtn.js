import React, { PureComponent } from 'react'
import RadioButton from '../Radio/RadioButton'
import PropTypes from 'prop-types'
import { btnTimeRange } from './constant'

export default class RangeBtn extends PureComponent {
  static propTypes = {
    /** 是否最大为7天 */
    max7d: PropTypes.bool,
    /** 默认值, 'seven_days'时间区间 */
    defaultValue: PropTypes.string,
    /** 回调 */
    onChange: PropTypes.func
  }
  render() {
    const { currentLocale = 'zh_CN', max7d, ...others } = this.props
    return <RadioButton options={btnTimeRange(currentLocale, max7d)} {...others}/>
  }
}
