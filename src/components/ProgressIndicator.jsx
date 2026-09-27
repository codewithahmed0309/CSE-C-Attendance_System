export default function ProgressIndicator({ processed, total }) {
  const ratio = total > 0 ? processed / total : 0;

  return (
    <div className="mx-auto mt-8 w-full max-w-xs">
      <div className="h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-200 ease-out"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      <p className="mt-2 text-center text-xs tabular text-text-secondary">
        {processed} / {total} processed
      </p>
    </div>
  );
}
