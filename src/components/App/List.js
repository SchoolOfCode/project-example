import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import EmptyCheckBox from 'material-ui/svg-icons/toggle/check-box-outline-blank';

const MyList = (props) => (
  <List>
    {props.items.map((item, index) => (
      <ListItem
        key={index}
        primaryText={item.todo}
        rightIcon={<IconButton>
          {item.complete ? <CheckBox /> : <EmptyCheckBox />}
        </IconButton>}
        onClick={() => props.onComplete(index)}
      />
    ))}
  </List>
);

MyList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    todo: PropTypes.string,
    complete: PropTypes.bool,
  })).isRequired,
};

export default MyList;
