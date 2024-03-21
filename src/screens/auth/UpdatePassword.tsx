// UpdatePassword.js
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const UpdatePassword = () => {
  const navigation = useNavigation()
  const route = useRoute() // Dodajte ovu liniju
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const token = route.params?.token // Modifikovano da koristi `route.params`
  console.log('token UpdatePassword', token)

  const handleSubmit = async () => {
    // U UpdatePassword komponenti
    const token = (route?.params as { token?: string })?.token
    console.log('token', token)
    if (!password || !confirmPassword) {
      setErrorMsg('Please fill all the fields')
      return
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match. Try again")
      return
    }
    if (!token) {
      setErrorMsg('Access token is missing.')
      return
    }

    setLoading(true)
    try {
      const { error } = await updatePassword(token, password)
      if (error) {
        console.log('errore', error)
        setErrorMsg(error.message)
        setSuccess(false)
      } else {
        setSuccess(true)
        navigation.navigate('Login')
      }
    } catch (error) {
      setErrorMsg('Error in Updating Password. Please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
      {success ? (
        <Text style={styles.successMsg}>Password updated successfully</Text>
      ) : (
        <>
          <Text style={styles.title}>Update Password</Text>
          <TextInput
            secureTextEntry
            placeholder="New Password"
            onChangeText={setPassword}
            value={password}
            style={styles.input}
          />
          <TextInput
            secureTextEntry
            placeholder="Confirm New Password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    color: '#fff'
  },
  errorMsg: {
    marginBottom: 10,
    color: '#ff0000'
  },
  successMsg: {
    color: '#4CAF50'
  }
})

export default UpdatePassword
