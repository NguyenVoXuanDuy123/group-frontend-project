export const timeAgo = (datetime: string): string => {
    const now = new Date();
    const date = new Date(datetime);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 259200) { // 259200 seconds = 3 days
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      // Format the date as "MMM dd"
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  };
  