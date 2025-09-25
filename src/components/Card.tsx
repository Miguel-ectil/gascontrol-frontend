interface CardProps {
  title: string;
  value: number | string;
}

export default function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
