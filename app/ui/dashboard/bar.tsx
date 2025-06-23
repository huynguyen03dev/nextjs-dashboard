export function Bar({
  value,
  maxValue,
  height,
}: {
  value: number;
  maxValue: number;
  height: number;
}) {
  const barHeight = Math.max((height / maxValue) * value, 1);
  
  return (
    <div
      className="w-full rounded-md bg-blue-300"
      style={{
        height: `${barHeight}px`,
      }}
    ></div>
  );
} 