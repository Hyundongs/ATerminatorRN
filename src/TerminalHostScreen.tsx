import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TerminalView from './TerminalView';

export default function TerminalHostScreen({ credentials, onLogout }) {
  const [sessions, setSessions] = useState([Date.now()]);

  const handleAddSplit = () => {
    if (sessions.length < 4) setSessions([...sessions, Date.now()]);
  };

  const handleCloseSession = (idToRemove) => {
    const updated = sessions.filter(id => id !== idToRemove);
    if (updated.length === 0) onLogout();
    else setSessions(updated);
  };

  return (
    <View style={styles.container}>
      {/* Exit Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.exitButton} onPress={onLogout}>
          <Text style={styles.exitText}>Exit & Disconnect</Text>
        </TouchableOpacity>
      </View>

      {/* 가로 분할 레이아웃 */}
      <View style={styles.splitContainer}>
        {sessions.map((id) => (
          <View key={id} style={styles.terminalWrapper}>
            <TerminalView 
              credentials={credentials}
              onClose={() => handleCloseSession(id)}
              onSplit={handleAddSplit}
              showSplit={sessions.length < 4}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { backgroundColor: '#222', padding: 8, flexDirection: 'row', justifyContent: 'flex-end' },
  exitButton: { backgroundColor: '#444', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4 },
  exitText: { color: '#fff', fontWeight: 'bold' },
  splitContainer: { flex: 1, flexDirection: 'row' },
  terminalWrapper: { flex: 1, padding: 2 },
});
