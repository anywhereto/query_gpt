
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useI18n } from '@/i18n/I18nProvider';

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
}

const QueryInput: React.FC<QueryInputProps> = ({ value, onChange }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-2">
      <Label htmlFor="question">{t('generator.question.label')}</Label>
      <Textarea
        id="question"
        placeholder={t('generator.question.placeholder')}
        className="min-h-[80px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default QueryInput;
