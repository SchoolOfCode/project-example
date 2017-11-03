import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  const style = {
    incomplete: {
      color: 'red',
    },
    complete: {
      color: 'green',
    },
  };
  return (
    <ul>
      {props.items.map((item, index) => (
        <li key={index}>
          {item.todo}
          <button
            style={style[item.complete ? 'complete' : 'incomplete']}
            onClick={() => props.onComplete(index)}
          >
            {item.complete ? 'Done' : 'To Do'}
          </button>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    todo: PropTypes.string,
    complete: PropTypes.bool,
  })).isRequired,
};

export default List;
