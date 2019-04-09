import React from 'react';
import cx from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types";
import styles from "./IconBtn.module.scss";
import {
  faTrashAlt,
  faPlus,
  faMinus,
  faCaretDown,
  faCaretLeft,
  faPencilAlt,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTrashAlt,
  faPlus,
  faMinus,
  faCaretDown,
  faCaretLeft,
  faPencilAlt,
  faChevronLeft
);

export default function IconBtn({ clickHandler, handlerId, icon, label, alignRight, large, classNames }){
  return (
    <button
      onClick={clickHandler}
      handler-id={handlerId}
      aria-label={label}
      type="button"
      className={cx(["border-0 bg-transparent", { "fa-lg": large }, classNames])}>
      <FontAwesomeIcon role="button" icon={icon} className={styles.icon}/>
    </button>
  )
}

IconBtn.propTypes = {
  clickHandler: PropTypes.func,
  handlerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

