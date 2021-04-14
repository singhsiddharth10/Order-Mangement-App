//all the action are defined here

//for setting the count initial count of the data present in the database
export const setCount = (payload) => ({
    type : "SET_COUNT",
    payload: payload
})
//for adding new records in the store
export const add = (payload) => ({
    type : "ADD",
    payload: payload
})

//for deleting the record
export const deleted = () => ({
    type : "DELETED"
})

//these are used for the purpose of updating  checkitem array
//for storing the invoiceid of all the recods present in the ui at that moment and checked all the checkboxes
export const checkedItem1 = (payload) => ({
    type: 'CHECKED_ITEM_1',
    payload: payload
})
//for removing all the invoiceid present in the ui at that momemt and unchecked all the checkboxes
export const checkedItem2 = () => ({
    type: 'CHECKED_ITEM_2'
})

//checking one checkbox at a time and storing it invoivce id
export const checkedItem3 = (payload) => ({
    type: 'CHECKED_ITEM_3',
    payload: payload
})

//for adding the fetched data from the database to the redux store
export const addData = (payload) => ({
    type: 'ADD_DATA',
    payload: payload
})

//these are used for the purpse of updating the response data
//for single check
export const check = (payload) => ({
    type: 'CHECK',
    payload: payload
})
//for single uncheck
export const uncheck = (payload) => ({
    type: 'UNCHECK',
    payload: payload
})