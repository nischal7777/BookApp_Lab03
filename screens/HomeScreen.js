import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen({ navigation, borrowedBooks, setBorrowedBooks }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = await firestore().collection('books').get();
        setBooks(booksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.log('Error fetching books: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Available Books</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10, borderWidth: 1, padding: 10, borderRadius: 8 }}>
              <Image source={{ uri: item.CoverPage }} style={{ width: 100, height: 150, marginBottom: 10 }} />
              <Text style={{ fontWeight: 'bold' }}>{item.BookName}</Text>
              <Text>{item.Author}</Text>
              <Button title="View Details" onPress={() => navigation.navigate('Book Detail', { book: item })} />
            </View>
          )}
        />
      )}
    </View>
  );
}
