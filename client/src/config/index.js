//  for customers
export const registerFormControls = [
  {
    name: "username",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

// for sellers
export const sellerRegistrationControl = [
  {
    step: 1,
    label: "Personal Details",
    fields: [
      { name: "username", label: "user Name", type: "text", required: true ,placeholder:"Enter your name" },
      { name: "email", label: "Email", type: "email", required: true ,placeholder:"Enter your E-mail"},
      { name: "phone", label: "Phone Number", type: "text", required: true ,placeholder:"Enter your phone"},
       { name: "password", label: "Password", type: "password", required: true ,placeholder:"Enter password"},
    ],
  },
  {
    step: 2,
    label: "Business Details",
    fields: [
      { name: "storename", label: "Store Name", type: "text", required: true , placeholder:"Enter your store name"},
      { name: "gstno", label: "GST Number", type: "text", required: false ,placeholder:"Enter GST No." },
      {name:"address",label:"Address",type:"textarea",required:true,placeholder:"Enter Business Address"},
      {
        name: "businesstype",
        label: "Business Type",
        type: "select",
        options: ["Individual", "Company"],
        required: true,
      },
    ],
  },
  {
    step: 3,
    label: "Bank Details & Document",
    fields: [
      {
        name: "bankaccount",
        label: "Bank Account No.",
        type: "text",
        required: true,
        placeholder:"Enter your bank no."
      },
      { name: "ifsccode", label: "IFSC Code", type: "text", required: true,placeholder:"Enter your IFSC CODE" },
      {
        name: "image",
        label: "Upload Document",
        type: "file",
        required: true,
      },
    ],
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Kids" },
      { value: "accessories", label: "Accessories" },
      { value: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { value: "nike", label: "Nike" },
      { value: "adidas", label: "Adidas" },
      { value: "puma", label: "Puma" },
      { value: "levi", label: "Levi's" },
      { value: "zara", label: "Zara" },
      { value: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },

  {
    label: "Discount",
    name: "discount",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale discount % (optional)",
  },

  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
const categories = [
  { name: "Mobiles", image: "/images/mobiles.png" },
  { name: "Fashion", image: "/images/fashion.png" },
  { name: "Electronics", image: "/images/electronics.png" },
  { name: "Home", image: "/images/home.png" },
  { name: "Appliances", image: "/images/appliances.png" },
  { name: "Grocery", image: "/images/grocery.png" },
  { name: "Toys", image: "/images/toys.png" },
];

export const shoppingViewHeaderMenuItems = [
  // {
  //   id: "home",
  //   label: "Home",
  //   path: "/",
  //   icon:"https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/home-page-161.png"
  // },
  // {
  //   id: "products",
  //   label: "Products",
  //   path: "/shop/listing",
  //   icon:"https://icons.veryicon.com/png/o/miscellaneous/fu-jia-intranet/product-29.png"
  // },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
    icon: "https://static.vecteezy.com/system/resources/previews/041/642/170/non_2x/ai-generated-portrait-of-handsome-smiling-young-man-with-folded-arms-isolated-free-png.png",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
    icon: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsb2ZmaWNlMTJfcG9ydHJhaXRfb2ZfYV9iZWF1dGlmdWxfc21pbGluZ193b21hbl93aXRoX2xvbl82NzMzY2ExNy0zMzYxLTRhY2EtOTc3Ni00MzdkN2E2ZDc2MzItbTNwamdqbWUucG5n.png",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6V9anbIwpuBOdNH18b6gfH64qvF387k-rwA&s",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1_zTHwdU4YzE9kCHKLeGzoSHy4ji6k1J4Kw&s",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50n4JdjooAsIugQeVNzeC12PcdTObYUPGzs3lB6Q-nUKMlgC61fjhJfrkdYeEuiL1RcU&usqp=CAU",
  },
  {
    id: "mobile",
    label: "Mobile",
    path: "/shop/listing",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100",
  },
  {
    id: "appliances",
    label: "Appliances",
    path: "/shop/listing",
    icon: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100",
  },
  {
    id: "electonics",
    label: "Electronics",
    path: "/shop/listing",
    icon: "https://images.jdmagicbox.com/quickquotes/images_main/asus-laptops-23-06-2022-008-271952148-l3wx9uq7.png",
  },
  {
    id: "fashion",
    label: "Fashion",
    path: "/shop/listing",
    icon: "https://static.vecteezy.com/system/resources/previews/050/817/602/non_2x/smiling-young-man-and-woman-pointing-at-camera-standing-side-view-isolate-on-transparent-background-png.png",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
  mobile: "Mobile",
  appliances: "Appliances",
  electonics: "Electronics",
  fashion: "Fashion",
};

export const brandOptionsMap = {
  apple: "Apple",
  samsung: "Samsung",
  oneplus: "OnePlus",
  xiaomi: "Xiaomi",
  realme: "Realme",
  vivo: "Vivo",
  oppo: "Oppo",
  motorola: "Motorola",
  nokia: "Nokia",
  asus: "Asus",
  dell: "Dell",
  hp: "HP",
  lenovo: "Lenovo",
  acer: "Acer",
  msi: "MSI",
  sony: "Sony",
  lg: "LG",
  canon: "Canon",
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  reebok: "Reebok",
  woodland: "Woodland",
  levis: "Levi's",
  "allen-solly": "Allen Solly",
  "us-polo": "U.S. Polo Assn.",
  "h&m": "H&M",
  zara: "Zara",
  boat: "Boat",
  noise: "Noise",
  fastrack: "Fastrack",
  titan: "Titan",
  casio: "Casio",
  philips: "Philips",
  panasonic: "Panasonic",
  whirlpool: "Whirlpool",
  godrej: "Godrej",
  voltas: "Voltas",
  daikin: "Daikin",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
    { id: "mobile", label: "Mobile" },
    { id: "appliances", label: "Appliances" },
    { id: "electonics", label: "Electronics" },
    { id: "fashion", label: "Fashion" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const profileFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
    disabled: true, 
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    disabled: true, 
  },
  {
    name: "phone",
    label: "Mobile Number",
    type: "tel",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: false,
  },
 
 
  
];


export const addressFormControls = [

   
   {
    name: "phone",
    label: "Mobile Number",
    type: "tel",
    componentType: "input",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    label: "Address",
    name: "address",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter your address",
  },
  
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
  {
    name: "place",
    label: "Your place",
    componentType: "radio",
    
    options: [
      { value: "home", label: "Home" },
      { value: "work", label: "Work" },
      
    ],
  },
  
];
