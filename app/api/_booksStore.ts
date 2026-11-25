import { createStore } from "./_store";

export interface BookItem {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  likes_count: number;
}

const INITIAL_BOOKS: BookItem[] = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Software Engineering",
    description:
      "A handbook of agile software craftsmanship and best engineering practices.",
    likes_count: 42,
  },
  {
    id: 2,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    genre: "Distributed Systems",
    description:
      "The big ideas behind reliable, scalable, and maintainable data architectures.",
    likes_count: 68,
  },
  {
    id: 3,
    title: "Refactoring: Improving Code Design",
    author: "Martin Fowler",
    genre: "Architecture",
    description:
      "Comprehensive guide to restructuring existing code without changing behavior.",
    likes_count: 35,
  },
];

export const booksStore = createStore<BookItem>(INITIAL_BOOKS);
