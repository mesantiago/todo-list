import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as PropTypes from 'prop-types';

import Screen from '../components/Screen';
import User from '../services/User';
import UserList from '../components/UsersList';
import TodoList from '../components/TodoList';
import Todo from '../services/Todo';

function HomeScreen ({ user }) {
  const [users, onChangeUsers] = React.useState([]);
  const [todoList, onChangeTodoList] = React.useState([]);

  useEffect(() => {
    if (user) {
      updateTodoList();
      if (user?.roles?.includes('ROLE_ADMIN')) {
        updateUserList();
      }
    }
  }, []);

  const updateUserList = () =>
    User.getAll().then((response) => onChangeUsers(response.users));
  const updateTodoList = () =>
    Todo.getAll().then((response) => onChangeTodoList(response.todo));

  return (
    <Screen>
      <View style={styles.home}>
        <TodoList user={user} list={todoList} onChange={updateTodoList} />
        {user?.roles?.includes('ROLE_ADMIN') ? <UserList list={users} /> : null}
      </View>
    </Screen>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object
};

export default HomeScreen;

const styles = StyleSheet.create({
  home: {
    alignItems: 'center'
  }
});
