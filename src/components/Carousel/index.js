import React, {
  Children,
  cloneElement,
  useRef,
  useState,
  useEffect
} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import debounce from "lodash/debounce";
import { nfn } from "../../common";

const useSize = ref => {
  const [size, setSize] = useState({});

  useEffect(() => {
    const getSize = debounce(() => {
      const current = ref.current;
      const size =
        current &&
        current.getBoundingClientRect &&
        current.getBoundingClientRect();
      if (size) {
        setSize(size);
      }
    }, 200);

    window.addEventListener("resize", getSize);

    getSize();

    return () => window.removeEventListener("resize", getSize);
  }, []);

  return [size, setSize];
};

function Carousel({ children, padding, className, onChange, afterChange }) {
  const ref = useRef();
  const [size] = useSize(ref);
  const [index, setIndex] = useState(0);

  const handleIndexChange = (i, count) => {
    if (i < 0 || i >= count) return;

    setIndex(i);
    onChange(i, count);

    setTimeout(() => {
      afterChange(i, count);
    }, 1000);
  };

  const { width } = size;
  const cls = cx("carousel", className);
  const count = Children.count(children);
  const left = (width + padding) * index;

  const prevCls = cx("carousel-prev", {
    disabled: index <= 0
  });
  const nextCls = cx("carousel-next", {
    disabled: index >= count - 1
  });

  return (
    <div className={cls}>
      <div
        className={prevCls}
        onClick={() => handleIndexChange(index - 1, count)}
      >
        <i className="icon-arrow" />
      </div>
      <div className="carousel-inner-wrap">
        <div ref={ref}>
          <div
            className="carousel-inner"
            style={{
              width: count * (width + padding),
              transform: `translateX(-${left}px)`
            }}
          >
            {Children.map(children, child =>
              cloneElement(child, {
                style: {
                  ...child.props.style,
                  marginRight: padding,
                  width
                }
              })
            )}
          </div>
        </div>
      </div>
      <div
        className={nextCls}
        onClick={() => handleIndexChange(index + 1, count)}
      >
        <i className="icon-arrow" />
      </div>
    </div>
  );
}

Carousel.propTypes = {
  /** 子内容之间的间距 */
  padding: PropTypes.num,
  /** 切换的回调 */
  onChange: PropTypes.func,
  /** 切换动画结束后的回调 */
  afterChange: PropTypes.func
};

Carousel.defaultProps = {
  padding: 10,
  onChange: nfn,
  afterChange: nfn
};

export default Carousel;
