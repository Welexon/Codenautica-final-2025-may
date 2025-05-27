import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

interface ReplyFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-2">
          Your Reply
        </label>
        <textarea
          id="reply"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Write your reply here..."
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-4 w-4 mr-2" />
          Post Reply
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;