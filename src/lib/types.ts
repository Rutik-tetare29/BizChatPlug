export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
};

export type ChatSession = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  latestMessage: string;
  timestamp: string;
  unreadCount: number;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified';
  createdAt: string;
  sourceUrl: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  language: 'English' | 'Hindi' | 'Marathi';
};

export type AnalyticsStat = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
};
