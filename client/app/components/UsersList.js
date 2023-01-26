import { StyleSheet, Text, View } from 'react-native';
import * as PropTypes from 'prop-types';

import colors from '../config/colors';

export default function UserList ({ list }) {
  const users = (list || []).map((item) => (
    <View style={styles.usercard} key={item.username}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.email}> - {item.email}</Text>
    </View>
  ));

  return (
    <View style={styles.usersList}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Users list</Text>
      </View>
      {users}
    </View>
  );
}

UserList.propTypes = {
  list: PropTypes.array
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
  usersList: {
    width: '100%',
    maxWidth: 500,
    padding: 20
  },
  usercard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 3,
    marginBottom: 3
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  email: {
    color: colors.footerText
  }
});
