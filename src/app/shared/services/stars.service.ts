import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarsService {

  constructor() {
  }

  calculateAverageStars(reviews: { stars: number }[]): { filledCount: number; emptyCount: number } {
    if (!reviews || reviews.length === 0) {
      return { filledCount: 0, emptyCount: 5 };
    }

    const totalStars = reviews.reduce((sum: number, review: any) => sum + review.stars, 0);
    const averageRating = Math.round(totalStars / reviews.length);

    return {
      filledCount: averageRating,
      emptyCount: 5 - averageRating
    };
  }

  getFilledStars(rating: number): number {
    return Math.min(Math.max(Math.floor(rating), 0), 5);
  }

  getEmptyStars(rating: number): number {
    return 5 - this.getFilledStars(rating);
  }

  getReviewWord(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    return (lastTwoDigits >= 11 && lastTwoDigits <= 19) || lastDigit === 0 || lastDigit >= 5
      ? 'отзывов'
      : lastDigit === 1
        ? 'отзыв'
        : 'отзыва';
  }

  createArray(length: number): number[] {
    return Array(length).fill(0);
  }
}
