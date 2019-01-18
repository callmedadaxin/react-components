import Modal from './Modal'
import confirm from './confirm'

Modal.alert = (msg, config = {}) => confirm({
  body: msg,
  isAlert: true,
  ...config
})

Modal.confirm = (msg, config = {}) => confirm({
  body: msg,
  ...config
})

export default Modal
