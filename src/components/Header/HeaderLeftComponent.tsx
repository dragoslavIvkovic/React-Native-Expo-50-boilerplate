import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { RootStackParamList } from '@navigation/RootStackPrams'

const HeaderLeftComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <View style={styles.headerLeftStyle}>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.menuButton}>
        <Icon name="arrow-left" size={27} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerLeftStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuButton: {
    left: 12
  }
})

export default HeaderLeftComponent
