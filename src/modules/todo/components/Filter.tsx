import React from 'react';
import styles from '../Todo.module.css';

type FilterProps = {
  filterType: string,
  onClick: (type: string) => void
}

const Filter: React.SFC<FilterProps> = ({
  filterType,
  onClick
}) => {
  const filterNodes = [
    { label :'All', type: 'SHOW_ALL' },
    { label :'Completed', type: 'SHOW_COMPLETED' },
    { label :'Active', type: 'SHOW_ACTIVE' }
  ]
    .map((item, idx) => {
      return (
        <button
          key={idx}
          className={styles.btn}
          onClick={() => onClick(item.type)}
          disabled={filterType == item.type}
        >{item.label}</button>
      );
    });

  return (
    <div className={styles.filter}>
      <span>Filter: </span>
      {filterNodes}
    </div>
  );
};

export default Filter;
