import {useEffect, useRef} from 'react';
import {View, Text, Pressable, Animated, StyleSheet, Dimensions} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {useTheme} from '../contexts/ThemeContext';
import {fonts, spacing} from '../constants/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Stillhet'>;

// 4-7-8 breathing pattern (seconds)
const INHALE = 4000;
const HOLD = 7000;
const EXHALE = 8000;
const CYCLE = INHALE + HOLD + EXHALE;

type Phase = 'inhale' | 'hold' | 'exhale';

const {width} = Dimensions.get('window');
const CIRCLE_MAX = width * 0.55;
const CIRCLE_MIN = width * 0.2;

export function StillhetScreen({navigation}: Props) {
  const {colors} = useTheme();
  const scale = useRef(new Animated.Value(0)).current;
  const phaseOpacity = useRef(new Animated.Value(0)).current;
  const hintOpacity = useRef(new Animated.Value(0)).current;
  const phaseRef = useRef<Phase>('inhale');
  const phaseText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in hint after 3 seconds
    const hintTimer = setTimeout(() => {
      Animated.timing(hintOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 3000);

    // Fade in breathing phase text
    Animated.timing(phaseOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Start breathing loop
    const breathe = () => {
      Animated.sequence([
        // Inhale — expand
        Animated.timing(scale, {
          toValue: 1,
          duration: INHALE,
          useNativeDriver: true,
        }),
        // Hold — pause
        Animated.delay(HOLD),
        // Exhale — contract
        Animated.timing(scale, {
          toValue: 0,
          duration: EXHALE,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) breathe();
      });
    };

    // Phase text animation — tracks which phase we're in
    const phaseLoop = () => {
      Animated.sequence([
        Animated.timing(phaseText, {toValue: 0, duration: 0, useNativeDriver: false}),
        Animated.delay(INHALE),
        Animated.timing(phaseText, {toValue: 1, duration: 0, useNativeDriver: false}),
        Animated.delay(HOLD),
        Animated.timing(phaseText, {toValue: 2, duration: 0, useNativeDriver: false}),
        Animated.delay(EXHALE),
      ]).start(({finished}) => {
        if (finished) phaseLoop();
      });
    };

    breathe();
    phaseLoop();

    // Track phase for text display
    const listenerId = phaseText.addListener(({value}) => {
      if (value < 0.5) phaseRef.current = 'inhale';
      else if (value < 1.5) phaseRef.current = 'hold';
      else phaseRef.current = 'exhale';
    });

    return () => {
      clearTimeout(hintTimer);
      scale.stopAnimation();
      phaseText.stopAnimation();
      phaseText.removeListener(listenerId);
    };
  }, []);

  const circleScale = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCLE_MIN / CIRCLE_MAX, 1],
  });

  const circleOpacity = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  // Map phase value to text
  const inhaleOpacity = phaseText.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const holdOpacity = phaseText.interpolate({
    inputRange: [0.5, 1, 1.5],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });
  const exhaleOpacity = phaseText.interpolate({
    inputRange: [1.5, 2, 2.5],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  });

  return (
    <Pressable
      style={[styles.container, {backgroundColor: colors.background}]}
      onPress={() => navigation.navigate('Mood')}
    >
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.text}]}>Stillhet</Text>

        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor: colors.accent,
                opacity: circleOpacity,
                transform: [{scale: circleScale}],
              },
            ]}
          />
        </View>

        <Animated.View style={[styles.phaseContainer, {opacity: phaseOpacity}]}>
          <Animated.Text
            style={[styles.phase, {color: colors.textSecondary, opacity: inhaleOpacity}]}
          >
            breathe in
          </Animated.Text>
          <Animated.Text
            style={[
              styles.phase,
              {color: colors.textSecondary, opacity: holdOpacity, position: 'absolute'},
            ]}
          >
            hold
          </Animated.Text>
          <Animated.Text
            style={[
              styles.phase,
              {color: colors.textSecondary, opacity: exhaleOpacity, position: 'absolute'},
            ]}
          >
            breathe out
          </Animated.Text>
        </Animated.View>
      </View>

      <Animated.Text
        style={[styles.hint, {color: colors.textSecondary, opacity: hintOpacity}]}
      >
        tap anywhere to continue
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 40,
    marginBottom: spacing.xl,
  },
  circleContainer: {
    width: CIRCLE_MAX,
    height: CIRCLE_MAX,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  circle: {
    width: CIRCLE_MAX,
    height: CIRCLE_MAX,
    borderRadius: CIRCLE_MAX / 2,
  },
  phaseContainer: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phase: {
    fontFamily: fonts.body,
    fontSize: 16,
    letterSpacing: 2,
    textTransform: 'lowercase',
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 13,
    marginBottom: spacing.xxl,
  },
});
