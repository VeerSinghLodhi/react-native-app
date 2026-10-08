
import { Stack } from 'expo-router';
import { TasksProvider } from '../context/TasksContext';

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563EB',
          },
          headerTintColor: '#FFFFFF',
          contentStyle: {
            backgroundColor: '#F8FAFC',
          },
        }}
      />
    </TasksProvider>
  );
}