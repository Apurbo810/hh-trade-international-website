import gs_logo from "./gs_logo.jpg"

import happy_store from "./happy_store.webp"

import upload_area from "./upload_area.svg"

import hero_model_img from "./hero_model_img.png"

import hero_product_img1 from "./hero_product_img1.png"

import hero_product_img2 from "./hero_product_img2.png"

import product_img1 from "./product_img1.png"

import product_img2 from "./product_img2.png"

import product_img3 from "./product_img3.png"

import product_img4 from "./product_img4.png"

import product_img5 from "./product_img5.png"

import product_img6 from "./product_img6.png"

import product_img7 from "./product_img7.png"

import product_img8 from "./product_img8.png"

import product_img9 from "./product_img9.png"

import product_img10 from "./product_img10.png"

import product_img11 from "./product_img11.png"

import product_img12 from "./product_img12.png"

import {
    ClockFadingIcon,
    HeadsetIcon,
    SendIcon
} from "lucide-react"

import profile_pic1 from "./profile_pic1.jpg"

import profile_pic2 from "./profile_pic2.jpg"

import profile_pic3 from "./profile_pic3.jpg"


export const assets = {
    upload_area,
    hero_model_img,

    hero_product_img1,
    hero_product_img2,
    gs_logo,

    product_img1,
    product_img2,
    product_img3,
    product_img4,
    product_img5,
    product_img6,
    product_img7,
    product_img8,
    product_img9,
    product_img10,
    product_img11,
    product_img12,
}


/* =====================================================
   CATEGORIES
===================================================== */

export const categories = [
    "Skincare",
    "Face Care",
    "Hair Care",
    "Baby Care",
    "Fragrance",
    "Tea & Wellness",
    "Personal Care",
    "Beauty Sets",
]


/* =====================================================
   RATINGS
===================================================== */

export const dummyRatingsData = [

    {
        id: "rat_1",
        rating: 4.8,
        review:
            "I was really happy with the quality. The product feels premium, works exactly as expected, and the packaging was also very nice.",
        user: {
            name: "Kristin Watson",
            image: profile_pic1
        },
        productId: "prod_1",
        createdAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        updatedAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        product: {
            name: "Baby Soft Hair Brush",
            category: "Baby Care",
            id: "prod_1"
        }
    },

    {
        id: "rat_2",
        rating: 5.0,
        review:
            "Absolutely loved this product. It is easy to use, feels great, and the quality is better than I expected.",
        user: {
            name: "Jenny Wilson",
            image: profile_pic2
        },
        productId: "prod_2",
        createdAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        updatedAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        product: {
            name: "Hydrating Face Sheet Mask",
            category: "Skincare",
            id: "prod_2"
        }
    },

    {
        id: "rat_3",
        rating: 4.6,
        review:
            "Very good product for everyday use. The quality feels nice and I would definitely consider buying it again.",
        user: {
            name: "Bessie Cooper",
            image: profile_pic3
        },
        productId: "prod_3",
        createdAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        updatedAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        product: {
            name: "Acne Care Patches",
            category: "Face Care",
            id: "prod_3"
        }
    },

    {
        id: "rat_4",
        rating: 4.9,
        review:
            "The product arrived nicely packaged and the quality is excellent. Very happy with the purchase.",
        user: {
            name: "Kristin Watson",
            image: profile_pic1
        },
        productId: "prod_4",
        createdAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        updatedAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        product: {
            name: "Anua Face Wash",
            category: "Face Care",
            id: "prod_4"
        }
    },

    {
        id: "rat_5",
        rating: 4.5,
        review:
            "The product looks and feels premium. Great choice for everyday use and the packaging was also very good.",
        user: {
            name: "Jenny Wilson",
            image: profile_pic2
        },
        productId: "prod_5",
        createdAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        updatedAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        product: {
            name: "Premium Fragrance",
            category: "Fragrance",
            id: "prod_5"
        }
    },

    {
        id: "rat_6",
        rating: 5.0,
        review:
            "Really nice product. Everything was exactly as described and the overall experience was excellent.",
        user: {
            name: "Bessie Cooper",
            image: profile_pic3
        },
        productId: "prod_6",
        createdAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        updatedAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
        product: {
            name: "Variety Tea Collection",
            category: "Tea & Wellness",
            id: "prod_6"
        }
    },

]


/* =====================================================
   STORE
===================================================== */

