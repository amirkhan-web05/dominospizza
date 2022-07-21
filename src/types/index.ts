export type TypeCategory = string[]

export type TypeCartItems = {
  id:any
  name:string
  images:string
  description:string
  category?:string
  categoryPrice?:number
  price:number
  completed?:boolean,
  count:number
  isLoaded?:boolean
  setIsLoaded?:() => void
  plusChecked?:boolean,
  typePrices?:any
  setPlusChecked?: (id:number) => void
  onAdd?: (items:TypeCartItems) => void;
}

export type TypeCartItemsList = {
  pizzas:TypeCartItems[]
  activeSortType:string
  onAdd?: (items:TypeCartItems) => void
  setPlusChecked: (id:number) => void
  onClickSortBy: (items:TypeSortItems) => void;
  isLoaded?:boolean
  setIsLoaded?:() => void
  activeCategory:string
  onClickCategory: (id:TypeCategoryBtn) => void
}

export type TypeCartPizzasList = {
  pizzas:TypeCartItems[]
}

export type TypeTicketItems = {
  count:number,
  id:number,
  sum:number,
  title:string
}

export type TypeTicketList = {
  ticket:TypeTicketItems[]
}

export type TypeRegisterForm = {
  username:string
  password:string
  email:string
}

export type TypeCartList = {
  cart:TypeCartItems[]
  isLoaded:boolean
}

export type TypeModalCart = {
  modal:boolean
  setModal: (modal:boolean) => void
  cart:TypeCartItems[]
  ticket:TypeTicketItems[]
  onClickTicketItems: ([]) => void
}

export type TypeCategoryBtn = {
  id:number
  category:string
  completed:boolean
}

export type TypeParams = {
  sortBy: TypeSortItems
  categoryBtn: TypeCategoryBtn
}

export type TypeAuthUser = {
  id:number
  email:string
  password:string
  username:string
}

export type TypeAuth = {
  auth:TypeAuthUser[] | null
  loading:boolean
  isAuth:boolean
}

export type TypeRegisterUser = {
  id:number
  email:string
  username:string
  password:string
}

export type TypeCitiesModal = {
  name:string
  population:number
  value?:string
  setValue?:(value:string) => void
  popupCities?:boolean
  setShowCity?: (city:boolean | string) => void;
  setClosePopup?: (modal:boolean) => void
  setPopupCities?: (popup:boolean) => void
}

export type TypeSortItems = {
  type:string
  name:string
  order:string
} 

export type TypeSortBy = {
  items:TypeSortItems[]
  activeSortType:string
  onClickSortBy: (items:TypeSortItems) => void;
}

export type TypeCategoryList = {
  categoryBtn:TypeCategoryBtn[]
  onClickCategory: (categoryBtn:TypeCategoryBtn) => void;
  activeCategory:string
}

export type TypeCitiesModalList = {
  cities:TypeCitiesModal[]
  value?:string
  setValue?:(value:string) => void
  popupCities?:boolean
  showCity?:string | boolean
  setClosePopup?: (modal:boolean) => void
  setShowCity?:(city:boolean | string) => void
  setPopupCities?: (popup:boolean) => void
}

export type TypeAuthMaterial = {
  accessToken: string,
  user: {
    id:number
    username:string
    email:string
    password:string
  }
}

export type TypeRegister = {
  register: TypeAuthMaterial | null
}

export type TypePopup = {
  popup:boolean
  setPopup:(popup:boolean) => void
}

export type TypeHalvesItems = {
  id:number
  name:string
  description:string
  images:string
  halvesImages:string[]
  isHalves:boolean,
  price:number
  activeHalves:boolean
  setActiveHalves:(activeHalves:number) => void;
}

export type TypeHalvesList = {
  halves:TypeHalvesItems[]
  activeHalves:boolean
  setActiveHalves:(activeHalves:number) => void;
}

export type TypeHalvesPizzasList = {
  halves:TypeHalvesItems[]
}

export type TypeFormAuth = {
  email:string
  password:string
}

export type TypeSnackItems = {
  id:number
  name:string
  typePrices?:any
  images:string
  completed?:boolean
  count:number
  description:string
  price:number
  onClickAdd?: (items:TypeSnackItems) => void
}

export type TypeSnackList = {
  snacks:TypeSnackItems[]
  onClickAdd?: (items:TypeSnackItems) => void
}

export type TypeOrders = {
  name:string,
  phone:string,
  email:string,
  street:string,
  home:string,
  apartment:string,
  driveway:string,
  story:string,
  intercomCode:string
}

export type TypeOrdersList = {
  orders:TypeOrders | null
}