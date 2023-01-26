import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as PropTypes from 'prop-types';
import Moment from 'moment';

import colors from '../config/colors';
import React from 'react';
import Todo from '../services/Todo';

const dateTimeRegex = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;

export default function TodoList ({ user, list, onChange }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [content, onChangeContent] = React.useState('');
  const [id, onChangeId] = React.useState();
  const [datetime, setDateTime] = React.useState('');
  const [errorMessage, onChangeMessage] = React.useState('');

  const editTodo = (item) => {
    setModalVisible(true);
    setDateTime(
      item.datetime ? Moment(item.datetime).format('MM.DD.YYYY HH:mm:ss') : ''
    );
    onChangeContent(item.content || '');
    onChangeId(item.id || '');
    onChangeMessage('');
  };

  const onSubmit = () => {
    onChangeMessage('');
    if (!content) {
      return onChangeMessage('Content is required');
    }
    if (!datetime) {
      return onChangeMessage('Date time is required');
    }
    const matches = datetime.match(dateTimeRegex);
    if (!matches) {
      return onChangeMessage('Invalid date time');
    } else {
      // Sanity check
      const month = parseInt(matches[1], 10) - 1; // months are 0-11
      const day = parseInt(matches[2], 10);
      const year = parseInt(matches[3], 10);
      const hour = parseInt(matches[4], 10);
      const minute = parseInt(matches[5], 10);
      const second = parseInt(matches[6], 10);
      const date = new Date(year, month, day, hour, minute, second);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day ||
        date.getHours() !== hour ||
        date.getMinutes() !== minute ||
        date.getSeconds() !== second
      ) {
        return onChangeMessage('Invalid date time');
      }
    }
    if (id) {
      Todo.update(id, { content, datetime })
        .then(() => {
          onChange();
          setModalVisible(false);
        })
        .catch((err) => {
          onChangeMessage(err?.message || 'Something went wrong');
        });
    } else {
      Todo.create({ content, datetime })
        .then(() => {
          onChange();
          setModalVisible(false);
        })
        .catch((err) => {
          onChangeMessage(err?.message || 'Something went wrong');
        });
    }
  };

  const markAsDone = () => {
    Todo.delete(id)
      .then(() => {
        onChange();
        setModalVisible(false);
      })
      .catch((err) => {
        onChangeMessage(err?.message || 'Something went wrong');
      });
  };

  const todoList = (list || [])
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    .map((item) => (
      <TouchableOpacity key={item.id} onPress={() => editTodo(item)}>
        <View style={styles.todoCard}>
          <Text style={styles.datetime}>
            {Moment(item.datetime).format('MM.DD.YYYY HH:mm:ss')}
          </Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.todoList}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {user?.username?.toUpperCase()} todo list
        </Text>
      </View>
      <Button
        title="Add Todo"
        style={styles.button}
        color={colors.primaryButton}
        onPress={() => editTodo({})}
      ></Button>
      {todoList}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.messageContainer}>
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
            <TextInput
              style={styles.input}
              value={content}
              onChangeText={onChangeContent}
              onSubmitEditing={onSubmit}
              placeholder="What would you like to do?"
            />
            <TextInput
              style={styles.input}
              value={datetime}
              onChangeText={setDateTime}
              onSubmitEditing={onSubmit}
              placeholder="MM.DD.YYYY HH:mm:ss"
            />
            <Button
              title={id ? 'Update' : 'Submit'}
              style={styles.button}
              color={colors.primaryButton}
              onPress={onSubmit}
            ></Button>
            {id
              ? (
              <Button
                title="Mark as Done"
                style={styles.button}
                color={colors.secondaryButton}
                onPress={markAsDone}
              ></Button>
                )
              : null}
            <Button
              title="Cancel"
              style={styles.button}
              color={colors.defaultButton}
              onPress={() => setModalVisible(false)}
            ></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

TodoList.propTypes = {
  list: PropTypes.array,
  user: PropTypes.object,
  onChange: PropTypes.func
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    color: colors.primaryText,
    fontSize: 25,
    padding: 10
  },
  todoList: {
    width: '100%',
    maxWidth: 500,
    padding: 20
  },
  todoCard: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 3,
    marginTop: 3
  },
  content: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.footerText
  },
  datetime: {
    textAlign: 'right',
    fontSize: 8,
    color: colors.footerText
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  error: {
    color: colors.error
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    maxWidth: 400
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.mutedText,
    padding: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex'
  }
});
