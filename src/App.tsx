import { useMemo, useState } from 'react';
import { Library, BookOpen, BookMarked, Check } from 'lucide-react';
import { useReadingList } from '@/hooks/useReadingList';
import { AddBookForm } from '@/components/AddBookForm';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { STATUS_ORDER, STATUS_STYLES, type FilterValue } from '@/types';

const FILTERS: FilterValue[] = ['All', ...STATUS_ORDER];

export default function App() {
  const { books, addBook, updateStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<FilterValue>('All');

  const counts = useMemo(() => {
    const map: Record<FilterValue, number> = { All: books.length };
    for (const s of STATUS_ORDER) {
      map[s] = books.filter((b) => b.status === s).length;
    }
    return map;
  }, [books]);

  const existingTitles = useMemo(
    () => new Set(books.map((b) => b.title.trim().toLowerCase())),
    [books]
  );

  const visibleBooks = useMemo(() => {
    if (filter === 'All') return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <header className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
            <Library className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Reading List
            </h1>
            <p className="text-sm text-slate-500">Track the books you read.</p>
          </div>
        </header>

        <div className="mt-8">
          <AddBookForm onAdd={addBook} existingTitles={existingTitles} />
        </div>

        {books.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
              <div className="flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-slate-400" />
              </div>
              <p className="mt-1.5 text-lg font-bold text-slate-900">{books.length}</p>
              <p className="text-[11px] font-medium text-slate-500">Total Books</p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3 text-center shadow-sm">
              <div className="flex items-center justify-center">
                <BookMarked className="h-4 w-4 text-sky-500" />
              </div>
              <p className="mt-1.5 text-lg font-bold text-sky-700">{counts['Reading']}</p>
              <p className="text-[11px] font-medium text-sky-600/70">Currently Reading</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-center shadow-sm">
              <div className="flex items-center justify-center">
                <Check className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-1.5 text-lg font-bold text-emerald-700">{counts['Finished']}</p>
              <p className="text-[11px] font-medium text-emerald-600/70">Finished</p>
            </div>
          </div>
        )}

        {books.length > 0 && (
          <div className="sticky top-0 z-10 -mx-4 mt-6 bg-gradient-to-b from-slate-50 to-slate-50/80 px-4 pb-2 pt-3 backdrop-blur-sm">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {FILTERS.map((f) => {
                const active = filter === f;
                const isStatus = f !== 'All';
                const dot = isStatus ? STATUS_STYLES[f].dot : null;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      active
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {dot && <span className={`h-2 w-2 rounded-full ${dot}`} />}
                    {f}
                    <span
                      className={`rounded-full px-1.5 text-[10px] ${
                        active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <main className="mt-4">
          {books.length === 0 ? (
            <EmptyState />
          ) : visibleBooks.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">
              No books in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onUpdateStatus={updateStatus}
                  onRemove={removeBook}
                />
              ))}
            </div>
          )}
        </main>

        <footer className="mt-10 text-center text-xs text-slate-400">
          Saved on this device.
        </footer>
      </div>
    </div>
  );
}
