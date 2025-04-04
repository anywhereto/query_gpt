
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface SchemaInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SchemaInput: React.FC<SchemaInputProps> = ({ value, onChange }) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="schema">Database Schema</Label>
        <div className="relative">
          <input
            type="file"
            id="schema-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".sql,.json,.txt"
            onChange={handleUpload}
          />
          <Button variant="outline" size="sm" className="text-xs">
            <Upload className="h-3 w-3 mr-1" />
            Upload
          </Button>
        </div>
      </div>
      <Textarea
        id="schema"
        placeholder="Paste your database schema here or upload a file... 
Example:
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP
);"
        className="min-h-[150px] font-mono text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SchemaInput;
