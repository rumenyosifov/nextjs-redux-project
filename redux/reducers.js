import { combineReducers } from "redux";
import * as types from "./types";
import { PER_PAGE_ARRAY, SORT_ORDER_ARRAY } from "../lib/constants";

const filterData = (storeData = {}, routerQuery = {}) => {
  //get all filters
  const citySelected = !routerQuery.city ? Object.keys(storeData)[0] : routerQuery.city;
  const nameSelected = routerQuery.name || "";
  const hairColorSelected = routerQuery.hair_color ? routerQuery.hair_color.split("-") : [];
  const professionsSelected = routerQuery.professions ? routerQuery.professions.split("-") : [];
  const gendersSelected = routerQuery.gender ? routerQuery.gender.split("-") : [];
  const agesSelected = routerQuery.age ? routerQuery.age.split("-").map((val) => +val) : [];
  const heightsSelected = routerQuery.height ? routerQuery.height.split("-").map((val) => +val) : [];
  const weightsSelected = routerQuery.weight ? routerQuery.weight.split("-").map((val) => +val) : [];

  //filter data
  let cityData = storeData[citySelected];
  if (
    nameSelected ||
    hairColorSelected.length ||
    professionsSelected.length ||
    gendersSelected.length ||
    agesSelected.length ||
    heightsSelected.length ||
    weightsSelected.length
  ) {
    cityData = cityData.filter((cityzen) => {
      return (
        (!nameSelected || cityzen.name.toLowerCase().includes(nameSelected.toLowerCase())) &&
        (!hairColorSelected.length || hairColorSelected.indexOf(cityzen.hair_color) !== -1) &&
        (!professionsSelected.length ||
          cityzen.professions.reduce((acomulator, element) => {
            if (professionsSelected.indexOf(element) !== -1) {
              acomulator = true;
            }
            return acomulator;
          }, false)) &&
        (!gendersSelected.length ||
          gendersSelected.reduce((acomulator, element) => {
            if (element !== "Female" && /^\S+(te|ia|li)\s/i.test(cityzen.name)) {
              acomulator = true;
            } else if (element !== "Male" && !/^\S+(te|ia|li)\s/i.test(cityzen.name)) {
              acomulator = true;
            }
            return acomulator;
          }, false)) &&
        (!agesSelected.length || (cityzen.age >= agesSelected[0] && cityzen.age <= agesSelected[1])) &&
        (!heightsSelected.length || (cityzen.height >= heightsSelected[0] && cityzen.height <= heightsSelected[1])) &&
        (!weightsSelected.length || (cityzen.weight >= weightsSelected[0] && cityzen.weight <= weightsSelected[1]))
      );
    });
  }

  //get data for the filters
  let minMaxAges = {};
  let minMaxHeights = {};
  let minMaxWeights = {};
  let professionsOptions = [];
  let hairColorsOptions = [];
  storeData[citySelected].forEach((citizen) => {
    if (!minMaxAges.min || minMaxAges.min > citizen.age) minMaxAges.min = citizen.age;
    if (!minMaxAges.max || minMaxAges.max < citizen.age) minMaxAges.max = citizen.age;
    if (!minMaxHeights.min || minMaxHeights.min > citizen.height) minMaxHeights.min = citizen.height;
    if (!minMaxHeights.max || minMaxHeights.max < citizen.height) minMaxHeights.max = citizen.height;
    if (!minMaxWeights.min || minMaxWeights.min > citizen.weight) minMaxWeights.min = citizen.weight;
    if (!minMaxWeights.max || minMaxWeights.max < citizen.weight) minMaxWeights.max = citizen.weight;
    professionsOptions = professionsOptions.concat(citizen.professions.map((profession) => profession.trim()));
    hairColorsOptions.push(citizen.hair_color);
  });
  minMaxHeights = { min: Math.floor(minMaxHeights.min), max: Math.ceil(minMaxHeights.max) };
  minMaxWeights = { min: Math.floor(minMaxWeights.min), max: Math.ceil(minMaxWeights.max) };
  professionsOptions = professionsOptions.filter((profession, i, self) => self.indexOf(profession) === i).sort();
  hairColorsOptions = hairColorsOptions.filter((color, i, self) => self.indexOf(color) === i).sort();

  //collect all filters needed
  const filtersSelected = {
    city: citySelected,
    name: nameSelected,
    hair_color: hairColorSelected,
    professions: professionsSelected,
    gender: gendersSelected,
    age: agesSelected,
    height: heightsSelected,
    weight: weightsSelected,
    page: +routerQuery.page || 1,
    perPage: +routerQuery.perPage || PER_PAGE_ARRAY[0].value,
    order: routerQuery.order || SORT_ORDER_ARRAY[0].value,
    view: routerQuery.view || "grid",
  };
  const filtersData = {
    citiesOptions: Object.keys(storeData),
    professionsOptions,
    hairColorsOptions,
    minMaxSliders: {
      age: minMaxAges,
      height: minMaxHeights,
      weight: minMaxWeights,
    },
    filteredDataLength: cityData.length,
  };
  const orderField = routerQuery.order
    ? routerQuery.order.charAt(0) === "-"
      ? routerQuery.order.substring(1)
      : routerQuery.order
    : SORT_ORDER_ARRAY[0].value;
  const orderDesc = routerQuery.order && routerQuery.order.charAt(0) === "-" ? true : false;

  //order data
  if (orderField) {
    cityData.sort((a, b) => {
      if (typeof a[orderField] === "string" && typeof b[orderField] === "string") {
        var x = a[orderField].toLowerCase();
        var y = b[orderField].toLowerCase();
        if (x < y) {
          return orderDesc ? 1 : -1;
        }
        if (x > y) {
          return orderDesc ? -1 : 1;
        }
        return 0;
      } else {
        return orderDesc ? b[orderField] - a[orderField] : a[orderField] - b[orderField];
      }
    });
  }

  //get page data needed
  const startAt = ((filtersSelected.page || 1) - 1) * filtersSelected.perPage;
  return { pageData: cityData.slice(startAt, startAt + filtersSelected.perPage), filtersData, filtersSelected };
};

const initialDataState = {
  data: {},
  pageData: [],
  filtersSelected: {
    city: "",
    name: "",
    hair_color: [],
    professions: [],
    gender: [],
    age: [],
    height: [],
    weight: [],
    page: 1,
    perPage: PER_PAGE_ARRAY[0].value,
    order: SORT_ORDER_ARRAY[0].value,
    view: "grid",
  },
  filtersData: {
    citiesOptions: [],
    professionsOptions: [],
    hairColorsOptions: [],
    minMaxSliders: {
      age: { min: 0, max: 0 },
      height: { min: 0, max: 0 },
      weight: { min: 0, max: 0 },
    },
    filteredDataLength: 0,
    orderField: "",
    orderDesc: false,
  },
  loading: false,
  errorMessage: "",
};
export const townDataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case types.REQUEST_DATA_START:
      return Object.assign({}, state, { loading: true });
    case types.REQUEST_DATA_SUCCESS:
      let listingData = filterData(action.data || state.data, action.query);
      return Object.assign({}, state, {
        data: action.data || state.data,
        pageData: listingData.pageData,
        filtersSelected: listingData.filtersSelected,
        filtersData: listingData.filtersData,
        loading: false,
      });
    case types.REQUEST_DATA_ERROR:
      return Object.assign({}, state, {
        errorMessage: action.data.message,
        loading: false,
      });
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  townData: townDataReducer,
};

export default combineReducers(reducers);
