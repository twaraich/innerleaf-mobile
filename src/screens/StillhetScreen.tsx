import {useEffect, useRef, useState} from 'react';
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

type Phase = 'inhale' | 'hold' | 'exhale';

const PHASE_LABEL: Record<Phase, string> = {
  inhale: 'breathe in',
  hold: 'hold',
  exhale: 'breathe out',
};

const {width} = Dimensions.get('window');
const CIRCLE_MAX = width * 0.55;
const CIRCLE_MIN = width * 0.2;

export function StillhetScreen({navigation}: Props) {
  const {colors} = useTheme();
  const scale = useRef(new Animated.Value(0)).current;
  const hintOpacity = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState<Phase>('inhale');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Fade in hint after 3 seconds
    const hintTimer = setTimeout(() => {
      setShowHint(true);
      Animated.timing(hintOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 3000);

    let cancelled = false;

    // Breathing loop using state for phase text (reliable) + Animated for circle
    const breathe = () => {
      if (cancelled) return;
      setPhase('inhale');
      Animated.timing(scale, {
        toValue: 1,
        duration: INHALE,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (!finished || cancelled) return;
        setPhase('hold');
        setTimeout(() => {
          if (cancelled) return;
          setPhase('exhale');
          Animated.timing(scale, {
            toValue: 0,
            duration: EXHALE,
            useNativeDriver: true,
          }).start(({finished: f2}) => {
            if (f2 && !cancelled) breathe();
          });
        }, HOLD);
      });
    };

    breathe();

    return () => {
      cancelled = true;
      clearTimeout(hintTimer);
      scale.stopAnimation();
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

        <View style={styles.phaseContainer}>
          <Text style={[styles.phase, {color: colors.textSecondary}]}>
            {PHASE_LABEL[phase]}
          </Text>
        </View>
      </View>

      {showHint && (
        <Animated.Text
          style={[styles.hint, {color: colors.textSecondary, opacity: hintOpacity}]}
        >
          tap anywhere to continue
        </Animated.Text>
      )}
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
