import { BookMarked } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <BookMarked className="h-7 w-7 text-slate-400" />
      </div>
      <p className="mt-4 text-base font-medium text-slate-700">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
