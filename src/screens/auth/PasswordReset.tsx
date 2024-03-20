import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useAuth } from 'src/provider/AuthProvider' // Ažurirajte putanju ako je potrebno

const PasswordReset = () => {
  const { passwordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.')
      return
    }

    try {
      setLoading(true)
      const response = await passwordReset(email)
      if (response && response.error) {
        throw new Error(response.error.message)
      }
      Alert.alert('Success', 'Password reset email has been sent.')
    } catch (e) {
      console.error(e)
      Alert.alert('Error', e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Reset</Text>
      <TextInput
        style={styles.input}
        placeholder="Your email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        editable={!loading}
      />
      <TouchableOpacity onPress={handleSubmit} disabled={loading} style={styles.button}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => {
          /* Navigacija nazad na Login */
        }}>
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
  loginLink: {
    marginTop: 15
  },
  loginText: {
    color: '#007bff'
  }
})

export default PasswordReset
