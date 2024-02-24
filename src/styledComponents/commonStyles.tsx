import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

interface Styles {
  headerText: TextStyle
  input: ViewStyle
  btnContainer: ViewStyle
  helperTextContainer: ViewStyle
  helperText: TextStyle
  row: ViewStyle
  textLabel: TextStyle
  button: ViewStyle
  iconContainer: ViewStyle
  container: ViewStyle
  title: ViewStyle
  containerGTINandArticleNumber: ViewStyle
  centeredView: ViewStyle
}

const commonStyles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 24,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center'
  },
  input: {
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 12,
    height: 42,
    borderRadius: 5
  },

  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  helperTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
    height: 24
  },
  helperText: {
    fontSize: 12,
    color: 'gray',
    paddingHorizontal: 5,
    backgroundColor: 'white'
  },
  row: {
    height: 51
  },
  textLabel: {
    fontSize: 24,
    marginBottom: 30
  },
  button: {
    flexDirection: 'row'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 110,
    width: '45%',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fefefe',
    elevation: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  containerGTINandArticleNumber: {
    marginTop: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default commonStyles
