
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
}

const QueryInput: React.FC<QueryInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="question">Your Question</Label>
      <Textarea
        id="question"
        placeholder="Ask a question in natural language, e.g. 'Show me all users who registered in the last 7 days'"
        className="min-h-[80px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default QueryInput;
