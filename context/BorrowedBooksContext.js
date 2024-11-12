import React, { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export const BorrowedBooksContext = createContext();

export function BorrowedBooksProvider({ children }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const borrowedBooksSnapshot = await firestore().collection('borrowedBooks').get();
        setBorrowedBooks(borrowedBooksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.log('Error fetching borrowed books: ', error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  const addBorrowedBook = async (book) => {
    try {
      await firestore().collection('borrowedBooks').add({
        ...book,
        BorrowDate: firestore.FieldValue.serverTimestamp(),
      });
      setBorrowedBooks(prevBooks => [...prevBooks, book]);
    } catch (error) {
      console.log('Error borrowing book: ', error);
    }
  };

  const returnBorrowedBook = async (id) => {
    try {
      await firestore().collection('borrowedBooks').doc(id).delete();
      setBorrowedBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    } catch (error) {
      console.log('Error returning book: ', error);
    }
  };

  return (
    <BorrowedBooksContext.Provider value={{ borrowedBooks, addBorrowedBook, returnBorrowedBook }}>
      {children}
    </BorrowedBooksContext.Provider>
  );
}
