/**
 * StyleGuru.ai - AI Fashion & Wellness Service (Backend)
 *
 * This service simulates generating realistic, actionable recommendations.
 * In a production environment, this would be replaced with calls to:
 * 1. A real AI model (e.g., GPT-4, Gemini) to generate recommendation ideas.
 * 2. Real-time E-commerce APIs (e.g., Amazon Product Advertising API, Flipkart API)
 *    or web scraping services to fetch product data (prices, images, links).
 */

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const generatePrice = (min, max) => `₹${(Math.random() * (max - min) + min).toFixed(0)}`;
const generateSearchLink = (retailer, itemName) => {
    const query = encodeURIComponent(itemName);
    switch (retailer) {
        case 'amazon':
            return `https://www.amazon.in/s?k=${query}`;
        case 'myntra':
            return `https://www.myntra.com/${query}`;
        case 'flipkart':
            return `https://www.flipkart.com/search?q=${query}`;
        default:
            return '#';
    }
};

// =================================================================
// REALISTIC MOCK PRODUCT DATABASES
// =================================================================

const mockClothingDatabase = {
    Male: {
        tops: [
            { name: "Levi's Classic Crewneck T-Shirt", category: "Top", image: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/p/s/e/s-21798-103-levi-s-original-imagz3y8z3nh6wmc.jpeg?q=70", price: generatePrice(800, 1500), link: generateSearchLink('amazon', "Levi's Classic Crewneck T-Shirt") },
            { name: "Arrow Formal Cotton Shirt", category: "Top", image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/i/v/9/-original-imagn3k3gx6zfvgy.jpeg?q=70", price: generatePrice(1500, 2500), link: generateSearchLink('myntra', "Arrow Formal Cotton Shirt") },
            { name: "Puma Graphic Hoodie", category: "Top", image: "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/t/u/b/m-67591001-puma-original-imagvff3sezb6hmy.jpeg?q=70", price: generatePrice(2000, 3500), link: generateSearchLink('flipkart', "Puma Graphic Hoodie") },
        ],
        bottoms: [
            { name: "U.S. Polo Assn. Denim Jeans", category: "Bottom", image: "https://assets.ajio.com/medias/sys_master/root/20231123/2ywx/655f4692ddf7791519a0094d/-473Wx593H-466810239-midblue-MODEL.jpg", price: generatePrice(2000, 3500), link: generateSearchLink('amazon', "U.S. Polo Assn. Denim Jeans") },
            { name: "Peter England Slim Fit Chinos", category: "Bottom", image: "https://assets.ajio.com/medias/sys_master/root/20230624/6Gzm/64966953e4b0ef1aaa08a3f8/-473Wx593H-464082662-black-MODEL.jpg", price: generatePrice(1500, 2800), link: generateSearchLink('myntra', "Peter England Slim Fit Chinos") },
        ],
        shoes: [
            { name: "Adidas Stan Smith Sneakers", category: "Shoes", image: "https://assets.ajio.com/medias/sys_master/root/20230623/Gg9x/649503414d7b3b720c782977/-473Wx593H-469493113-white-MODEL.jpg", price: generatePrice(4000, 7000), link: generateSearchLink('flipkart', "Adidas Stan Smith Sneakers") },
            { name: "Bata Leather Loafers", category: "Shoes", image: "https://assets.ajio.com/medias/sys_master/root/20230623/46rE/6494fc874d7b3b720c75ce23/-473Wx593H-464683072-brown-MODEL.jpg", price: generatePrice(2000, 4000), link: generateSearchLink('myntra', "Bata Leather Loafers") },
        ]
    },
    Female: {
        tops: [
            { name: "Vero Moda Silk Blouse", category: "Top", image: "https://images.bewakoof.com/t1080/women-s-pink-solid-shirt-580373-1679032582-1.jpg", price: generatePrice(1200, 2200), link: generateSearchLink('myntra', "Vero Moda Silk Blouse") },
            { name: "Zara Off-Shoulder Top", category: "Top", image: "https://static.zara.net/photos///2024/V/0/1/p/2332/023/250/2/w/428/2332023250_6_1_1.jpg?ts=1708687424368", price: generatePrice(1800, 3000), link: generateSearchLink('amazon', "Zara Off-Shoulder Top") },
        ],
        bottoms: [
            { name: "Levi's High-Waisted Skinny Jeans", category: "Bottom", image: "https://www.levi.in/dw/image/v2/BGFM_PRD/on/demandware.static/-/Sites-LeviMaster-Catalog/en_IN/dwb72b6c73/images/hi-res/188820464/188820464_01_Front.jpg?sw=382&sh=500", price: generatePrice(2500, 4500), link: generateSearchLink('flipkart', "Levi's High-Waisted Skinny Jeans") },
            { name: "FabIndia A-Line Skirt", category: "Bottom", image: "https://assets.ajio.com/medias/sys_master/root/20230718/z7v1/64b6b668a9b42d15c9945a1c/-473Wx593H-461118693-multi-MODEL.jpg", price: generatePrice(1500, 3000), link: generateSearchLink('myntra', "FabIndia A-Line Skirt") },
        ],
        shoes: [
            { name: "Catwalk Heeled Sandals", category: "Shoes", image: "https://assets.ajio.com/medias/sys_master/root/20230831/p4iL/64f0ca5dddf7791519f07a67/-473Wx593H-466518596-gold-MODEL.jpg", price: generatePrice(1500, 2800), link: generateSearchLink('myntra', "Catwalk Heeled Sandals") },
            { name: "Clarks Ballet Flats", category: "Shoes", image: "https://assets.ajio.com/medias/sys_master/root/20230623/t8gS/6494f1504d7b3b720c7324e6/-473Wx593H-463806143-black-MODEL.jpg", price: generatePrice(2500, 5000), link: generateSearchLink('amazon', "Clarks Ballet Flats") },
        ]
    },
    Other: { // Gender-neutral options
        tops: [{ name: "H&M Oversized Graphic Tee", category: "Top", image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fef%2F75%2Fef7505537559112953284f18d7f7e91ab195156c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]", price: generatePrice(1000, 1800), link: generateSearchLink('myntra', "H&M Oversized Graphic Tee") }],
        bottoms: [{ name: "Decathlon Utility Trousers", category: "Bottom", image: "https://contents.mediadecathlon.com/p2153799/k$93959146522c154388e6ab5305115160/mens-travel-trekking-cargo-trousers-travel-100.jpg?format=auto&quality=40&f=800x800", price: generatePrice(1500, 2500), link: generateSearchLink('flipkart', "Decathlon Utility Trousers") }],
        shoes: [{ name: "Converse High-Tops", category: "Shoes", image: "https://www.converse.in/media/catalog/product/cache/120179a0b01fea158864cb73f15b6781/1/6/162050c_1_2.jpg", price: generatePrice(3000, 5000), link: generateSearchLink('amazon', "Converse High-Tops") }],
    }
};

const mockAccessoryDatabase = {
    Male: [
        { name: "Fossil Chronograph Watch", category: "Accessory", image: "https://fossil.scene7.com/is/image/Fossil/FS4812_main?$sfcc_b2c_pdp_d2c_large$", price: generatePrice(8000, 15000), link: generateSearchLink('amazon', "Fossil Chronograph Watch") },
        { name: "Tommy Hilfiger Leather Belt", category: "Accessory", image: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2123149/2017/9/25/11506305086842-Tommy-Hilfiger-Men-Brown-Leather-Belt-3281506305086653-1.jpg", price: generatePrice(1500, 3000), link: generateSearchLink('myntra', "Tommy Hilfiger Leather Belt") },
    ],
    Female: [
        { name: "Giva Silver Necklace", category: "Accessory", image: "https://www.giva.co/cdn/shop/products/NK096-1_2.jpg?v=1682573752&width=1000", price: generatePrice(1200, 3000), link: generateSearchLink('myntra', "Giva Silver Necklace") },
        { name: "Baggit Women's Handbag", category: "Accessory", image: "https://www.baggit.com/cdn/shop/files/YOLOLYYZESTA-BEIGE_1.jpg?v=1708343997&width=800", price: generatePrice(2000, 4000), link: generateSearchLink('flipkart', "Baggit Women's Handbag") },
    ],
    Other: [
        { name: "Ray-Ban Aviator Sunglasses", category: "Accessory", image: "https://india.ray-ban.com/media/catalog/product/cache/ecdbd5a50e7f997f21226adb85763570/0/r/0rb3025l020558_1.jpg", price: generatePrice(5000, 9000), link: generateSearchLink('amazon', "Ray-Ban Aviator Sunglasses") },
    ]
};

const mockEyewearDatabase = {
    Round: [{ name: "Lenskart Cat-Eye Frames", image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95/vincent-chase-vc-e13031-c2-eyeglasses_G_5836.jpg", price: generatePrice(1500, 4000), link: generateSearchLink('amazon', "Lenskart Cat-Eye Frames") }],
    Square: [{ name: "Ray-Ban Round Metal Frames", image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95/ray-ban-rb6378-2904-size-51-black-round-metal-eyeglasses_g_3774_1_1.jpg", price: generatePrice(6000, 10000), link: generateSearchLink('myntra', "Ray-Ban Round Metal Frames") }],
    Oval: [{ name: "Coolwinks Square Sunglasses", image: "https://rukminim2.flixcart.com/image/832/832/xif0q/sunglass/c/s/s/-original-imagx43kghvzys4z.jpeg?q=70", price: generatePrice(1000, 2500), link: generateSearchLink('flipkart', "Coolwinks Square Sunglasses") }],
    Heart: [{ name: "John Jacobs Rimless Glasses", image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95/john-jacobs-jj-e11516-c1-eyeglasses_G_9421.jpg", price: generatePrice(3000, 6000), link: generateSearchLink('amazon', "John Jacobs Rimless Glasses") }],
};


// =================================================================
// PROFESSIONAL MEAL DATABASE — 66 meals with full macros & prep time
// Each meal is tagged for strict dietary restriction compliance.
// Tags: 'vegetarian', 'vegan', 'keto', 'gluten-free', 'dairy-free', 'non-veg', 'high-protein', 'low-carb'
// =================================================================
const mockMealDatabase = [

    // ===================== BREAKFAST =====================

    // --- Vegan Breakfasts ---
    { type: 'breakfast', name: "Chickpea Flour Omelette", description: "A savory omelette made from besan (chickpea flour) with diced tomatoes, onions, green chillies, and fresh coriander. Served with a side of avocado.", calories: 340, protein: 18, carbs: 32, fat: 16, prepTime: "15 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
    { type: 'breakfast', name: "Overnight Chia Pudding", description: "Chia seeds soaked overnight in coconut milk, layered with fresh mango, passion fruit, toasted coconut flakes, and a drizzle of maple syrup.", calories: 310, protein: 8, carbs: 38, fat: 16, prepTime: "5 min prep + overnight", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    { type: 'breakfast', name: "Sweet Potato & Black Bean Breakfast Tacos", description: "Warm corn tortillas filled with roasted sweet potato, seasoned black beans, avocado crema, pickled red onion, and fresh cilantro.", calories: 420, protein: 14, carbs: 58, fat: 16, prepTime: "20 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
    { type: 'breakfast', name: "Vegan Protein Smoothie Bowl", description: "Thick acai blend with pea protein, topped with granola, sliced banana, fresh berries, hemp seeds, and a drizzle of almond butter.", calories: 380, protein: 22, carbs: 48, fat: 14, prepTime: "10 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },

    // --- Vegetarian Breakfasts ---
    { type: 'breakfast', name: "Masala Egg Bhurji", description: "Indian-style scrambled eggs with onions, tomatoes, green chillies, turmeric, and fresh coriander. Served with two multigrain rotis.", calories: 380, protein: 22, carbs: 30, fat: 18, prepTime: "12 min", tags: ['vegetarian', 'dairy-free', 'high-protein'] },
    { type: 'breakfast', name: "Greek Yogurt Parfait with Honey & Walnuts", description: "Thick Greek yogurt layered with raw honey, toasted walnuts, mixed berries, and a sprinkle of ground flaxseed for omega-3s.", calories: 320, protein: 20, carbs: 34, fat: 12, prepTime: "5 min", tags: ['vegetarian', 'gluten-free', 'high-protein'] },
    { type: 'breakfast', name: "Spinach & Cheese Stuffed Paratha", description: "Whole-wheat paratha stuffed with fresh spinach, paneer, and spices. Served with a side of mint-coriander chutney and low-fat curd.", calories: 440, protein: 18, carbs: 48, fat: 20, prepTime: "20 min", tags: ['vegetarian', 'high-protein'] },
    { type: 'breakfast', name: "Avocado Toast with Poached Eggs", description: "Two slices of sourdough toast topped with ripe avocado, two perfectly poached eggs, chilli flakes, microgreens, and a squeeze of lemon.", calories: 400, protein: 18, carbs: 36, fat: 22, prepTime: "15 min", tags: ['vegetarian', 'dairy-free'] },

    // --- Keto Breakfasts ---
    { type: 'breakfast', name: "Keto Egg Muffins with Spinach & Cheese", description: "Baked egg muffins loaded with fresh spinach, bell peppers, mozzarella cheese, and Italian herbs. Zero carbs, maximum protein.", calories: 350, protein: 24, carbs: 4, fat: 26, prepTime: "25 min", tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free', 'high-protein'] },
    { type: 'breakfast', name: "Bulletproof Coffee & Almond Flour Pancakes", description: "Fluffy almond flour pancakes with butter and sugar-free maple syrup, paired with bulletproof coffee blended with MCT oil.", calories: 420, protein: 14, carbs: 8, fat: 38, prepTime: "15 min", tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free'] },
    { type: 'breakfast', name: "Smoked Salmon Cream Cheese Roll-Ups", description: "Sliced Norwegian smoked salmon rolled with herbed cream cheese, capers, thinly sliced cucumber, and fresh dill.", calories: 380, protein: 28, carbs: 3, fat: 28, prepTime: "8 min", tags: ['non-veg', 'keto', 'low-carb', 'gluten-free', 'high-protein'] },

    // --- Non-Veg Breakfasts ---
    { type: 'breakfast', name: "Turkey Sausage & Veggie Scramble", description: "Lean turkey sausage crumbled and scrambled with bell peppers, mushrooms, spinach, and two whole eggs. Seasoned with smoked paprika.", calories: 420, protein: 34, carbs: 8, fat: 28, prepTime: "15 min", tags: ['non-veg', 'high-protein', 'low-carb', 'gluten-free', 'dairy-free'] },
    { type: 'breakfast', name: "Chicken Keema Paratha", description: "Whole-wheat paratha stuffed with spiced minced chicken, onions, ginger, and fresh coriander. Served with raita on the side.", calories: 460, protein: 28, carbs: 42, fat: 20, prepTime: "25 min", tags: ['non-veg', 'high-protein'] },

    // --- Gluten-Free Breakfasts ---
    { type: 'breakfast', name: "Banana Oat Pancakes (GF)", description: "Fluffy pancakes made from certified gluten-free oats and ripe bananas, topped with fresh blueberries, a dollop of almond butter, and maple syrup.", calories: 360, protein: 12, carbs: 52, fat: 14, prepTime: "15 min", tags: ['vegetarian', 'gluten-free', 'dairy-free'] },
    { type: 'breakfast', name: "South Indian Dosa with Coconut Chutney", description: "Crispy rice-and-lentil dosa filled with spiced potato masala, served with fresh coconut chutney and sambar.", calories: 350, protein: 10, carbs: 54, fat: 10, prepTime: "20 min", tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },

    // ===================== LUNCH =====================

    // --- Vegan Lunches ---
    { type: 'lunch', name: "Mediterranean Falafel Bowl", description: "Crispy baked falafel over a bed of quinoa with hummus, tabbouleh, roasted red peppers, Kalamata olives, and a tahini-lemon dressing.", calories: 520, protein: 22, carbs: 62, fat: 22, prepTime: "30 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'high-protein'] },
    { type: 'lunch', name: "Thai Peanut Tofu Rice Bowl", description: "Crispy pan-fried tofu tossed in a spicy peanut-lime sauce, served over jasmine rice with shredded cabbage, carrots, edamame, and fresh cilantro.", calories: 480, protein: 24, carbs: 54, fat: 20, prepTime: "25 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
    { type: 'lunch', name: "Rajma Chawal (Kidney Bean Curry)", description: "North Indian kidney bean curry simmered with tomatoes, onions, ginger-garlic paste, and aromatic spices. Served with steamed basmati rice.", calories: 460, protein: 18, carbs: 68, fat: 12, prepTime: "35 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    { type: 'lunch', name: "Black Bean & Roasted Corn Burrito Bowl", description: "Seasoned black beans with charred corn, pico de gallo, guacamole, cilantro-lime brown rice, and a squeeze of fresh lime.", calories: 490, protein: 20, carbs: 66, fat: 16, prepTime: "20 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },

    // --- Vegetarian Lunches ---
    { type: 'lunch', name: "Paneer Tikka Masala with Jeera Rice", description: "Cubes of tandoori-marinated paneer simmered in a rich tomato-cream gravy with kasoori methi. Served with fragrant jeera rice.", calories: 520, protein: 24, carbs: 50, fat: 26, prepTime: "30 min", tags: ['vegetarian', 'gluten-free', 'high-protein'] },
    { type: 'lunch', name: "Caprese Quinoa Salad", description: "Tri-color quinoa tossed with fresh mozzarella, heirloom cherry tomatoes, basil pesto, balsamic glaze, and toasted pine nuts.", calories: 440, protein: 20, carbs: 42, fat: 22, prepTime: "15 min", tags: ['vegetarian', 'gluten-free', 'high-protein'] },
    { type: 'lunch', name: "Mushroom & Cheese Quesadilla", description: "Whole-wheat tortillas filled with sauteed portobello mushrooms, caramelized onions, roasted garlic, and melted Monterey Jack cheese. Served with guacamole.", calories: 480, protein: 18, carbs: 44, fat: 26, prepTime: "15 min", tags: ['vegetarian'] },
    { type: 'lunch', name: "Palak Paneer with Roti", description: "Fresh spinach puree with soft paneer cubes, garlic, and aromatic spices. Served with two whole-wheat rotis.", calories: 460, protein: 22, carbs: 40, fat: 24, prepTime: "25 min", tags: ['vegetarian', 'high-protein'] },

    // --- Keto Lunches ---
    { type: 'lunch', name: "Keto Cauliflower Fried Rice", description: "Riced cauliflower stir-fried with scrambled eggs, sesame oil, soy sauce, diced vegetables, and a touch of sriracha.", calories: 320, protein: 16, carbs: 10, fat: 24, prepTime: "15 min", tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free'] },
    { type: 'lunch', name: "Zucchini Noodle Bolognese", description: "Spiralized zucchini noodles topped with a slow-simmered meat sauce made from lean ground beef, San Marzano tomatoes, and Italian herbs.", calories: 380, protein: 30, carbs: 12, fat: 24, prepTime: "25 min", tags: ['non-veg', 'keto', 'low-carb', 'gluten-free', 'dairy-free', 'high-protein'] },
    { type: 'lunch', name: "Avocado Stuffed with Egg Salad", description: "Ripe avocado halves filled with a creamy egg salad made from boiled eggs, Dijon mustard, chives, and a touch of mayo.", calories: 380, protein: 18, carbs: 8, fat: 32, prepTime: "15 min", tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free', 'high-protein'] },

    // --- Non-Veg Lunches ---
    { type: 'lunch', name: "Grilled Chicken Caesar Salad", description: "Herb-marinated grilled chicken breast over crisp romaine lettuce with shaved Parmesan, garlic croutons, and classic Caesar dressing.", calories: 450, protein: 38, carbs: 18, fat: 26, prepTime: "20 min", tags: ['non-veg', 'high-protein'] },
    { type: 'lunch', name: "Chicken Tikka Rice Bowl", description: "Tandoori-spiced chicken tikka over saffron basmati rice with raita, pickled onions, mint chutney, and a squeeze of lemon.", calories: 520, protein: 36, carbs: 52, fat: 18, prepTime: "30 min", tags: ['non-veg', 'gluten-free', 'high-protein'] },
    { type: 'lunch', name: "Teriyaki Salmon & Edamame Bowl", description: "Pan-seared salmon glazed with homemade teriyaki sauce, served over sticky rice with steamed edamame, pickled ginger, and sesame seeds.", calories: 540, protein: 34, carbs: 48, fat: 22, prepTime: "25 min", tags: ['non-veg', 'dairy-free', 'high-protein'] },
    { type: 'lunch', name: "Lamb Seekh Kebab Plate", description: "Juicy lamb seekh kebabs grilled over charcoal, served with mint raita, laccha onion, green chutney, and warm naan.", calories: 560, protein: 32, carbs: 38, fat: 30, prepTime: "30 min", tags: ['non-veg', 'high-protein'] },

    // --- Gluten-Free / Dairy-Free Lunches ---
    { type: 'lunch', name: "Vietnamese Rice Paper Rolls", description: "Fresh rice paper rolls filled with vermicelli noodles, julienned vegetables, fresh herbs, and a tangy peanut-hoisin dipping sauce.", calories: 340, protein: 10, carbs: 52, fat: 10, prepTime: "20 min", tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
    { type: 'lunch', name: "Chole (Chickpea Curry) with Brown Rice", description: "Spicy Punjabi-style chickpea curry cooked with whole spices, onion-tomato masala, and amchoor. Served with nutty brown rice.", calories: 470, protein: 18, carbs: 66, fat: 14, prepTime: "30 min", tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },

    // ===================== DINNER =====================

    // --- Vegan Dinners ---
    { type: 'dinner', name: "Mushroom & Lentil Shepherd's Pie", description: "A hearty pie with a filling of braised lentils, mushrooms, peas, and carrots, topped with creamy mashed sweet potatoes and baked until golden.", calories: 480, protein: 20, carbs: 62, fat: 16, prepTime: "45 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
    { type: 'dinner', name: "Thai Green Curry with Tofu & Vegetables", description: "Silky tofu and seasonal vegetables simmered in a fragrant coconut-based green curry with Thai basil, lemongrass, and kaffir lime leaves. Served over jasmine rice.", calories: 460, protein: 18, carbs: 50, fat: 22, prepTime: "30 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    { type: 'dinner', name: "Stuffed Bell Peppers with Quinoa & Black Beans", description: "Roasted bell peppers stuffed with a savory mix of quinoa, black beans, corn, diced tomatoes, cumin, and smoked paprika. Topped with fresh avocado salsa.", calories: 420, protein: 18, carbs: 56, fat: 14, prepTime: "35 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
    { type: 'dinner', name: "Dal Makhani (Vegan Version)", description: "Slow-cooked black lentils and kidney beans in a rich, smoky tomato gravy made with cashew cream instead of butter. Served with steamed basmati rice.", calories: 440, protein: 20, carbs: 58, fat: 14, prepTime: "60 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },

    // --- Vegetarian Dinners ---
    { type: 'dinner', name: "Eggplant Parmesan with Arrabbiata Sauce", description: "Layers of breaded and baked eggplant slices with melted mozzarella, fresh basil, and a spicy arrabbiata tomato sauce. Served with garlic bread.", calories: 520, protein: 20, carbs: 48, fat: 28, prepTime: "40 min", tags: ['vegetarian'] },
    { type: 'dinner', name: "Paneer Butter Masala with Garlic Naan", description: "Soft paneer cubes in a luxurious tomato-butter-cashew gravy with kasoori methi, served with two freshly baked garlic naans.", calories: 580, protein: 24, carbs: 52, fat: 30, prepTime: "30 min", tags: ['vegetarian', 'high-protein'] },
    { type: 'dinner', name: "Vegetable Biryani", description: "Fragrant basmati rice layered with spiced mixed vegetables, caramelized onions, saffron milk, and fresh mint. Served with cucumber raita.", calories: 480, protein: 14, carbs: 68, fat: 16, prepTime: "45 min", tags: ['vegetarian', 'gluten-free'] },
    { type: 'dinner', name: "Cauliflower Crust Margherita Pizza", description: "A crispy cauliflower-almond flour crust topped with San Marzano tomato sauce, fresh mozzarella, basil leaves, and a drizzle of extra virgin olive oil.", calories: 400, protein: 22, carbs: 14, fat: 28, prepTime: "30 min", tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free', 'high-protein'] },

    // --- Keto Dinners ---
    { type: 'dinner', name: "Keto Paneer Tikka with Cauliflower Mash", description: "Chargrilled paneer tikka marinated in hung curd and spices, served with buttery cauliflower mash and a side of mint chutney.", calories: 440, protein: 28, carbs: 10, fat: 34, prepTime: "25 min", tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free', 'high-protein'] },
    { type: 'dinner', name: "Herb-Crusted Lamb Chops", description: "Tender lamb chops coated with a rosemary-thyme-garlic crust, pan-seared and served with roasted Brussels sprouts and a red wine reduction.", calories: 550, protein: 38, carbs: 8, fat: 40, prepTime: "30 min", tags: ['non-veg', 'keto', 'low-carb', 'gluten-free', 'dairy-free', 'high-protein'] },
    { type: 'dinner', name: "Butter Chicken Lettuce Wraps", description: "Classic butter chicken served in crisp lettuce cups instead of naan. Rich, creamy tomato gravy with tender chicken pieces.", calories: 420, protein: 32, carbs: 8, fat: 30, prepTime: "25 min", tags: ['non-veg', 'keto', 'low-carb', 'gluten-free', 'high-protein'] },

    // --- Non-Veg Dinners ---
    { type: 'dinner', name: "Baked Salmon with Roasted Asparagus", description: "Wild-caught salmon fillet baked with lemon, dill, and garlic butter, served alongside roasted asparagus and a quinoa pilaf.", calories: 520, protein: 38, carbs: 28, fat: 26, prepTime: "25 min", tags: ['non-veg', 'high-protein', 'gluten-free'] },
    { type: 'dinner', name: "Chicken Stir-Fry with Brown Rice", description: "Tender chicken breast strips stir-fried with broccoli, snap peas, bell peppers, and cashews in a ginger-garlic-soy sauce. Served with brown rice.", calories: 480, protein: 34, carbs: 46, fat: 18, prepTime: "20 min", tags: ['non-veg', 'dairy-free', 'high-protein'] },
    { type: 'dinner', name: "Grilled Tandoori Chicken with Veggies", description: "Whole chicken legs marinated in yogurt-tandoori masala, chargrilled and served with grilled zucchini, onions, and a fresh green salad.", calories: 440, protein: 40, carbs: 12, fat: 26, prepTime: "30 min + marination", tags: ['non-veg', 'gluten-free', 'high-protein', 'low-carb'] },
    { type: 'dinner', name: "Lean Sirloin Steak with Sweet Potato", description: "A 180g grass-fed sirloin steak cooked medium-rare, served with a baked sweet potato, steamed broccoli, and a red wine jus.", calories: 580, protein: 42, carbs: 38, fat: 26, prepTime: "25 min", tags: ['non-veg', 'high-protein', 'gluten-free', 'dairy-free'] },

    // --- Gluten-Free / Dairy-Free Dinners ---
    { type: 'dinner', name: "Lentil & Vegetable Coconut Curry", description: "Red lentils and mixed vegetables simmered in a fragrant coconut milk curry with turmeric, cumin, and fresh ginger. Served with steamed basmati rice.", calories: 440, protein: 18, carbs: 56, fat: 16, prepTime: "30 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    { type: 'dinner', name: "Tofu & Broccoli Stir-Fry", description: "Crispy pressed tofu and broccoli florets sauteed in a savory garlic-ginger-tamari sauce with sesame seeds. Served over steamed brown rice.", calories: 400, protein: 22, carbs: 42, fat: 16, prepTime: "20 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },

    // ===================== SNACKS =====================

    // --- Vegan Snacks ---
    { type: 'snack', name: "Roasted Makhana (Fox Nuts)", description: "Crunchy roasted makhana lightly seasoned with Himalayan pink salt, turmeric, and a touch of chaat masala. High in antioxidants.", calories: 150, protein: 5, carbs: 18, fat: 6, prepTime: "10 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    { type: 'snack', name: "Hummus & Vegetable Crudités", description: "Creamy homemade hummus served with a platter of carrot sticks, cucumber, bell pepper strips, and cherry tomatoes.", calories: 180, protein: 7, carbs: 20, fat: 8, prepTime: "10 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    { type: 'snack', name: "Trail Mix (Nuts, Seeds & Dried Fruit)", description: "A custom blend of almonds, walnuts, pumpkin seeds, sunflower seeds, dried cranberries, and dark chocolate chips.", calories: 220, protein: 8, carbs: 20, fat: 14, prepTime: "2 min", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },

    // --- Vegetarian Snacks ---
    { type: 'snack', name: "Paneer & Vegetable Skewers", description: "Grilled skewers of paneer cubes, cherry tomatoes, bell peppers, and zucchini, brushed with a herb-garlic olive oil.", calories: 200, protein: 14, carbs: 8, fat: 14, prepTime: "15 min", tags: ['vegetarian', 'gluten-free', 'high-protein'] },
    { type: 'snack', name: "Greek Yogurt with Seeds", description: "A bowl of thick Greek yogurt topped with chia seeds, flaxseeds, pumpkin seeds, and a drizzle of honey.", calories: 190, protein: 14, carbs: 18, fat: 8, prepTime: "3 min", tags: ['vegetarian', 'gluten-free', 'high-protein'] },

    // --- Keto Snacks ---
    { type: 'snack', name: "Cheese & Almond Fat Bombs", description: "Cream cheese and almond butter rolled into bite-sized balls, coated with crushed almonds and a dusting of cocoa powder.", calories: 180, protein: 6, carbs: 3, fat: 16, prepTime: "10 min", tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free'] },
    { type: 'snack', name: "Cucumber Bites with Smoked Salmon", description: "Thick cucumber slices topped with herbed cream cheese and a curl of smoked salmon, garnished with fresh dill.", calories: 140, protein: 12, carbs: 4, fat: 8, prepTime: "8 min", tags: ['non-veg', 'keto', 'low-carb', 'gluten-free', 'high-protein'] },

    // --- Non-Veg Snacks ---
    { type: 'snack', name: "Chicken Tikka Bites", description: "Bite-sized pieces of yogurt-marinated chicken tikka, grilled until charred and served with mint chutney.", calories: 180, protein: 22, carbs: 4, fat: 8, prepTime: "20 min", tags: ['non-veg', 'gluten-free', 'high-protein', 'low-carb'] },
    { type: 'snack', name: "Boiled Eggs with Everything Seasoning", description: "Two perfectly boiled eggs halved and sprinkled with everything bagel seasoning and a pinch of flaky sea salt.", calories: 160, protein: 14, carbs: 1, fat: 10, prepTime: "12 min", tags: ['vegetarian', 'gluten-free', 'dairy-free', 'high-protein', 'low-carb', 'keto'] },
];
const mockCareProducts = {
    Male: {
        Oily: { skin: "a charcoal-based face wash, a light mattifying moisturizer, and a salicylic acid spot treatment.", hair: "a shampoo for oily scalp and consider using a sea salt spray for texture without weight.", },
        Dry: { skin: "a gentle, non-foaming cleanser, a hydrating moisturizer with SPF 30, and a weekly exfoliating scrub.", hair: "a moisturizing shampoo and a small amount of leave-in conditioner or beard oil.", },
    },
    Female: {
        Oily: { skin: "a gentle foaming cleanser, a lightweight oil-free moisturizer, and a clay mask to be used twice a week.", hair: "a clarifying shampoo to manage excess oil and a light conditioner for the ends.", },
        Dry: { skin: "a hydrating cream cleanser, a rich ceramide moisturizer, and a hyaluronic acid serum.", hair: "a sulfate-free moisturizing shampoo and a deep conditioning hair mask.", },
    },
    Other: {
        Oily: { skin: "a balanced gel cleanser and a non-comedogenic moisturizer.", hair: "a volume-boosting shampoo." },
        Dry: { skin: "a soap-free cleansing bar and a simple, effective hydrating lotion.", hair: "a co-wash or cleansing conditioner." },
    }
};
const mockProductSuggestions = {
    skin: {
        Male: { Oily: [{ name: "Nivea Men Oil Control Face Wash", price: "₹200-₹300", link: generateSearchLink('amazon', 'Nivea Men Oil Control Face Wash'), image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,c-fit/d/5/d55f9f74005900034455_1.jpg" }, { name: "The Man Company Oil Control Moisturizer", price: "₹350-₹450", link: generateSearchLink('myntra', 'The Man Company Oil Control Moisturizer'), image: "https://www.themancompany.com/cdn/shop/products/Oil-control-moisturising-cream-45g-_1400x.jpg?v=1676632483" }], Dry: [{ name: "Cetaphil Gentle Skin Cleanser", price: "₹300-₹500", link: generateSearchLink('flipkart', 'Cetaphil Gentle Skin Cleanser'), image: "https://www.cetaphil.in/sites/default/files/2022-07/Cetaphil_Gentle_Skin_Cleanser_1L_F_IN-Front.png" }, { name: "Beardo Ultraglow All in 1 Men's Face Lotion", price: "₹250-₹350", link: generateSearchLink('amazon', 'Beardo Ultraglow Lotion'), image: "https://beardo.in/cdn/shop/files/1_e9621539-773a-476c-8519-f705500d0577.jpg?v=1686650424" }], },
        Female: { Oily: [{ name: "Clean & Clear Foaming Face Wash", price: "₹150-₹250", link: generateSearchLink('flipkart', 'Clean & Clear Face Wash'), image: "https://m.media-amazon.com/images/I/51v5k2FXXEL.jpg" }, { name: "Plum Green Tea Mattifying Moisturizer", price: "₹400-₹500", link: generateSearchLink('myntra', 'Plum Green Tea Moisturizer'), image: "https://plumgoodness.com/cdn/shop/files/1_25e8d901-76f9-4672-9b2f-9812423c5e3d.jpg?v=1703233306" }], Dry: [{ name: "Simple Kind to Skin Refreshing Facial Wash", price: "₹300-₹400", link: generateSearchLink('amazon', 'Simple Facial Wash'), image: "https://www.simple.co.uk/cdn/shop/products/SimpleKindtoSkinRefreshingFacialWash150ml-UK_3dfe8430-b4eb-4753-9366-07e3240e1596_1024x1024.png?v=1681289196" }, { name: "Neutrogena Hydro Boost Water Gel", price: "₹800-₹1000", link: generateSearchLink('myntra', 'Neutrogena Hydro Boost'), image: "https://m.media-amazon.com/images/I/61Tj-iEXjlL._SL1500_.jpg" }], },
        Other: { Oily: [{ name: "Cosrx Salicylic Acid Daily Gentle Cleanser", price: "₹600-₹800", link: generateSearchLink('myntra', 'Cosrx Cleanser'), image: "https://m.media-amazon.com/images/I/51-g2y6YjIL.jpg" }], Dry: [{ name: "The Ordinary Hyaluronic Acid 2% + B5", price: "₹550-₹700", link: generateSearchLink('amazon', 'The Ordinary Hyaluronic Acid'), image: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw35032b85/images/products/theordinary/rdn-hyaluronic-acid-2-b5-30ml.png?sw=1200&sh=1200&sm=fit" }], }
    },
    hair: {
        Male: { Wavy: [{ name: "Beardo Hair Fall Control Shampoo", price: "₹300-₹400", link: generateSearchLink('myntra', 'Beardo Shampoo'), image: "https://beardo.in/cdn/shop/products/Beardohairfallcontrolshampoo200ml.jpg?v=1677134371" }], Straight: [{ name: "Ustraa Anti-Dandruff Shampoo", price: "₹400-₹500", link: generateSearchLink('amazon', 'Ustraa Shampoo'), image: "https://www.ustraa.com/cdn/shop/products/1_2484f275-c967-4632-9571-0b5c1f544520.jpg?v=1682570081" }], },
        Female: { Curly: [{ name: "Curl Up Curl Moisturising Shampoo", price: "₹500-₹600", link: generateSearchLink('myntra', 'Curl Up Shampoo'), image: "https://curlsup.com/cdn/shop/products/CURLMOISTURISINGSHAMPOO_1.jpg?v=1648017424" }, { name: "L'Oréal Paris Hyaluron Moisture Conditioner", price: "₹200-₹300", link: generateSearchLink('flipkart', 'LOreal Hyaluron Conditioner'), image: "https://www.lorealparis.co.in/-/media/project/loreal/brand-sites/oap/apac/in/products/hair-care/72h-hyaluron-moisture/loreal-paris-hyaluron-moisture-72h-moisture-filling-conditioner-180ml/ha-con-packshot-180.jpg" }], Coily: [{ name: "Minimalist Maleic Bond Repair Complex", price: "₹450-₹550", link: generateSearchLink('amazon', 'Minimalist Bond Repair'), image: "https://beminimalist.co/cdn/shop/products/MaleicBondRepairComplex05_Shampoo-01.jpg?v=1664448512" }], },
        Other: { Wavy: [{ name: "Tresemmé Keratin Smooth Shampoo", price: "₹500-₹700", link: generateSearchLink('flipkart', 'Tresemme Keratin Shampoo'), image: "https://www.tresemme.com/in/cdn/shop/files/New-Keratin-Smooth-Shampoo-735ml-Front.png?v=1693485081" }], }
    }
};
const mockWorkouts = {
    Male: { "Strength Training": { "Beginner": ["3x5 Squats", "3x5 Bench Press", "3x5 Barbell Rows", "Push-ups"], "Intermediate": ["5x5 Squats", "5x5 Bench Press", "1x5 Deadlifts", "3x8 Pull-ups"], }, "Cardio Endurance": { "Beginner": ["30 minutes of steady-state jogging", "3x1 min plank"], "Intermediate": ["5km run for time", "20 minutes of HIIT (sprints, burpees)"], }, },
    Female: { "Strength Training": { "Beginner": ["3x8 Goblet Squats", "3x10 Dumbbell Bench Press", "3x10 Glute Bridges", "Dumbbell Rows"], "Intermediate": ["3x8 Barbell Hip Thrusts", "3x8 Overhead Press", "Assisted Pull-ups", "Romanian Deadlifts"], }, "Cardio Endurance": { "Beginner": ["30-minute incline walk on treadmill", "15 minutes on elliptical"], "Intermediate": ["HIIT session with jump rope and bodyweight exercises", "45-minute spin class"], }, },
    Other: { "General Fitness": { "Beginner": ["Full-body circuit (squats, push-ups, planks, jumping jacks)", "20-minute yoga flow"], "Intermediate": ["Circuit training with weights", "30-minute rowing machine session"] }, "Flexibility": { "Beginner": ["Basic static stretching (hamstrings, quads, chest)", "15-minute yoga for beginners"], "Intermediate": ["Dynamic stretching routine", "30-minute Vinyasa flow yoga", "Foam rolling"], } }
};


// =================================================================
// UPGRADED SUGGESTION LOGIC WITH REAL-TIME DATA -> REVERTED TO MOCK
// =================================================================

const getAIOutfitSuggestions = (profile) => {
    const { gender = 'Other', preferredStyle = 'Casual', season = 'Summer' } = profile || {};
    const genderDb = mockClothingDatabase[gender] || mockClothingDatabase.Other;

    const outfitPieces = [
        getRandomItem(genderDb.tops),
        getRandomItem(genderDb.bottoms),
        getRandomItem(genderDb.shoes),
    ];

    return {
        outfits: [{
            name: `${preferredStyle} ${season} Look`,
            description: `A curated ${preferredStyle.toLowerCase()} look for the ${season.toLowerCase()} season.`,
            pieces: outfitPieces,
        }],
        styleTip: "Mix and match textures and layers to create a dynamic look. A statement piece can elevate a simple outfit."
    };
};

const getAIAccessoriesSuggestions = (profile) => {
    const { gender = 'Other' } = profile || {};
    const genderDb = mockAccessoryDatabase[gender] || mockAccessoryDatabase.Other;

    // Shuffle the array to ensure different results each time
    const shuffled = [...genderDb].sort(() => 0.5 - Math.random());
    const selectedItems = shuffled.slice(0, 2);

    const finalItems = selectedItems.map(item => ({
        ...item,
        reason: item.reason || "Adds a finishing touch to your outfit."
    }));

    return {
        accessories: finalItems,
        styleTip: "Choose accessories that complement your outfit. Don't be afraid to mix metals."
    };
};

const getAIEyewearRecommendations = (profile) => {
    const { faceShape = 'Oval' } = profile || {};
    const faceShapeDb = mockEyewearDatabase[faceShape] || mockEyewearDatabase.Oval;

    return {
        eyewear: faceShapeDb.map(eyewear => ({ ...eyewear, reason: `This shape provides a flattering contrast to your ${faceShape.toLowerCase()} face shape.` })),
        styleTip: "The right pair of glasses can be a defining feature. Choose a frame that reflects your personality."
    };
};

const getAIProductSuggestions = (profile, productType) => {
    const { gender = 'Other', skinType = 'Oily', hairType = 'Wavy' } = profile || {};
    const typeData = mockProductSuggestions[productType];
    const genderData = typeData[gender] || typeData.Other;
    const specificTypeKey = productType === 'skin' ? skinType : hairType;
    const products = genderData[specificTypeKey] || Object.values(genderData)[0];

    return { products };
};

// =================================================================
// STRICT MEAL COMPLIANCE VALIDATION
// Double-checks every meal in the final plan against the restriction
// =================================================================
const RESTRICTION_RULES = {
    'Vegetarian': { requiredTag: 'vegetarian', forbiddenTag: 'non-veg', label: 'vegetarian' },
    'Vegan':      { requiredTag: 'vegan',      forbiddenTag: 'non-veg', label: 'vegan' },
    'Keto':       { requiredTag: 'keto',        forbiddenTag: null,      label: 'keto' },
    'Gluten-Free':{ requiredTag: 'gluten-free', forbiddenTag: null,      label: 'gluten-free' },
    'Dairy-Free': { requiredTag: 'dairy-free',  forbiddenTag: null,      label: 'dairy-free' },
    'Non-Vegetarian': { requiredTag: null, forbiddenTag: null, label: 'non-vegetarian', excludeTags: ['vegetarian', 'vegan'] },
    'None':       { requiredTag: null,          forbiddenTag: null,      label: 'unrestricted' },
};

const validateMealCompliance = (meal, restriction) => {
    const rule = RESTRICTION_RULES[restriction];
    if (!rule) return true;
    if (rule.requiredTag && !meal.tags.includes(rule.requiredTag)) return false;
    if (rule.forbiddenTag && meal.tags.includes(rule.forbiddenTag)) return false;
    if (rule.excludeTags && rule.excludeTags.some(t => meal.tags.includes(t) && !meal.tags.includes('non-veg'))) return false;
    return true;
};

const getAIDietPlan = (profile) => {
    const { restrictions: rawRestrictions, goal: rawGoal, gender: rawGender } = profile || {};
    const restrictions = rawRestrictions || 'None';
    const goal = rawGoal || 'Balanced Diet';
    const gender = rawGender || 'individual';

    // Step 1: Filter meals strictly by dietary restriction and fitness goal
    const getFilteredMeals = () => {
        return mockMealDatabase.filter(meal => {
            // Strict restriction filtering
            if (!validateMealCompliance(meal, restrictions)) return false;

            // Goal-based filtering
            if (goal === 'Weight Loss' && meal.calories > 500) return false;
            if (goal === 'Muscle Gain' && !meal.tags.includes('high-protein')) return false;
            if (goal === 'Heart Health' && meal.fat > 25) return false;
            return true;
        });
    };

    const applicableMeals = getFilteredMeals();

    // Step 2: Select a meal for each type, with restriction-aware fallback
    const selectMeal = (mealType) => {
        const options = applicableMeals.filter(m => m.type === mealType);
        if (options.length > 0) return getRandomItem(options);

        // Fallback: relax the goal filter but NEVER relax the restriction
        const fallbackOptions = mockMealDatabase.filter(m => 
            m.type === mealType && validateMealCompliance(m, restrictions)
        );
        if (fallbackOptions.length > 0) return getRandomItem(fallbackOptions);

        // Last resort: return a clearly labeled "no match" rather than a wrong meal
        return {
            name: `No ${restrictions} ${mealType} available`,
            description: `We couldn't find a ${mealType} matching your "${restrictions}" restriction with "${goal}" goal. Try adjusting your preferences for more options.`,
            calories: 0, protein: 0, carbs: 0, fat: 0, prepTime: "N/A",
            tags: []
        };
    };

    const breakfast = selectMeal('breakfast');
    const lunch = selectMeal('lunch');
    const dinner = selectMeal('dinner');
    const snack = selectMeal('snack');

    // Step 3: Double-validate that every meal in the plan is compliant
    const meals = [breakfast, lunch, dinner, snack];
    meals.forEach((meal, i) => {
        if (meal.calories > 0 && !validateMealCompliance(meal, restrictions)) {
            console.error(`[COMPLIANCE VIOLATION] ${meal.name} does not comply with ${restrictions}. Replacing.`);
            const mealType = ['breakfast', 'lunch', 'dinner', 'snack'][i];
            const safeFallback = mockMealDatabase.filter(m =>
                m.type === mealType && validateMealCompliance(m, restrictions)
            );
            if (safeFallback.length > 0) {
                meals[i] = getRandomItem(safeFallback);
            }
        }
    });

    const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const totalProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);
    const totalCarbs = meals.reduce((sum, m) => sum + (m.carbs || 0), 0);
    const totalFat = meals.reduce((sum, m) => sum + (m.fat || 0), 0);

    const formatMeal = (meal) => ({
        title: meal.name,
        description: meal.description,
        calories: `${meal.calories} kcal`,
        protein: `${meal.protein || 0}g`,
        carbs: `${meal.carbs || 0}g`,
        fat: `${meal.fat || 0}g`,
        prepTime: meal.prepTime || 'N/A',
        tags: meal.tags || [],
    });

    const restrictionLabel = RESTRICTION_RULES[restrictions]?.label || restrictions;

    return {
        plan: {
            breakfast: formatMeal(meals[0]),
            lunch: formatMeal(meals[1]),
            dinner: formatMeal(meals[2]),
            snack: formatMeal(meals[3]),
        },
        dailyTotals: {
            calories: `${totalCalories} kcal`,
            protein: `${totalProtein}g`,
            carbs: `${totalCarbs}g`,
            fat: `${totalFat}g`,
        },
        nutritionTip: `This ${goal.toLowerCase()} plan (${restrictionLabel}) provides approximately ${totalCalories} kcal with ${totalProtein}g protein, ${totalCarbs}g carbs, and ${totalFat}g fat. Adjust portion sizes based on your activity level. Stay hydrated with 8-10 glasses of water daily!`
    };
};

const getAICareRoutine = (profile) => {
    const { gender: rawGender, skinType: rawSkinType, hairType: rawHairType } = profile || {};
    const gender = rawGender || 'Other';
    const skinType = rawSkinType || 'Dry';
    const hairType = rawHairType || 'Straight';

    const genderCare = mockCareProducts[gender] || mockCareProducts['Other'];
    const specificCare = genderCare[skinType] || genderCare['Dry'];
    return {
        skinRoutine: `For your ${skinType} skin, we recommend ${specificCare.skin}`,
        hairRoutine: `For your ${hairType} hair, we recommend ${specificCare.hair}`,
        careTip: `For a ${gender.toLowerCase()}-focused routine, consistency is key. Stick to your routine for at least a few weeks to see results, and always remember to wear sunscreen daily!`
    };
};

const getAIWorkoutPlan = (profile) => {
    const { gender: rawGender, goal: rawGoal, level: rawLevel } = profile || {};
    const gender = rawGender || 'Other';
    const goal = rawGoal || 'General Fitness';
    const level = rawLevel || 'Beginner';

    const genderWorkouts = mockWorkouts[gender] || mockWorkouts['Other'];
    const goalWorkouts = genderWorkouts[goal] || genderWorkouts["Strength Training"] || mockWorkouts['Other']['General Fitness'];
    const exercises = goalWorkouts[level] || goalWorkouts["Beginner"];
    return {
        planTitle: `${gender} ${level} ${goal} Plan`,
        weeklyFocus: `This plan is designed for a ${level} ${gender.toLowerCase()} individual to achieve their goal of ${goal} through targeted exercises.`,
        workoutSplit: [
            { day: 1, title: `${goal} Focus A`, exercises: exercises.slice(0, 3) },
            { day: 2, title: "Active Recovery", exercises: ["Light walking, stretching, or yoga"] },
            { day: 3, title: `${goal} Focus B`, exercises: exercises.slice(1, 4) }
        ],
        proTip: `For a ${gender.toLowerCase()} focusing on ${goal}, ensure you have proper form to prevent injury and maximize results. Consider a dynamic warm-up before each session.`
    };
};

module.exports = {
    getAIOutfitSuggestions,
    getAIEyewearRecommendations,
    getAIAccessoriesSuggestions,
    getAIProductSuggestions,
    getAIDietPlan,
    getAICareRoutine,
    getAIWorkoutPlan,
};
