
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

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

  const { t } = useI18n();
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="schema">{t('generator.schema.label')}</Label>
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
            {t('generator.schema.upload')}
          </Button>
        </div>
      </div>
      <Textarea
        id="schema"
        placeholder={t('generator.schema.placeholder')}
        className="min-h-[150px] font-mono text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SchemaInput;
