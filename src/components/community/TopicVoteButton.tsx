import React from 'react';
import { ThumbsUp } from 'lucide-react';

interface TopicVoteButtonProps {
  votes: number;
  userVoted: boolean;
  onVote: () => void;
}

const TopicVoteButton: React.FC<TopicVoteButtonProps> = ({ votes, userVoted, onVote }) => {
  return (
    <button
      onClick={onVote}
      className={`inline-flex items-center space-x-1 ${
        userVoted ? 'text-blue-600' : 'text-gray-700'
      } hover:text-blue-600`}
    >
      <ThumbsUp className="h-5 w-5" />
      <span>{votes}</span>
    </button>
  );
};

export default TopicVoteButton;