export const dummyStoreData = {

    id: "store_1",

    userId: "user_1",

    name: "H.H. Trade International",

    description:
        "H.H. Trade International brings together carefully selected beauty, skincare, personal care, baby care, fragrance, and wellness products for everyday life.",

    username: "hhtradeinternational",

    address:
        "Dhaka, Bangladesh",

    status: "approved",

    isActive: true,

    logo: happy_store,

    email:
        "info@hhtradeinternational.com",

    contact:
        "+880 1234-567890",

    createdAt:
        "2025-09-04T09:04:16.189Z",

    updatedAt:
        "2025-09-04T09:04:44.273Z",

    user: {

        id: "user_31dOriXqC4TATvc0brIhlYbwwc5",

        name: "H.H. Trade International",

        email:
            "info@hhtradeinternational.com",

        image: gs_logo,

    }

}


/* =====================================================
   PRODUCTS
===================================================== */

export const productDummyData = [

    {
        id: "prod_1",

        name: "Baby Soft Hair Brush",

        description:
            "A gentle baby hair brush with soft bristles designed for delicate scalps. Perfect for comfortable everyday baby grooming.",

        mrp: 450,

        price: 350,

        images: [
            product_img1,
            product_img2,
            product_img3,
            product_img4
        ],

        category: "Baby Care",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: dummyRatingsData,

        createdAt:
            "Sat Jul 29 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 29 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_2",

        name: "Hydrating Face Sheet Mask",

        description:
            "A refreshing face sheet mask designed to hydrate and nourish the skin while leaving it feeling soft, fresh, and refreshed.",

        mrp: 180,

        price: 120,

        images: [
            product_img2
        ],

        category: "Skincare",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: dummyRatingsData,

        createdAt:
            "Sat Jul 28 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 28 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_3",

        name: "Acne Care Patches",

        description:
            "Easy-to-use acne care patches designed to protect blemishes and support a cleaner-looking complexion.",

        mrp: 350,

        price: 280,

        images: [
            product_img3
        ],

        category: "Face Care",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: dummyRatingsData,

        createdAt:
            "Sat Jul 27 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 27 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_4",

        name: "Anua Face Wash",

        description:
            "A gentle daily face cleanser designed to remove impurities while keeping your skin feeling fresh, clean, and comfortable.",

        mrp: 1850,

        price: 1590,

        images: [
            product_img4
        ],

        category: "Face Care",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: dummyRatingsData,

        createdAt:
            "Sat Jul 26 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 26 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_5",

        name: "Premium Fragrance",

        description:
            "A pleasant everyday fragrance with a refined scent suitable for daily wear, special occasions, and gifting.",

        mrp: 2200,

        price: 1890,

        images: [
            product_img5
        ],

        category: "Fragrance",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: [
            ...dummyRatingsData,
            ...dummyRatingsData
        ],

        createdAt:
            "Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_6",

        name: "Variety Tea Collection",

        description:
            "A carefully selected collection of tea varieties for relaxing mornings, afternoon breaks, and peaceful evenings.",

        mrp: 950,

        price: 790,

        images: [
            product_img6
        ],

        category: "Tea & Wellness",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: [
            ...dummyRatingsData,
            ...dummyRatingsData
        ],

        createdAt:
            "Sat Jul 24 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 24 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_7",

        name: "Daily Care Essentials",

        description:
            "A practical collection of everyday personal care essentials designed to make your daily self-care routine simple and convenient.",

        mrp: 1450,

        price: 1190,

        images: [
            product_img7
        ],

        category: "Personal Care",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: [
            ...dummyRatingsData,
            ...dummyRatingsData
        ],

        createdAt:
            "Sat Jul 23 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 23 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_8",

        name: "Glow & Care Beauty Set",

        description:
            "A convenient beauty care collection featuring everyday essentials for a simple and enjoyable self-care routine.",

        mrp: 2800,

        price: 2390,

        images: [
            product_img8
        ],

        category: "Beauty Sets",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: [
            ...dummyRatingsData,
            ...dummyRatingsData
        ],

        createdAt:
            "Sat Jul 22 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 22 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_9",

        name: "Nourishing Face Care",

        description:
            "A nourishing skincare essential designed to support a soft, smooth, and refreshed-looking complexion.",

        mrp: 1250,

        price: 990,

        images: [
            product_img9
        ],

        category: "Skincare",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: [
            ...dummyRatingsData,
            ...dummyRatingsData
        ],

        createdAt:
            "Sat Jul 21 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 21 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_10",

        name: "Daily Hair Care Essential",

        description:
            "An everyday hair care essential designed to keep hair feeling clean, soft, manageable, and refreshed.",

        mrp: 1100,

        price: 890,

        images: [
            product_img10
        ],

        category: "Hair Care",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: [
            ...dummyRatingsData,
            ...dummyRatingsData
        ],

        createdAt:
            "Sat Jul 20 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 20 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_11",

        name: "Refreshing Body Care",

        description:
            "A refreshing personal care essential designed for your everyday body care routine, leaving your skin feeling clean and comfortable.",

        mrp: 850,

        price: 690,

        images: [
            product_img11
        ],

        category: "Personal Care",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: [
            ...dummyRatingsData,
            ...dummyRatingsData
        ],

        createdAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    },


    {
        id: "prod_12",

        name: "Complete Self Care Bundle",

        description:
            "A complete collection of personal care essentials for building a simple and enjoyable everyday self-care routine.",

        mrp: 3200,

        price: 2690,

        images: [
            product_img12
        ],

        category: "Beauty Sets",

        storeId: "seller_1",

        inStock: true,

        store: dummyStoreData,

        rating: [
            ...dummyRatingsData,
            ...dummyRatingsData
        ],

        createdAt:
            "Sat Jul 18 2025 14:51:25 GMT+0530 (India Standard Time)",

        updatedAt:
            "Sat Jul 18 2025 14:51:25 GMT+0530 (India Standard Time)",
    },

]


