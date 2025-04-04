import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ModelSelector from './ModelSelector';
import SchemaInput from './SchemaInput';
import QueryInput from './QueryInput';
import CodeDisplay from './CodeDisplay';
import { generateQuery, AVAILABLE_MODELS } from '@/api/openai';
import { validateEnvironment } from '@/lib/env';

// Predefined options for our selectors
const AI_MODELS = [
  { value: 'deepseek-v3', label: 'DeepSeek V3' },
  { value: 'deepseek-r1', label: 'DeepSeek R1' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
];

const QUERY_LANGUAGES = [
  { value: 'bigquery', label: 'BigQuery' },
  { value: 'cassandra', label: 'Cassandra' },
  { value: 'databricks', label: 'Databricks' },
  { value: 'dynamodb', label: 'DynamoDB' },
  { value: 'elasticsearch', label: 'Elasticsearch' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'jsonapi', label: 'JSON:API' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'redis', label: 'Redis' },
  { value: 'restapi', label: 'REST API curl' },
  { value: 'snowflake', label: 'Snowflake' },
  { value: 'sql', label: 'SQL' },
];

// Example query results for demo
const EXAMPLE_QUERIES: { [key: string]: string } = {
  'sql': `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY u.id
ORDER BY order_count DESC;`,
  'mysql': `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY u.id
ORDER BY order_count DESC;`,
  'postgresql': `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC;`,
  'sqlserver': `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATEADD(day, -7, GETDATE())
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC;`,
  'sqlite': `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= date('now', '-7 day')
GROUP BY u.id
ORDER BY order_count DESC;`,
  'mongodb': `db.users.aggregate([
  {
    $match: {
      created_at: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
    }
  },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "user_id",
      as: "orders"
    }
  },
  {
    $project: {
      name: 1,
      email: 1,
      order_count: { $size: "$orders" }
    }
  },
  { $sort: { order_count: -1 } }
]);`,
  'bigquery': `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM \`project.dataset.users\` u
LEFT JOIN \`project.dataset.orders\` o ON u.id = o.user_id
WHERE u.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC;`,
  'cassandra': `SELECT name, email, order_count
FROM users_by_registration
WHERE created_at >= toTimestamp(now()) - 7d
LIMIT 100;`,
  'databricks': `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATE_SUB(CURRENT_DATE(), 7)
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC;`,
  'dynamodb': `{
  "TableName": "Users",
  "FilterExpression": "created_at >= :sevenDaysAgo",
  "ExpressionAttributeValues": {
    ":sevenDaysAgo": { "S": "2023-01-01T00:00:00Z" }
  },
  "ProjectionExpression": "id, #name, email, order_count",
  "ExpressionAttributeNames": {
    "#name": "name"
  }
}`,
  'elasticsearch': `{
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "created_at": {
              "gte": "now-7d/d"
            }
          }
        }
      ]
    }
  },
  "sort": [
    { "order_count": { "order": "desc" } }
  ]
}`,
  'graphql': `query GetRecentUsers {
  users(where: { created_at: { gte: "2023-03-24" } }) {
    name
    email
    orders {
      id
    }
  }
}`,
  'jsonapi': `{
  "data": {
    "type": "users",
    "attributes": {
      "filter": {
        "created_at": { "gte": "2023-03-24" }
      },
      "include": ["orders"],
      "sort": ["-orders.count"]
    }
  }
}`,
  'redis': `FT.SEARCH users-idx "@created_at:[1679616000 +inf] @orders_count:[-inf +inf]" SORTBY orders_count DESC`,
  'restapi': `curl -X GET "https://api.example.com/users?created_after=2023-03-24&sort=-order_count" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"`,
  'snowflake': `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATEADD(day, -7, CURRENT_DATE())
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC;`,
};

const QueryGenerator = () => {
  // State for all form inputs
  const [aiModel, setAiModel] = useState('deepseek-v3');
  const [queryLanguage, setQueryLanguage] = useState('graphql');
  const [schema, setSchema] = useState('');
  const [question, setQuestion] = useState('');
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);
  const { toast } = useToast();

  // Check if API key is configured
  useEffect(() => {
    const { valid, missing } = validateEnvironment();
    setApiKeyConfigured(valid);
    
    if (!valid && missing.includes('OPENROUTER_API_KEY')) {
      toast({
        title: "API Key Not Configured",
        description: "Please set your OpenRouter API key in the environment variables.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedModel = localStorage.getItem('aiModel');
    const savedLanguage = localStorage.getItem('queryLanguage');
    const savedSchema = localStorage.getItem('schema');

    if (savedModel) setAiModel(savedModel);
    if (savedLanguage) setQueryLanguage(savedLanguage);
    if (savedSchema) setSchema(savedSchema);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('aiModel', aiModel);
    localStorage.setItem('queryLanguage', queryLanguage);
    localStorage.setItem('schema', schema);
  }, [aiModel, queryLanguage, schema]);

  const generateQueryFromQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter a question for Query GPT to generate a query.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKeyConfigured) {
      toast({
        title: "API Key Required",
        description: "Please configure your OpenRouter API key to use this feature.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Call our OpenAI API integration
      const result = await generateQuery({
        question,
        databaseType: queryLanguage,
        schema: schema.trim() ? schema : undefined,
        aiModel
      });

      if (result.error) {
        throw new Error(result.error);
      }

      setGeneratedQuery(result.query);
      toast({
        title: "Query Generated",
        description: "Your database query has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating query:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate query. Please try again.",
        variant: "destructive",
      });
      
      // Use example query as fallback
      setGeneratedQuery(EXAMPLE_QUERIES[queryLanguage] || EXAMPLE_QUERIES['sql']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="query-generator" className="py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModelSelector
                id="ai-model"
                label="AI Model"
                options={AI_MODELS}
                value={aiModel}
                onChange={setAiModel}
              />
              <ModelSelector
                id="query-language"
                label="Query Language"
                options={QUERY_LANGUAGES}
                value={queryLanguage}
                onChange={setQueryLanguage}
              />
            </div>
            
            <div className="mt-6">
              <SchemaInput value={schema} onChange={setSchema} />
            </div>
            
            <div className="mt-6">
              <QueryInput value={question} onChange={setQuestion} />
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                size="lg" 
                onClick={generateQueryFromQuestion}
                disabled={isLoading || !question.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Query
                  </span>
                )}
              </Button>
            </div>
            
            <div className="mt-6">
              <CodeDisplay code={generatedQuery} language={queryLanguage} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QueryGenerator;
