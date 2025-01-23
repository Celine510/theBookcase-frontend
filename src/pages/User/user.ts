import { DocumentReference } from 'firebase/firestore';

export interface ICategory {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface ITags {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface IQuoteList {
  id: string;
  book: DocumentReference;
  book_author_zh?: string;
  book_name_zh?: string;
  page?: number;
  sentence: string;
  // category?: DocumentReference;
  categories: string[];
  // category_name?: string;
  tags: string[];
  // tag?: DocumentReference;
  tag_name?: string;
  user: DocumentReference;
}

export interface IQuoteFormList {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  isSelect?: boolean;
}

export type formFieldName = "sentence" | "book_name_zh" | "book_author_zh" | "page"