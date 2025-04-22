import { randomBytes } from 'crypto';

/**
 * Utility functions for testing
 */
export class TestUtils {
  /**
   * Generate a random string
   */
  static generateRandomString(length: number = 10): string {
    return randomBytes(length).toString('hex');
  }

  /**
   * Generate a random email
   */
  static generateRandomEmail(): string {
    return `test.${this.generateRandomString(8)}@example.com`;
  }

  /**
   * Generate a random username
   */
  static generateRandomUsername(): string {
    return `test_user_${this.generateRandomString(5)}`;
  }

  /**
   * Generate random name
   */
  static generateRandomName(): string {
    const firstNames = [
      'John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 
      'James', 'Sophia', 'Robert', 'Emily', 'William', 'Ava', 'Thomas', 'Mia'
    ];
    
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia',
      'Wilson', 'Taylor', 'Clark', 'Lewis', 'Lee', 'Walker', 'Hall', 'Young'
    ];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }

  /**
   * Wait for a specified time
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry a function until it succeeds or maximum retries reached
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        console.log(`Attempt ${attempt} failed. ${maxRetries - attempt} attempts remaining.`);
        lastError = error as Error;
        
        if (attempt < maxRetries) {
          await this.wait(retryDelay);
        }
      }
    }
    
    throw lastError!;
  }

  /**
   * Extract ID from location header
   * Useful for APIs that return location headers with resource IDs
   */
  static extractIdFromLocationHeader(locationHeader: string): number | null {
    if (!locationHeader) return null;
    
    // Common patterns like "/api/users/123" or "/api/v1/posts/456"
    const matches = locationHeader.match(/\/(\d+)(?:\/)?$/);
    if (matches && matches[1]) {
      return parseInt(matches[1], 10);
    }
    
    return null;
  }

  /**
   * Format date for API requests
   */
  static formatDate(date: Date = new Date()): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Add days to date
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Generate a paragraph with a specified number of words
   * @param wordCount - The number of words to include in the paragraph (default: 50)
   * @returns A string containing a paragraph with the specified number of words
   */
  static generateParagraph(wordCount: number = 10): string {
    // List of common words to choose from
    const commonWords = [
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 
      'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 
      'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 
      'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 
      'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
      'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
      'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
      'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also'
    ];

    // Generate random words
    let paragraph = '';
    let sentenceLength = 0;
    let currentSentenceWords = 0;
    
    for (let i = 0; i < wordCount; i++) {
      // Randomly select a word
      const word = commonWords[Math.floor(Math.random() * commonWords.length)];
      
      // Start of paragraph or new sentence
      if (i === 0 || currentSentenceWords === 0) {
        // Capitalize first letter
        paragraph += word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        paragraph += word;
      }
      
      currentSentenceWords++;
      
      // Determine if we need to end the sentence (randomly between 5-15 words)
      if (sentenceLength === 0) {
        sentenceLength = Math.floor(Math.random() * 11) + 5; // 5-15 words
      }
      
      // Add punctuation and spacing
      if (i === wordCount - 1) {
        // End the paragraph with a period
        paragraph += '.';
      } else if (currentSentenceWords >= sentenceLength) {
        // End the sentence with random punctuation
        const punctuation = ['.', '.', '.', '!', '?']; // More weight to periods
        paragraph += punctuation[Math.floor(Math.random() * punctuation.length)];
        paragraph += ' ';
        sentenceLength = 0;
        currentSentenceWords = 0;
      } else {
        // Add comma occasionally (10% chance) if not at the end of a sentence
        if (Math.random() < 0.1 && currentSentenceWords > 2 && i !== wordCount - 1) {
          paragraph += ',';
        }
        paragraph += ' ';
      }
    }
    
    return paragraph;
  }
}
