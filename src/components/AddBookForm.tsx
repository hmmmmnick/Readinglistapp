import { useState } from 'react';
import { Plus, BookOpen, AlertCircle } from 'lucide-react';
import { STATUS_ORDER, STATUS_STYLES, type ReadingStatus } from '@/types';

const MAX_TITLE_LENGTH = 60;

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => void;
  existingTitles: Set<string>;
}

export function AddBookForm({ onAdd, existingTitles }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('Want to Read');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  function validate(value: string): string {
    const trimmed = value.trim();
    if (trimmed.length > MAX_TITLE_LENGTH) {
      return 'Book title must be 60 characters or fewer.';
    }
    if (existingTitles.has(trimmed.toLowerCase())) {
      return 'This book is already in your reading list.';
    }
    return '';
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const validationError = validate(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    onAdd(trimmed, status);
    setTitle('');
    setStatus('Want to Read');
    setError('');
    setOpen(false);
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (error) {
      setError(validate(e.target.value));
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white/60 py-4 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-white hover:text-slate-900"
      >
        <Plus className="h-4 w-4" />
        Add a book
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-2 text-slate-900">
        <BookOpen className="h-5 w-5 text-slate-400" />
        <input
          autoFocus
          value={title}
          onChange={handleTitleChange}
          placeholder="Book title"
          className="w-full bg-transparent text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {STATUS_ORDER.map((s) => {
          const active = status === s;
          const styles = STATUS_STYLES[s];
          return (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? `${styles.badge} shadow-sm`
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
              {s}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setTitle('');
            setError('');
            setStatus('Want to Read');
          }}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add book
        </button>
      </div>
    </form>
  );
}
