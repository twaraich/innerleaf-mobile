import {useEffect, useRef} from 'react';
import {View, Text, Pressable, Animated, StyleSheet, Dimensions} from 'react-native';
import Svg, {Circle, Defs, RadialGradient, Stop} from 'react-native-svg';
import {useSQLiteContext} from 'expo-sqlite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {useTheme} from '../contexts/ThemeContext';
import {getAllEntries, type JournalEntry} from '../db/entries';
import type {MoodType} from '../constants/tokens';
import {fonts, spacing} from '../constants/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Arringer'>;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const MAX_RADIUS = Math.min(SCREEN_WIDTH * 0.42, 160);
const SVG_SIZE = MAX_RADIUS * 2 + 40; // padding around the tree
const CENTER = SVG_SIZE / 2;

/**
 * Ring properties derived from mood.
 * Every mood produces a valid ring — no mood is "better".
 * The variation is organic, like real tree growth rings.
 */
function ringPropsForMood(mood: MoodType | null): {
  thickness: number;
  opacity: number;
  color: string;
} {
  switch (mood) {
    case 'sunny':
      return {thickness: 3.5, opacity: 0.55, color: '#8B7355'}; // warm brown, wider growth
    case 'cloudy':
      return {thickness: 2.5, opacity: 0.45, color: '#7A7A6E'}; // muted grey-brown
    case 'rainy':
      return {thickness: 3.0, opacity: 0.50, color: '#5E6B5A'}; // greenish-brown, nourished
    case 'stormy':
      return {thickness: 1.8, opacity: 0.60, color: '#4A3F35'}; // dark, dense, tight grain
    case 'foggy':
      return {thickness: 2.2, opacity: 0.35, color: '#9E9685'}; // pale, diffused
    default:
      // No mood recorded — still a valid ring
      return {thickness: 2.0, opacity: 0.40, color: '#7D7468'};
  }
}

/**
 * Compute ring radii from entries (oldest = innermost).
 * We distribute rings from a small pith outward to MAX_RADIUS.
 */
function computeRings(entries: JournalEntry[]) {
  if (entries.length === 0) return [];

  // Entries come newest-first from the DB; reverse to oldest-first
  const oldest = [...entries].reverse();

  const PITH_RADIUS = 8; // small center heartwood
  const available = MAX_RADIUS - PITH_RADIUS;

  // Calculate total thickness to see if we need to scale
  const rawRings = oldest.map((e) => ringPropsForMood(e.mood as MoodType | null));
  const totalThickness = rawRings.reduce((sum, r) => sum + r.thickness, 0);

  // Scale factor so all rings fit within available space
  const scale = totalThickness > available ? available / totalThickness : 1;
  // If rings are sparse, add spacing between them
  const gap = totalThickness * scale < available * 0.5 && oldest.length > 1
    ? Math.min((available - totalThickness * scale) / oldest.length, 4)
    : 0;

  let currentRadius = PITH_RADIUS;
  return oldest.map((entry, i) => {
    const props = rawRings[i];
    const thickness = props.thickness * scale;
    const radius = currentRadius + thickness / 2;
    currentRadius += thickness + gap;
    return {
      id: entry.id,
      radius,
      strokeWidth: thickness,
      opacity: props.opacity,
      color: props.color,
      mood: entry.mood as MoodType | null,
      date: entry.created_at,
    };
  });
}

export function ArringerScreen({navigation}: Props) {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const entries = getAllEntries(db);
  const rings = computeRings(entries);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {paddingTop: insets.top + spacing.md}]}>
        <Text style={[styles.title, {color: colors.text}]}>
          Årringer
        </Text>
      </View>

      <Animated.View style={[styles.treeContainer, {opacity: fadeAnim}]}>
        {rings.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyPith}>
              <Svg width={80} height={80}>
                <Defs>
                  <RadialGradient id="pithGrad" cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor="#8B7355" stopOpacity="0.6" />
                    <Stop offset="100%" stopColor="#5E5040" stopOpacity="0.2" />
                  </RadialGradient>
                </Defs>
                <Circle cx={40} cy={40} r={12} fill="url(#pithGrad)" />
                <Circle
                  cx={40}
                  cy={40}
                  r={18}
                  stroke="#7D7468"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.3}
                />
              </Svg>
            </View>
            <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
              Your first entry will become{'\n'}the heartwood of this tree.
            </Text>
          </View>
        ) : (
          <Svg width={SVG_SIZE} height={SVG_SIZE}>
            <Defs>
              <RadialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#8B7355" stopOpacity="0.7" />
                <Stop offset="100%" stopColor="#5E5040" stopOpacity="0.3" />
              </RadialGradient>
            </Defs>

            {/* Heartwood / pith — the center of the tree */}
            <Circle cx={CENTER} cy={CENTER} r={7} fill="url(#coreGrad)" />

            {/* Growth rings */}
            {rings.map((ring) => (
              <Circle
                key={ring.id}
                cx={CENTER}
                cy={CENTER}
                r={ring.radius}
                stroke={ring.color}
                strokeWidth={ring.strokeWidth}
                fill="none"
                opacity={ring.opacity}
              />
            ))}
          </Svg>
        )}
      </Animated.View>

      <View style={[styles.footer, {paddingBottom: insets.bottom + spacing.md}]}>
        {rings.length > 0 && (
          <Text style={[styles.footerText, {color: colors.textSecondary}]}>
            {rings.length} {rings.length === 1 ? 'ring' : 'rings'}
          </Text>
        )}
      </View>

      {/* Back button */}
      <Pressable
        style={[styles.backButton, {top: insets.top + spacing.md}]}
        onPress={() => navigation.goBack()}
        hitSlop={16}
      >
        <Text style={[styles.backText, {color: colors.textSecondary}]}>
          back
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 36,
    letterSpacing: 1,
  },
  treeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyPith: {
    marginBottom: spacing.lg,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    opacity: 0.7,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    fontFamily: fonts.body,
    fontSize: 13,
    opacity: 0.5,
  },
  backButton: {
    position: 'absolute',
    left: spacing.lg,
  },
  backText: {
    fontFamily: fonts.body,
    fontSize: 14,
    letterSpacing: 1,
  },
});
