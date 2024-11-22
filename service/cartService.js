export function removeFromCart(id) {
  let cartItems = getCartItems();
  let currentItem = [];

  if (cartItems.length > 0) {
    currentItem = cartItems.filter((item) => item.id == id);
    cartItems = cartItems.filter((item) => item.id != id);
  }

  if (currentItem[0].quantity == 1) {
    localStorage.setItem("cartItemsSelected", JSON.stringify([...cartItems]));
    return 0;
  }

  let cartItem = {
    id,
    quantity: currentItem.length > 0 ? currentItem[0].quantity - 1 : 1,
  };

  localStorage.setItem("cartItemsSelected", JSON.stringify([...cartItems, cartItem]));

  return cartItem.quantity;
}

export function addToCart(id) {
  let cartItems = getCartItems();
  let currentItem = [];

  if (cartItems.length > 0) {
    currentItem = cartItems.filter((item) => item.id == id);
    cartItems = cartItems.filter((item) => item.id != id);
  }

  let cartItem = {
    id,
    quantity: currentItem.length > 0 ? currentItem[0].quantity + 1 : 1,
  };

  if(cartItems.length > 0) {
    localStorage.setItem("cartItemsSelected", JSON.stringify([...cartItems, cartItem]));
  } else {
    localStorage.setItem("cartItemsSelected", JSON.stringify([cartItem]));
  }

  return cartItem.quantity;
}

export function getCartItems() {
  const cartItems = localStorage.getItem("cartItemsSelected");

  if (cartItems) {
    return JSON.parse(cartItems);
  } else {
    return [];
  }
}

export function getCartItemById(id) {
    const cartItems = localStorage.getItem("cartItemsSelected");
  
    if (cartItems) {  
       let items = JSON.parse(cartItems);
        const item = items.filter((item) => item.id == id);

        if(item.length > 0) {
            return item[0];
        }else {
            return null;
        }
    } else {
      return null;
    }
  }

export function getCurrentItemCount(id) {
    const item = getCartItemById(id);
    //console.log("item", item);
    if(item) {
        return item.quantity;
    }else {
        return 0;
    }
}

export function getTotalCartItems() {
    const cartItems = getCartItems();
    return cartItems.length;
}

export function deleteFromCart(id) {
  let cartItems = getCartItems();
  let currentItem = [];

  if (cartItems.length > 0) {
    currentItem = cartItems.filter((item) => item.id == id);
    cartItems = cartItems.filter((item) => item.id != id);
  }
  
  localStorage.setItem("cartItemsSelected", JSON.stringify([...cartItems]));
  window.location.reload();
}

export function calculateCartPrice() {
  const cartItems = getCartItems();
}