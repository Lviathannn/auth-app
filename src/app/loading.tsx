type Props = {};

export default function Loading({}: Props) {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-white">
      <div
        className="text-surface inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-sky-400 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </main>
  );
}
