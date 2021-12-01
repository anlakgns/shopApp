import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cardActions from '../../store/actions/cart';

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          navigation={props.navigation}
          id={itemData.item.id}
          onViewDetail={() =>
            props.navigation.navigate('productDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            })
          }
          onAddToChart={() => {
            dispatch(cardActions.addToCart(itemData.item))
          }}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
