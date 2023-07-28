interface InformationCardProps {
  backgroundColor?: string;
  description: string;
  total: number;
}
function InformationCard({
  backgroundColor = 'bg-primary',
  description,
  total,
}: InformationCardProps) {
  return (
    <div
      className={`flex rounded-md gap-2 p-5 ${backgroundColor} hover:scale-[1.01] flex-col`}
    >
      <p className="text-base text-white">{description}</p>
      <span className="text-4xl font-bold text-white">{total}</span>
    </div>
  );
}

export default InformationCard;
