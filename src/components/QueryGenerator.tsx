import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ModelSelector from './ModelSelector';
import SchemaInput from './SchemaInput';
import QueryInput from './QueryInput';
import CodeDisplay from './CodeDisplay';

// Predefined options for our selectors
const AI_MODELS = [
  { value: 'gpt-3.5', label: 'GPT-3.5 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
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
  const [aiModel, setAiModel] = useState('gpt-4');
  const [queryLanguage, setQueryLanguage] = useState('graphql');
  const [schema, setSchema] = useState('');
  const [question, setQuestion] = useState('');
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  const generateQuery = () => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter a question for Query GPT to generate a query.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setGeneratedQuery(EXAMPLE_QUERIES[queryLanguage] || EXAMPLE_QUERIES['sql']);
      setIsLoading(false);
      toast({
        title: "Query GPT Success",
        description: "Your SQL query has been generated successfully with querygpt.",
      });
    }, 1500);
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
                onClick={generateQuery} 
                disabled={isLoading} 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full md:w-auto min-w-[180px]"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="dot-loader"></span>
                    <span className="dot-loader"></span>
                    <span className="dot-loader"></span>
                  </span>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Query
                  </>
                )}
              </Button>
            </div>
            
            {(generatedQuery || isLoading) && (
              <CodeDisplay 
                code={generatedQuery} 
                language={QUERY_LANGUAGES.find(lang => lang.value === queryLanguage)?.label || 'SQL'}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QueryGenerator;
