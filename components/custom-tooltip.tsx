
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload) {
    return null;
  }

  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className="rounded-md bg-white shadow-lg border overflow-hidden">
      <div className="text-xs p-1 px-3 text-gray-600">
        <span className="font-semibold">{name}</span> ({value})
      </div>
    </div>
  );
};

export default CustomTooltip;
