import React, { FC } from 'react';
import SearchGenerator from './SearchGenerator';
import styles from './App.module.css'

const App: FC = () => {
  return (
    <div className={styles.App}><SearchGenerator/></div>
    )
};

export default App;
