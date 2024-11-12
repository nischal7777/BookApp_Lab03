import React, { useContext } from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { BorrowedBooksContext } from '../context/BorrowedBooksContext';

export default function BorrowedScreen() {
  const { borrowedBooks, returnBorrowedBook } = useContext(BorrowedBooksContext);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Borrowed Books</Text>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, borderWidth: 1, padding: 10, borderRadius: 8 }}>
            {item.CoverPage && (
              <Image
                source={{ uri: item.CoverPage }}
                style={{ width: 100, height: 150, marginBottom: 10 }}
              />
            )}
            <Text style={{ fontWeight: 'bold' }}>{item.BookName}</Text>
            <Text>{item.Author}</Text>
            <Button title="Return Book" onPress={() => returnBorrowedBook(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
