import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import LoginScreen from './src/LoginScreen';
import TerminalHostScreen from './src/TerminalHostScreen';

export default function App() {
  const [credentials, setCredentials] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {!credentials ? (
        <LoginScreen onConnect={(creds) => setCredentials(creds)} />
      ) : (
        <TerminalHostScreen 
          credentials={credentials} 
          onLogout={() => setCredentials(null)} 
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});
