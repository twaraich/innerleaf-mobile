import {useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {fonts, spacing} from '../constants/tokens';
import {weatherScenes} from '../constants/weather';

type Props = NativeStackScreenProps<RootStackParamList, 'Mood'>;

const {width, height} = Dimensions.get('window');

export function MoodScreen({navigation}: Props) {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
      >
        {weatherScenes.map((scene) => (
          <Pressable
            key={scene.key}
            onPress={() => {
              // TODO: persist mood selection in M3
              navigation.navigate('Write', {mood: scene.key});
            }}
          >
            <LinearGradient
              colors={scene.gradientColors}
              style={styles.scene}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            >
              <Text style={styles.symbol}>{scene.symbol}</Text>
              <Text style={styles.label}>{scene.labelNo}</Text>
              <Text style={styles.labelEn}>{scene.label}</Text>
              <Text style={styles.hint}>tap to select</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {weatherScenes.map((scene, i) => (
          <View key={scene.key} style={styles.dot} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  symbol: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.heading,
    fontSize: 36,
    color: '#1A1A1A',
    marginBottom: spacing.xs,
  },
  labelEn: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: '#3D3D3D',
    letterSpacing: 2,
    textTransform: 'lowercase',
    marginBottom: spacing.xl,
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: '#6B6B6B',
    opacity: 0.6,
  },
  dots: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(26, 26, 26, 0.3)',
  },
});
