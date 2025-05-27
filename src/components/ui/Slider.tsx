import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
        }}
      />
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>€{min}</span>
        <span>€{max}</span>
      </div>
    </div>
  );
};

export default Slider;