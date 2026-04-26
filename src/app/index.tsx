import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <Text style={{
        textAlign: 'center',
      }}>
        Run "npx expo start --dev-client" and scan. Done!
      </Text>
    </SafeAreaView>
  );
}
