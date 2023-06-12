import React from 'react'
import styles from './alert.module.css'
import { motion } from 'framer-motion';


const Modal = ({ title, message, onClose, onConfirm }) => {
  return (
    <motion.div className={styles["modal"]}
    >
      <div className={styles["modal-content"]}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles["modal-buttons"]}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Exit</button>
        </div>
      </div>
    </motion.div >
  );
};

export default Modal;
