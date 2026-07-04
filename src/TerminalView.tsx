import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import SSHClient from 'react-native-ssh-sftp'; // 실제 프로젝트시 주석 해제

export default function TerminalView({ credentials, onClose, onSplit, showSplit }) {
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const clientRef = useRef(null);
  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const connectSSH = async () => {
      try {
        // Mocking the SSH connection for GitHub upload template
        // clientRef.current = new SSHClient(credentials.host, credentials.port, credentials.user, credentials.pass);
        // await clientRef.current.connect();
        // await clientRef.current.startShell('vt100');
        // clientRef.current.on('Shell', (event) => setOutput(prev => prev + event));

        // Mock output logic
        setOutput(`Connecting to ${credentials.host}...\nConnected successfully!\n\n${credentials.user}@${credentials.host}:~$ `);

      } catch (error) {
        setOutput(`\nConnection Error: ${error.message}\n`);
      }
    };

    connectSSH();
    return () => {
      // clientRef.current?.disconnect();
    };
  }, []);

  const handleCommandSubmit = async () => {
    // if (clientRef.current) {
    //   await clientRef.current.writeToShell(input + '\n');
    // }
    
    // Mock echo behavior
    setOutput(prev => prev + input + '\n' + credentials.user + '@' + credentials.host + ':~$ ');
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarText}>{credentials.user}@{credentials.host}</Text>
        <View style={styles.actions}>
          {showSplit && (
            <TouchableOpacity onPress={onSplit} style={styles.iconBtn}>
              <Text style={styles.iconText}>+</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
            <Text style={[styles.iconText, { color: '#FF5555' }]}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.terminalBody} 
        activeOpacity={1} 
        onPress={() => inputRef.current?.focus()}
      >
        <ScrollView 
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        >
          <Text style={styles.terminalText}>
            {output}
            <Text style={styles.inputText}>{input}</Text>
            <Text style={styles.cursor}>_</Text>
          </Text>
        </ScrollView>

        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleCommandSubmit}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={false} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E', borderRadius: 4, overflow: 'hidden' },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#333', padding: 8 },
  toolbarText: { color: '#ccc', fontSize: 12 },
  actions: { flexDirection: 'row' },
  iconBtn: { paddingHorizontal: 12 },
  iconText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  terminalBody: { flex: 1, padding: 8 },
  terminalText: { color: '#4CAF50', fontFamily: 'monospace', fontSize: 14 },
  inputText: { color: '#FFF' },
  cursor: { color: '#4CAF50' },
  hiddenInput: { width: 0, height: 0, opacity: 0 },
});
