import type { ChatSession, FAQ, Lead, AnalyticsStat } from '@/lib/types';

export const mockFaqs: FAQ[] = [
  { id: '1', question: 'What is your return policy?', answer: 'Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.', category: 'Shipping', language: 'English' },
  { id: '2', question: 'How do I track my order?', answer: 'Once your order has shipped, you will receive an email with a tracking number.', category: 'Shipping', language: 'English' },
  { id: '3', question: 'Do you offer international shipping?', answer: 'Yes, we ship to most countries worldwide. Shipping costs will apply, and will be added at checkout.', category: 'Shipping', language: 'English' },
  { id: '4', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, as well as PayPal.', category: 'Billing', language: 'English' },
  { id: '5', question: 'How do I cancel my subscription?', answer: 'You can cancel your subscription at any time from your account settings page.', category: 'Billing', language: 'English' },
  { id: '6', question: 'आपकी वापसी नीति क्या है?', answer: 'हमारी वापसी नीति 30 दिनों तक चलती है। यदि आपकी खरीद के 30 दिन बीत चुके हैं, तो दुर्भाग्य से हम आपको धनवापसी या विनिमय की पेशकश नहीं कर सकते।', category: 'शिपिंग', language: 'Hindi' },
];

export const mockLeads: Lead[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234', status: 'New', createdAt: '2024-05-20', sourceUrl: '/pricing' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678', status: 'Contacted', createdAt: '2024-05-19', sourceUrl: '/features' },
  { id: '3', name: 'Sam Wilson', email: 'sam.wilson@example.com', phone: '555-8765', status: 'Qualified', createdAt: '2024-05-18', sourceUrl: '/' },
  { id: '4', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-4321', status: 'New', createdAt: '2024-05-21', sourceUrl: '/about-us' },
  { id: '5', name: 'Bob Brown', email: 'bob.b@example.com', phone: '555-9876', status: 'Contacted', createdAt: '2024-05-20', sourceUrl: '/pricing' },
];

export const mockChatSessions: ChatSession[] = [
  { id: '1', user: { name: 'John Doe', avatar: 'https://picsum.photos/seed/10/40/40' }, latestMessage: 'Hey, I have a question about my order.', timestamp: '10m ago', unreadCount: 2 },
  { id: '2', user: { name: 'Jane Smith', avatar: 'https://picsum.photos/seed/11/40/40' }, latestMessage: 'Can you help me with a billing issue?', timestamp: '1h ago', unreadCount: 0 },
  { id: '3', user: { name: 'Sam Wilson', avatar: 'https://picsum.photos/seed/12/40/40' }, latestMessage: 'I\'m interested in your enterprise plan.', timestamp: '2d ago', unreadCount: 0 },
  { id: '4', user: { name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/13/40/40' }, latestMessage: 'Thank you!', timestamp: '5d ago', unreadCount: 0 },
];

export const mockAnalyticsStats: AnalyticsStat[] = [
    { title: 'Total Chats', value: '1,234', change: '+20.1%', changeType: 'increase' },
    { title: 'Resolved', value: '987', change: '+15.2%', changeType: 'increase' },
    { title: 'Escalated', value: '247', change: '-5.0%', changeType: 'decrease' },
    { title: 'Avg. Response Time', value: '32s', change: '-2.1s', changeType: 'decrease' },
];

export const mockTopQuestionsData = [
    { question: 'Return policy', count: 45 },
    { question: 'Track order', count: 32 },
    { question: 'International shipping', count: 28 },
    { question: 'Payment methods', count: 19 },
    { question: 'Cancel subscription', count: 12 },
];
