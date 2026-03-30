import {ActivityIndicator, View} from 'react-native';
import {useFonts} from 'expo-font';
import {
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
} from '@expo-google-fonts/dm-sans';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SQLiteProvider} from 'expo-sqlite';
import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from './src/contexts/ThemeContext';
import {AppNavigator} from './src/navigation/AppNavigator';
import {migrateDb} from './src/db/schema';
import {colors} from './src/constants/tokens';

export default function App() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_400Regular,
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.dark,
        }}
      >
        <ActivityIndicator color={colors.sage} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="innerleaf.db" onInit={migrateDb}>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
