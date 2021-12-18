export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
import Product from '../../models/product';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://shopapp-44638-default-rtdb.firebaseio.com/products.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong.');
      }

      let loadedProducts = [];
      const resData = await response.json();
      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            userId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((item) => item.ownerId === userId),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://shopapp-44638-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong.');
      }
    } catch (err) {
      console.log(err);
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://shopapp-44638-default-rtdb.firebaseio.com/products.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            ownerId: userId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong.');
      }
      const resData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://shopapp-44638-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        }
      );
    } catch (err) {
      throw err;
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