/* =====================================================
   STORE SPECIFICATIONS
===================================================== */

export const ourSpecsData = [

    {
        title: "Free Shipping",

        description:
            "Enjoy fast, free delivery on every order with reliable doorstep delivery.",

        icon: SendIcon,

        accent: "#F7941D"
    },

    {
        title: "7 Days Easy Return",

        description:
            "Changed your mind? No worries. Return eligible items within 7 days.",

        icon: ClockFadingIcon,

        accent: "#FF8904"
    },

    {
        title: "24/7 Customer Support",

        description:
            "We're here to help. Get support whenever you need assistance with your order.",

        icon: HeadsetIcon,

        accent: "#E67E00"
    }

]


/* =====================================================
   ADDRESS
===================================================== */

export const addressDummyData = {

    id: "addr_1",

    userId: "user_1",

    name: "John Doe",

    email: "johndoe@example.com",

    street: "123 Main St",

    city: "Dhaka",

    state: "Dhaka",

    zip: "1200",

    country: "Bangladesh",

    phone: "01234567890",

    createdAt:
        "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",

}


/* =====================================================
   USER
===================================================== */

export const dummyUserData = {

    id: "user_31dQbH27HVtovbs13X2cmqefddM",

    name: "H.H. Trade International",

    email: "info@hhtradeinternational.com",

    image: gs_logo,

    cart: {}

}


/* =====================================================
   ORDERS
===================================================== */

export const orderDummyData = [

    {
        id: "cmemm75h5001jtat89016h1p3",

        total: 214.2,

        status: "DELIVERED",

        userId:
            "user_31dQbH27HVtovbs13X2cmqefddM",

        storeId:
            "cmemkqnzm000htat8u7n8cpte",

        addressId:
            "cmemm6g95001ftat8omv9b883",

        isPaid: false,

        paymentMethod: "COD",

        createdAt:
            "2025-08-22T09:15:03.929Z",

        updatedAt:
            "2025-08-22T09:15:50.723Z",

        orderItems: [

            {
                orderId:
                    "cmemm75h5001jtat89016h1p3",

                productId:
                    "cmemlydnx0017tat8h3rg92hz",

                quantity: 1,

                price: 350,

                product:
                    productDummyData[0],
            },

            {
                orderId:
                    "cmemm75h5001jtat89016h1p3",

                productId:
                    "cmemlxgnk0015tat84qm8si5v",

                quantity: 1,

                price: 120,

                product:
                    productDummyData[1],
            }

        ],

        address: addressDummyData,

        user: dummyUserData

    },


    {
        id: "cmemm6jv7001htat8vmm3gxaf",

        total: 421.6,

        status: "DELIVERED",

        userId:
            "user_31dQbH27HVtovbs13X2cmqefddM",

        storeId:
            "cmemkqnzm000htat8u7n8cpte",

        addressId:
            "cmemm6g95001ftat8omv9b883",

        isPaid: false,

        paymentMethod: "COD",

        createdAt:
            "2025-08-22T09:14:35.923Z",

        updatedAt:
            "2025-08-22T09:15:52.535Z",

        orderItems: [

            {
                orderId:
                    "cmemm6jv7001htat8vmm3gxaf",

                productId:
                    "cmemm1f3y001dtat8liccisar",

                quantity: 1,

                price: 280,

                product:
                    productDummyData[2],
            },

            {
                orderId:
                    "cmemm6jv7001htat8vmm3gxaf",

                productId:
                    "cmemm0nh2001btat8glfvhry1",

                quantity: 1,

                price: 1590,

                product:
                    productDummyData[3],
            },

            {
                orderId:
                    "cmemm6jv7001htat8vmm3gxaf",

                productId:
                    "cmemlz8640019tat8kz7emqca",

                quantity: 1,

                price: 1890,

                product:
                    productDummyData[4],
            }

        ],

        address: addressDummyData,

        user: dummyUserData

    }

]


