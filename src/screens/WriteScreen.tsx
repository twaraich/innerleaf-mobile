import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useState, useEffect, useCallback, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSQLiteContext} from 'expo-sqlite';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {useTheme} from '../contexts/ThemeContext';
import {useAutoSave} from '../hooks/useAutoSave';
import {
  getTodayEntry,
  createEntry,
  updateEntryText,
  type JournalEntry,
} from '../db/entries';
import {fonts, spacing, mood as moodData} from '../constants/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Write'>;

export function WriteScreen({route}: Props) {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const entryRef = useRef<JournalEntry | null>(null);

  const selectedMood = route.params?.mood ?? null;
  const moodInfo = selectedMood ? moodData[selectedMood] : null;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Load or create today's entry
  useEffect(() => {
    const existing = getTodayEntry(db);
    if (existing) {
      entryRef.current = existing;
      setText(existing.text);
    } else {
      entryRef.current = createEntry(db, selectedMood);
    }
  }, []);

  const handleSave = useCallback(
    (value: string) => {
      if (!entryRef.current) return;
      updateEntryText(db, entryRef.current.id, value);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    },
    [db],
  );

  useAutoSave(text, handleSave);

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.inner, {paddingTop: insets.top + spacing.lg}]}>
        <View style={styles.header}>
          <Text style={[styles.date, {color: colors.textSecondary}]}>
            {new Date().toLocaleDateString('nb-NO', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </Text>
          {moodInfo && (
            <Text style={[styles.mood, {color: colors.textSecondary}]}>
              {moodInfo.emoji}
            </Text>
          )}
        </View>

        <TextInput
          style={[styles.input, {color: colors.text}]}
          value={text}
          onChangeText={setText}
          placeholder="Begin writing..."
          placeholderTextColor={colors.textSecondary}
          multiline
          textAlignVertical="top"
          autoFocus
        />

        <View style={[styles.footer, {paddingBottom: insets.bottom + spacing.sm}]}>
          {saved && (
            <Text style={[styles.savedIndicator, {color: colors.textSecondary}]}>
              saved
            </Text>
          )}
          <View style={{flex: 1}} />
          <Pressable
            onPress={() => nav.navigate('Arringer')}
            hitSlop={12}
            style={styles.arringerButton}
          >
            <Text style={[styles.arringerLabel, {color: colors.textSecondary}]}>
              arringer
            </Text>
          </Pressable>
          {wordCount > 0 && (
            <Text style={[styles.wordCount, {color: colors.textSecondary}]}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  date: {
    fontFamily: fonts.body,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  mood: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 26,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  savedIndicator: {
    fontFamily: fonts.body,
    fontSize: 12,
    opacity: 0.5,
  },
  wordCount: {
    fontFamily: fonts.body,
    fontSize: 12,
    opacity: 0.5,
  },
  arringerButton: {
    marginRight: spacing.md,
  },
  arringerLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    opacity: 0.5,
    letterSpacing: 1,
  },
});
