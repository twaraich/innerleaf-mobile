import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StillhetScreen} from '../screens/StillhetScreen';
import {MoodScreen} from '../screens/MoodScreen';
import {WriteScreen} from '../screens/WriteScreen';
import type {MoodType} from '../constants/tokens';

export type RootStackParamList = {
  Stillhet: undefined;
  Mood: undefined;
  Write: {mood?: MoodType};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Stillhet"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {backgroundColor: 'transparent'},
      }}
    >
      <Stack.Screen name="Stillhet" component={StillhetScreen} />
      <Stack.Screen name="Mood" component={MoodScreen} />
      <Stack.Screen name="Write" component={WriteScreen} />
    </Stack.Navigator>
  );
}
