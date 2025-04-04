
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type ModelOption = {
  value: string;
  label: string;
}

interface ModelSelectorProps {
  id: string;
  label: string;
  options: ModelOption[];
  value: string;
  onChange: (value: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  id,
  label,
  options,
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
