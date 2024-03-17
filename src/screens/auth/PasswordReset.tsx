import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useAuth } from 'src/provider/AuthProvider'

const PasswordReset = () => {
  const { passwordReset } = useAuth()
  const emailRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { data, error } = await passwordReset(emailRef.current?.value || '')
      console.log(error)
      console.log(data)
      setMsg('Password reset has been sent to your email')

      Alert.alert('Success', 'Password reset email has been sent.')
    } catch (e) {
      console.log(e)
      Alert.alert('Error', 'An error occurred while trying to reset the password.')
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Reset</Text>
      {msg ? (
        <Text style={styles.message}>{msg}</Text>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            keyboardType="email-address"
            ref={emailRef}
            editable={!loading}
          />
          <TouchableOpacity onPress={handleSubmit} disabled={loading} style={styles.button}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.loginLink}>
        <Text style={styles.loginText}>Back to Login?</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff'
  },
  message: {
    padding: 15,
    marginBottom: 20,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    color: '#4CAF50'
  },
  loginLink: {
    marginTop: 15
  },
  loginText: {
    color: '#007bff'
  }
})

export default PasswordReset
