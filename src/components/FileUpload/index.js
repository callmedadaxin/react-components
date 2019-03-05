import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useControlledInputs } from "../../common/hooks";
import Input from "../Input";
import Button from "../Button";
import { nfn } from "../../common";

const mapDefaultToValue = v => ({ name: v });
const mapValuetoValue = e => e.target.files[0];

/**
 * 文件上传模块
 */
export default function FileUpload({
  defaultValue,
  onChange,
  hasError,
  className,
  style
}) {
  const inputRef = useRef(null);
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue
  });

  const selectFiles = () => {
    inputRef.current.click();
  };

  const classes = classNames("file-upload", className);
  return (
    <div className={classes} style={style}>
      <input type="file" onChange={handleChange} className="file-upload-hide" />
      <Input
        hasError={hasError}
        disabled
        defaultValue={value.name}
        className="file-upload-name"
      />
      <Button
        type="secondary"
        className="file-upload-button"
        onClick={selectFiles}
      >
        选择上传文件
      </Button>
    </div>
  );
}

FileUpload.defaultProps = {
  onChange: nfn
};
FileUpload.propTypes = {
  /** 事件回调 */
  onChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 是否Error, 自带error样式 */
  hasError: PropTypes.bool
};
