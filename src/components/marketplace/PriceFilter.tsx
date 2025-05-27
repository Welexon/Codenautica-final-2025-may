import React, { useState } from 'react';
import { Slider } from '../ui/Slider';

interface PriceFilterProps {
  onPriceChange: (price: number) => void;
  maxPrice?: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ 
  onPriceChange, 
  maxPrice = 1000 
}) => {
  const [price, setPrice] = useState(maxPrice);

  const handlePriceChange = (value: number) => {
    setPrice(value);
    onPriceChange(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
      <div className="px-2">
        <Slider
          min={0}
          max={maxPrice}
          value={price}
          onChange={handlePriceChange}
          step={10}
        />
        <div className="mt-4 text-center text-sm text-gray-600">
          Maximum price: €{price}
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;