/* =====================================================
   STORES
===================================================== */

export const storesDummyData = [

    {
        id:
            "cmemkb98v0001tat8r1hiyxhn",

        userId:
            "user_31dOriXqC4TATvc0brIhlYbwwc5",

        name:
            "H.H. Trade International",

        description:
            "H.H. Trade International is a personal care and lifestyle store offering beauty, skincare, baby care, fragrance, and wellness products.",

        username:
            "hhtradeinternational",

        address:
            "Dhaka, Bangladesh",

        status:
            "approved",

        isActive:
            true,

        logo:
            gs_logo,

        email:
            "info@hhtradeinternational.com",

        contact:
            "+880 1234-567890",

        createdAt:
            "2025-08-22T08:22:16.189Z",

        updatedAt:
            "2025-08-22T08:22:44.273Z",

        user:
            dummyUserData,
    },


    {
        id:
            "cmemkqnzm000htat8u7n8cpte",

        userId:
            "user_31dQbH27HVtovbs13X2cmqefddM",

        name:
            "H.H. Trade International",

        description:
            "Shop beauty, skincare, baby care, fragrance, personal care, and wellness products from H.H. Trade International.",

        username:
            "hhtradeinternational",

        address:
            "Dhaka, Bangladesh",

        status:
            "approved",

        isActive:
            true,

        logo:
            happy_store,

        email:
            "info@hhtradeinternational.com",

        contact:
            "+880 1234-567890",

        createdAt:
            "2025-08-22T08:34:15.155Z",

        updatedAt:
            "2025-08-22T08:34:47.162Z",

        user:
            dummyUserData,

    }

]


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

export const dummyAdminDashboardData = {

    orders: 6,

    stores: 2,

    products: 12,

    revenue: "959.10",

    allOrders: [

        {
            createdAt:
                "2025-08-20T08:46:58.239Z",
            total: 145.6
        },

        {
            createdAt:
                "2025-08-22T08:46:21.818Z",
            total: 97.2
        },

        {
            createdAt:
                "2025-08-22T08:45:59.587Z",
            total: 54.4
        },

        {
            createdAt:
                "2025-08-23T09:15:03.929Z",
            total: 214.2
        },

        {
            createdAt:
                "2025-08-23T09:14:35.923Z",
            total: 421.6
        },

        {
            createdAt:
                "2025-08-23T11:44:29.713Z",
            total: 26.1
        },

        {
            createdAt:
                "2025-08-24T09:15:03.929Z",
            total: 214.2
        },

        {
            createdAt:
                "2025-08-24T09:14:35.923Z",
            total: 421.6
        },

        {
            createdAt:
                "2025-08-24T11:44:29.713Z",
            total: 26.1
        },

        {
            createdAt:
                "2025-08-24T11:56:29.713Z",
            total: 36.1
        },

        {
            createdAt:
                "2025-08-25T11:44:29.713Z",
            total: 26.1
        },

        {
            createdAt:
                "2025-08-25T09:15:03.929Z",
            total: 214.2
        },

        {
            createdAt:
                "2025-08-25T09:14:35.923Z",
            total: 421.6
        },

        {
            createdAt:
                "2025-08-25T11:44:29.713Z",
            total: 26.1
        },

        {
            createdAt:
                "2025-08-25T11:56:29.713Z",
            total: 36.1
        },

        {
            createdAt:
                "2025-08-25T11:30:29.713Z",
            total: 110.1
        }

    ]

}


/* =====================================================
   STORE DASHBOARD
===================================================== */

export const dummyStoreDashboardData = {

    ratings: dummyRatingsData,

    totalOrders: 2,

    totalEarnings: 636,

    totalProducts: 12

}