
//initial global state
const initState = {
    recordCount: 50000,
    checkedItems: [],
    responseData: [],
};


//switch case for handling different actions
const checkedItemReducer = (state = initState, action) => {
    switch (action.type) {
        
        //update the inital count
        case 'SET_COUNT':
            return{
                ...state,
                recordCount: action.payload
            };
        
        //updating the responsedata array and recordcount
        case 'ADD':
            return{
                ...state,
                recordCount: state.recordCount+1,
                responseData: [action.payload, ...state.responseData]
            };
        
        //updating the recorcount and deleting all the invoice id from the checkbox
        case 'DELETED':
            return{
                ...state,
                recordCount: state.recordCount-state.checkedItems.length,
                checkedItems: [],
            };
        //updating checkitem array
        case 'CHECKED_ITEM_1':
            return {
                ...state,
                checkedItems: action.payload
            };
        //updating checkitem array
        case 'CHECKED_ITEM_2':
            return {
                ...state,
                checkedItems: []
            };

        //updating checkitem array
        case 'CHECKED_ITEM_3':
            return {
                ...state,
                checkedItems: [...state.checkedItems, action.payload]
            };

        //updating responsedata array
        case 'ADD_DATA':
            return{
                ...state,
                responseData: action.payload
            };
        
        //updating responsedata array with respect of checked checkboxes
        case 'CHECK':
            let temp = state.responseData;
            temp[action.payload].checked=true;
            return{
                ...state,
                responseData: temp
            };
        //updating responsedata array with respect of unchecked checkboxes
        case 'UNCHECK':
            let temp1 = state.responseData;
            temp1[action.payload].checked=false;
            return{
                ...state,
                responseData: temp1
            };

        default:
            return state;
    }
}

export default checkedItemReducer;