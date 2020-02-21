export {
    addProduct,
    updateProduct,
    deleteProduct,
    checkProduct,
    uncheckProduct,
    removeCheckedProducts,
    fetchProducts,
    eraseList
} from './productList';

export {
    addList,
    fetchList,
    removeList,
    editListTitle,
    eraseShoppingLists
} from './shoppingList';

export {
    auth,
    signOut,
    eraseError,
    updateUserData,
    updateUserPassword,
    updateUserEmail,
    loginIfUserDataPersist
} from './auth';