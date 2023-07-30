interface GlitchErrorProps {
  text?: string;
}

function GlitchError({ text = 'ERROR!' }: GlitchErrorProps) {
  return (
    <div className="flex justify-self-center">
      <h2
        className="text-4xl font-bold text-center text-black"
        style={{ textShadow: 'red -2px 0, cyan 2px 0' }}
      >
        {text}
      </h2>
    </div>
  );
}

export default GlitchError;
