import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

const DrawerToggleButton = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <FontAwesome name="bars" size={24} color="black" />
    </TouchableOpacity>
  )
}

export default DrawerToggleButton
