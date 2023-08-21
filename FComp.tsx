import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const FComp = () => {
  const [name, setName] = useState('Vian');
  const [number, setNumber] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const changeName = () =>
    name === 'Vian' ? setName('lord') : setName('Vian');

  const counterNumber = (counter: string) =>
    counter === '+' ? setNumber(number + 1) : setNumber(number - 1);

  const getProduct = async (val: string) => {
    setLoading(true);
    const params = val ? `/search?q=${val}` : '';
    await fetch(`https://dummyjson.com/products/${params}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleChangeSearch = (e: string) => {
    setSearch(e);
  };
  const handleSubmitSearch = () => {
    getProduct(search);
  };

  const getListProduct = () => {
    if (loading) {
      return (
        <Text style={{marginTop: 10, textAlign: 'center'}}>Loading...</Text>
      );
    }
    if (!loading && products.length === 0) {
      return (
        <Text style={{marginTop: 10, textAlign: 'center'}}>
          Product tidak ditemukan
        </Text>
      );
    }
    return products.map(({brand, category, description, price, title}, i) => {
      return (
        <View key={i} style={styles.productItem}>
          <Text>Title: {title}</Text>
          <Text>Description: {description}</Text>
          <Text>Price: {price}</Text>
          <Text>Brand: {brand}</Text>
          <Text>Category: {category}</Text>
        </View>
      );
    });
  };

  useEffect(() => {
    getProduct('');
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Nama: {name}</Text>
        <Button onPress={changeName} title="Ganti nama" />
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button
            title="-"
            onPress={() => counterNumber('-')}
            disabled={number === 0}
          />
          <Text>{number}</Text>
          <Button title="+" onPress={() => counterNumber('+')} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            // value={search}
            onChangeText={handleChangeSearch}
            style={{borderWidth: 1, width: 315, height: 35}}
          />
          <Button title="Search" onPress={() => handleSubmitSearch()} />
        </View>

        {getListProduct()}

        {/*<FlatList*/}
        {/*  data={products}*/}
        {/*  keyExtractor={item => item.id.toString()} // Menyediakan key unik dari data produk*/}
        {/*  renderItem={({item}) => (*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        flexDirection: 'row',*/}
        {/*        justifyContent: 'space-between',*/}
        {/*        alignItems: 'center',*/}
        {/*        borderBottomWidth: 1,*/}
        {/*        borderColor: '#ccc',*/}
        {/*        paddingVertical: 10,*/}
        {/*      }}*/}
        {/*      key={item.id}>*/}
        {/*      <Text>{item.title}</Text>*/}
        {/*      <Text>{item.price}</Text>*/}
        {/*    </View>*/}
        {/*  )}*/}
        {/*/>*/}
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginTop: 10,
  },
});

export default FComp;
