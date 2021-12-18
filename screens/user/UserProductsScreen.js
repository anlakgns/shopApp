import React from 'react';
import { FlatList, Button, View, Alert, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    console.log(id);
    props.navigation.navigate('editProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert(
      'Are you sure ? ',
      'Do you really want to delete this product ?',
      [
        {
          text: 'No',
          style: 'default',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(productsActions.deleteProduct(id));
          },
        },
      ]
    );
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found!, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProductsScreen;
