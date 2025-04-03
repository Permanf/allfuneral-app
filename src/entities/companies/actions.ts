export function IndexReducer(state:any, action:any) {
    switch (action.type) {
      case "STATUS_FORM": {
        return {
          ...state,
          statusForm: action.payload,
        };
      }
      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
}