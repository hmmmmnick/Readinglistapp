export type ReadingStatus = 'Want to Read' | 'Reading' | 'Finished';

export const STATUS_ORDER: ReadingStatus[] = ['Want to Read', 'Reading', 'Finished'];

export const STATUS_STYLES: Record<ReadingStatus, { badge: string; dot: string; ring: string }> = {
  'Want to Read': {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    ring: 'focus:border-amber-400 focus:ring-amber-200',
  },
  Reading: {
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
    dot: 'bg-sky-500',
    ring: 'focus:border-sky-400 focus:ring-sky-200',
  },
  Finished: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    ring: 'focus:border-emerald-400 focus:ring-emerald-200',
  },
};

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  createdAt: number;
}

export type FilterValue = 'All' | ReadingStatus;
