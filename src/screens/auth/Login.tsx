import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from 'src/provider/AuthProvider'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const { login } = useAuth()

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMsg('Please fill in the fields')
      return
    }

    setLoading(true)
    try {
      const { error } = await login(email, password)

      if (error) {
        setErrorMsg(error.message)
      } else {
        // Navigate to another screen upon successful login
        navigation.navigate('Home') // Adjust 'HomeScreen' to your actual home screen route name
      }
    } catch (error) {
      setErrorMsg('Failed to log in. Email or Password Incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your account</Text>
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail} // Update the email state on change
        value={email} // Bind the email state to the input value
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword} // Update the password state on change
        value={password} // Bind the password state to the input value
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
        <Text style={styles.linkText}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>New User? Register</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff'
  },
  error: {
    color: 'red'
  },
  linkText: {
    color: '#007bff',
    marginTop: 15
  }
})

export default Login
