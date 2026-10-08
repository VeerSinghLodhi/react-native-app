
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Application</Text>
        <Text style={styles.value}>Daily Tasks</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Version</Text>
        <Text style={styles.value}>1.0.0</Text>
      </View>

      <Text style={styles.footer}>
        Manage your daily routine easily.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1E293B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 6,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
  footer: {
    marginTop: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});