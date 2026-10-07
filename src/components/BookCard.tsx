import { useState } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import { STATUS_ORDER, STATUS_STYLES, type Book, type ReadingStatus } from '@/types';

interface BookCardProps {
  book: Book;
  onUpdateStatus: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onUpdateStatus, onRemove }: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const styles = STATUS_STYLES[book.status];

  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-slate-900">
          {book.title}
        </h3>
        <button
          onClick={() => onRemove(book.id)}
          aria-label="Remove book"
          className="shrink-0 rounded-lg p-1.5 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles.badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
          {book.status}
        </span>
      </div>

      <div className="relative mt-3 border-t border-slate-100 pt-3">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
        >
          Change status
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {menuOpen && (
          <div className="mt-1 grid grid-cols-3 gap-1.5">
            {STATUS_ORDER.map((s) => {
              const active = book.status === s;
              const sStyle = STATUS_STYLES[s];
              return (
                <button
                  key={s}
                  onClick={() => {
                    onUpdateStatus(book.id, s);
                    setMenuOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-2 text-[11px] font-medium transition ${
                    active
                      ? `${sStyle.badge}`
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${sStyle.dot}`} />
                  {s}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
