import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';

import colors from '../config/colors';

export default function Footer () {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.carelulu.com')}
      >
        <Image
          style={styles.logo}
          source={require('../../assets/carelulu_logo_square_white.png')}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      <View style={styles.linkList}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.carelulu.com/about-us')}
        >
          <Text style={styles.linkList.link}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.carelulu.com/how-it-works')
          }
        >
          <Text style={styles.linkList.link}>How It Works</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.carelulu.com/contact-us')}
        >
          <Text style={styles.linkList.link}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 40
  },
  logo: {
    height: 150,
    width: 150
  },
  linkList: {
    alignItems: 'center',
    flexDirection: 'row',
    link: {
      padding: 5,
      color: colors.footerText
    }
  }
});
