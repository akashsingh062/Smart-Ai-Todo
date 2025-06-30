import React, { useState } from 'react';
import { Brain, Sparkles, Target, List } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AIAssistantProps {
  onSubtasksGenerated?: (subtasks: string[]) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onSubtasksGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [prioritization, setPrioritization] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'prioritize' | 'subtasks'>('summary');

  const getSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/ai/summarize');
      setSummary(response.data.summary);
      toast.success('Summary generated!');
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const getPrioritization = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/ai/prioritize');
      setPrioritization(response.data.suggestions);
      toast.success('Prioritization suggestions generated!');
    } catch (error) {
      toast.error('Failed to generate prioritization');
    } finally {
      setLoading(false);
    }
  };

  const generateSubtasks = async (taskText: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/ai/subtasks', {
        taskText
      });
      if (onSubtasksGenerated) {
        onSubtasksGenerated(response.data.subtasks);
      }
      toast.success('Subtasks generated!');
    } catch (error) {
      toast.error('Failed to generate subtasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full max-w-xl mx-auto md:p-8">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeTab === 'summary' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('summary')}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <List className="w-4 h-4" />
          Summary
        </Button>
        <Button
          variant={activeTab === 'prioritize' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('prioritize')}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Target className="w-4 h-4" />
          Prioritize
        </Button>
        <Button
          variant={activeTab === 'subtasks' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('subtasks')}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4" />
          Subtasks
        </Button>
      </div>

      {activeTab === 'summary' && (
        <div className="space-y-4">
          <Button
            onClick={getSummary}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading ? 'Generating...' : 'Generate Task Summary'}
          </Button>
          {summary && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm md:text-base overflow-auto">
              <p className="text-gray-800">{summary}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'prioritize' && (
        <div className="space-y-4">
          <Button
            onClick={getPrioritization}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {loading ? 'Analyzing...' : 'Get Prioritization Suggestions'}
          </Button>
          {prioritization && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm md:text-base overflow-auto">
              <p className="text-gray-800 whitespace-pre-line">{prioritization}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'subtasks' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Click on any task to generate AI-powered subtasks that will help you break down complex tasks into manageable steps.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs md:text-sm">
            <p className="text-sm text-blue-800">
              💡 Tip: Use the three-dot menu on any task and select "Generate Subtasks" to break it down automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};