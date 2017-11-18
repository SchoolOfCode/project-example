import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import EmptyCheckBox from 'material-ui/svg-icons/toggle/check-box-outline-blank';

const MyList = (props) => (
  <List>
    {props.items.map((item, index) => (
      <ListItem
        key={index}
        primaryText={item.title}
        rightIcon={<IconButton onClick={() => props.onDelete(index)}>
          <Delete />
        </IconButton>}
      >
        <IconButton
          onClick={() => props.onComplete(index)}
        >
          {item.complete ? <CheckBox /> : <EmptyCheckBox />}
        </IconButton>
      </ListItem>
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
