function Checkbox({ title, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-green-500"
      />
      <span>{title}</span>
    </label>
  );
}

export default Checkbox;
