import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import { BorrowedBooksContext } from '../context/BorrowedBooksContext';

export default function BookDetailScreen({ route, navigation }) {
  const { borrowedBooks, addBorrowedBook } = useContext(BorrowedBooksContext);
  const [borrowedBooksCount, setBorrowedBooksCount] = useState(0);
  const book = route.params.book;

  useEffect(() => {
    setBorrowedBooksCount(borrowedBooks.length);
  }, [borrowedBooks]);

  const borrowBook = () => {
    if (borrowedBooksCount >= 3) {
      Alert.alert('Limit Exceeded', 'Sorry You cannot borrow more than 3 books at a time.');
      return;
    }

    addBorrowedBook(book);
    Alert.alert('Success', 'Book borrowed successfully!');
    navigation.goBack();
  };

  return (
    <View style={{ padding: 10 }}>
      <Image source={{ uri: book.CoverPage }} style={{ width: 100, height: 150 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{book.BookName}</Text>
      <Text>{book.Author}</Text>
      <Text>Rating: {book.Rating}</Text>
      <Text>{book.Summary}</Text>
      <Button title="Borrow" onPress={borrowBook} />
    </View>
  );
}
