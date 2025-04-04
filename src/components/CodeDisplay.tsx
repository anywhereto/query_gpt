
import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CodeDisplayProps {
  code: string;
  language: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The generated query has been copied to your clipboard.",
      });
    });
  };

  return (
    <Card className="mt-6 overflow-hidden">
      <div className="bg-muted px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-medium">{language} Query</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="ml-2">{isCopied ? 'Copied' : 'Copy'}</span>
        </Button>
      </div>
      <CardContent className="p-0">
        <div className="code-highlight">
          <pre>
            <code>{code || 'Your generated query will appear here...'}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeDisplay;
