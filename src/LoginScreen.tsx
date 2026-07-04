import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';

export default function LoginScreen({ onConnect }) {
  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [port, setPort] = useState('22');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleConnect = () => {
    if (host && user && pass) {
      onConnect({ host, user, pass, port: parseInt(port, 10) });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>ATerminator</Text>
        
        <TextInput style={styles.input} placeholder="IP Address / Host" placeholderTextColor="#888" value={host} onChangeText={setHost} />
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#888" value={user} onChangeText={setUser} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" value={pass} onChangeText={setPass} secureTextEntry />

        <View style={styles.advancedRow}>
          <Text style={styles.advancedText}>Advanced Options</Text>
          <Switch value={showAdvanced} onValueChange={setShowAdvanced} />
        </View>

        {showAdvanced && (
          <TextInput style={styles.input} placeholder="Port (Default: 22)" placeholderTextColor="#888" value={port} onChangeText={setPort} keyboardType="numeric" />
        )}

        <TouchableOpacity style={styles.button} onPress={handleConnect}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  card: { width: 400, backgroundColor: '#222', padding: 24, borderRadius: 8 },
  title: { fontSize: 24, color: '#4CAF50', fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: '#333', color: '#fff', padding: 12, borderRadius: 4, marginBottom: 16 },
  advancedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  advancedText: { color: '#ccc' },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 4, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
