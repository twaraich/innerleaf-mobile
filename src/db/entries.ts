import type {SQLiteDatabase} from 'expo-sqlite';
import type {MoodType} from '../constants/tokens';

export interface JournalEntry {
  id: string;
  mood: MoodType | null;
  text: string;
  created_at: string;
  updated_at: string;
}

function generateId(): string {
  const now = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${now}-${random}`;
}

/** Get today's date as YYYY-MM-DD in local time */
function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Find today's entry if one exists */
export function getTodayEntry(db: SQLiteDatabase): JournalEntry | null {
  const prefix = todayKey();
  const row = db.getFirstSync<JournalEntry>(
    'SELECT * FROM entries WHERE created_at LIKE ? ORDER BY created_at DESC LIMIT 1',
    [`${prefix}%`],
  );
  return row ?? null;
}

/** Create a new entry */
export function createEntry(
  db: SQLiteDatabase,
  mood: MoodType | null,
): JournalEntry {
  const now = new Date().toISOString();
  const entry: JournalEntry = {
    id: generateId(),
    mood,
    text: '',
    created_at: now,
    updated_at: now,
  };
  db.runSync(
    'INSERT INTO entries (id, mood, text, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
    [entry.id, entry.mood, entry.text, entry.created_at, entry.updated_at],
  );
  return entry;
}

/** Update entry text */
export function updateEntryText(
  db: SQLiteDatabase,
  id: string,
  text: string,
): void {
  const now = new Date().toISOString();
  db.runSync('UPDATE entries SET text = ?, updated_at = ? WHERE id = ?', [
    text,
    now,
    id,
  ]);
}

/** Update entry mood */
export function updateEntryMood(
  db: SQLiteDatabase,
  id: string,
  mood: MoodType,
): void {
  const now = new Date().toISOString();
  db.runSync('UPDATE entries SET mood = ?, updated_at = ? WHERE id = ?', [
    mood,
    now,
    id,
  ]);
}

/** Get all entries, newest first */
export function getAllEntries(db: SQLiteDatabase): JournalEntry[] {
  return db.getAllSync<JournalEntry>(
    'SELECT * FROM entries ORDER BY created_at DESC',
  );
}

/** Get entry count */
export function getEntryCount(db: SQLiteDatabase): number {
  const row = db.getFirstSync<{count: number}>(
    'SELECT COUNT(*) as count FROM entries',
  );
  return row?.count ?? 0;
}
