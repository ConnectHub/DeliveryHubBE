interface GlitchErrorProps {
  text?: string;
}

function GlitchError({ text = 'ERROR!' }: GlitchErrorProps) {
  return (
    <div className="flex justify-center">
      <h2
        className="text-center text-black text-4xl font-bold"
        style={{ textShadow: 'red -2px 0, cyan 2px 0' }}
      >
        {text}
      </h2>
    </div>
  );
}

export default GlitchError;
