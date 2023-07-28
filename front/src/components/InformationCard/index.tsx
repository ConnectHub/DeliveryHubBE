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
    <>
      <div className={`flex flex-col gap-2 p-5 rounded-md ${backgroundColor} `}>
        <p className="text-white text-base">{description}</p>
        <span className="text-white font-bold text-4xl">{total}</span>
      </div>
    </>
  );
}

export default InformationCard;
