import { DetectionRecord } from '@store/detectionHistoryStore';

export const formatDate = (ts: number) => {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return '剛剛';
  if (mins < 60) return `${mins} 分鐘前`;
  if (hours < 24) return `${hours} 小時前`;
  if (days < 7) return `${days} 天前`;

  return new Date(ts).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatFullDate = (ts: number) => {
  return new Date(ts).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// DetailCard 的時間格式
export const getTimeInfo = (record: DetectionRecord) => {
  const date = new Date(record.timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  let timeAgo = '';
  if (mins < 1) timeAgo = '剛剛';
  else if (mins < 60) timeAgo = `${mins} 分鐘前`;
  else if (hours < 24) timeAgo = `${hours} 小時前`;
  else if (days < 7) timeAgo = `${days} 天前`;
  else timeAgo = formatFullDate(record.timestamp);

  return {
    fullDate: formatFullDate(record.timestamp),
    timeAgo,
  };
};
