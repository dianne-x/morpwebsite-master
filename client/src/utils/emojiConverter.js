import emojiMap from './emojiMap.json';

export { emojiMap };

export const convertEmojisToText = (text) => 
    text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, (emoji) => emojiMap[emoji] || emoji);
