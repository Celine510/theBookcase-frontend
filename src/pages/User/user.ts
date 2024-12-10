import { DocumentReference } from 'firebase/firestore';

export interface ICategory {
  id: string;
  name?: string;
  [key: string]: any;
}

export interface IQuoteList {
  id: string;
  book: DocumentReference;
  book_author_zh?: string;
  book_name_zh?: string;
  page?: number;
  sentence: string;
  category?: DocumentReference;
  category_name?: string;
  tag?: DocumentReference;
  tag_name?: string;
  user: DocumentReference;
}
