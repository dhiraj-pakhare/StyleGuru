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


// Keep the detailed diet, care, and workout services from before as they are already robust.
// ... (Previous mockMealDatabase, mockCareProducts, mockProductSuggestions, mockWorkouts) ...
const mockMealDatabase = [
    { type: 'breakfast', name: "Tofu Scramble", description: "Protein-packed tofu scramble with spinach, turmeric, and black salt, served with whole-wheat toast.", calories: 350, tags: ['vegan', 'vegetarian', 'high-protein'] },
    { type: 'breakfast', name: "Greek Yogurt Parfait", description: "Layers of high-protein Greek yogurt, mixed berries, and a sprinkle of nuts for healthy fats.", calories: 300, tags: ['vegetarian', 'low-carb', 'gluten-free'] },
    { type: 'breakfast', name: "Muscle-Builder Oatmeal", description: "Rolled oats cooked with a scoop of whey or plant-based protein, topped with almonds and banana.", calories: 450, tags: ['vegetarian', 'high-protein'] },
    { type: 'breakfast', name: "Avocado Toast with Eggs", description: "Two slices of whole-grain toast with smashed avocado and two poached or fried eggs.", calories: 400, tags: ['vegetarian'] },
    { type: 'breakfast', name: "Keto Scrambled Eggs", description: "Creamy scrambled eggs with cheddar cheese and a side of avocado.", calories: 380, tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free'] },
    { type: 'breakfast', name: "Vegan Protein Smoothie", description: "A delicious smoothie with banana, spinach, almond milk, chia seeds, and vegan protein powder.", calories: 320, tags: ['vegan', 'vegetarian', 'gluten-free', 'high-protein'] },
    { type: 'breakfast', name: "High-Protein Chicken Sausage & Eggs", description: "Scrambled eggs with two chicken sausages for a high-protein start.", calories: 420, tags: ['non-veg', 'high-protein', 'low-carb', 'gluten-free'] },
    { type: 'lunch', name: "Grilled Chicken Salad", description: "Grilled chicken breast over mixed greens, with cherry tomatoes, cucumbers, and a light vinaigrette.", calories: 450, tags: ['non-veg', 'high-protein', 'low-carb', 'gluten-free'] },
    { type: 'lunch', name: "Hearty Chickpea Salad", description: "A refreshing salad with chickpeas, chopped vegetables, and a lemon-tahini dressing.", calories: 400, tags: ['vegan', 'vegetarian', 'gluten-free'] },
    { type: 'lunch', name: "Quinoa Power Bowl", description: "Quinoa with black beans, corn, avocado, and a sprinkle of feta cheese or vegan alternative.", calories: 500, tags: ['vegetarian', 'gluten-free', 'high-protein'] },
    { type: 'lunch', name: "Lean Turkey Wrap", description: "Sliced turkey breast with lettuce, tomato, and hummus in a whole-wheat wrap.", calories: 380, tags: ['non-veg'] },
    { type: 'lunch', name: "Keto Salmon Salad", description: "Flaked salmon mixed with mayonnaise and celery, served on lettuce cups.", calories: 420, tags: ['non-veg', 'keto', 'low-carb', 'gluten-free'] },
    { type: 'lunch', name: "Paneer Tikka Bowl", description: "Cubes of marinated paneer with sauteed peppers and onions over a bed of quinoa.", calories: 480, tags: ['vegetarian', 'high-protein', 'gluten-free'] },
    { type: 'dinner', name: "Baked Salmon & Asparagus", description: "A fillet of salmon baked with lemon and dill, served with roasted asparagus.", calories: 550, tags: ['non-veg', 'high-protein', 'low-carb', 'keto', 'gluten-free'] },
    { type: 'dinner', name: "Lentil and Vegetable Curry", description: "A rich and flavorful curry with lentils, potatoes, carrots, and peas, served with brown rice.", calories: 500, tags: ['vegan', 'vegetarian', 'gluten-free'] },
    { type: 'dinner', name: "Lean Steak & Veggies", description: "A 6oz sirloin steak with a side of steamed broccoli and a small baked sweet potato.", calories: 600, tags: ['non-veg', 'high-protein'] },
    { type: 'dinner', name: "Tofu and Broccoli Stir-Fry", description: "Crispy tofu and broccoli florets in a savory garlic-ginger sauce.", calories: 450, tags: ['vegan', 'vegetarian', 'high-protein'] },
    { type: 'dinner', name: "Cauliflower Crust Veggie Pizza", description: "A low-carb pizza with a cauliflower crust, topped with mozzarella and your favorite vegetables.", calories: 400, tags: ['vegetarian', 'keto', 'low-carb', 'gluten-free'] },
    { type: 'dinner', name: "Chicken and Veggie Skewers", description: "Skewers of chicken, bell peppers, onions, and zucchini, grilled to perfection.", calories: 480, tags: ['non-veg', 'high-protein', 'low-carb', 'gluten-free'] },
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
        eyewear: faceShapeDb.map(eyewear => ({...eyewear, reason: `This shape provides a flattering contrast to your ${faceShape.toLowerCase()} face shape.`})),
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

const getAIDietPlan = (profile) => {
    const { restrictions: rawRestrictions, goal: rawGoal, gender: rawGender } = profile || {};
    const restrictions = rawRestrictions || 'None';
    const goal = rawGoal || 'General Fitness';
    const gender = rawGender || 'individual';

    const getFilteredMeals = () => {
        return mockMealDatabase.filter(meal => {
            if (restrictions === 'Vegetarian' && !meal.tags.includes('vegetarian')) return false;
            if (restrictions === 'Vegan' && !meal.tags.includes('vegan')) return false;
            if (restrictions === 'Keto' && !meal.tags.includes('keto')) return false;
            if (restrictions === 'Gluten-Free' && !meal.tags.includes('gluten-free')) return false;
            if (restrictions === 'Non-Vegetarian' && (meal.tags.includes('vegetarian') || meal.tags.includes('vegan'))) return false;
            if (goal === 'Weight Loss' && meal.calories > 550) return false;
            if (goal === 'Muscle Gain' && !meal.tags.includes('high-protein')) return false;
            return true;
        });
    };
    const applicableMeals = getFilteredMeals();
    const selectMeal = (mealType) => {
        const options = applicableMeals.filter(m => m.type === mealType);
        if (options.length > 0) return getRandomItem(options);
        const fallbackOptions = mockMealDatabase.filter(m => m.type === mealType && !m.tags.includes('non-veg'));
        return getRandomItem(fallbackOptions) || { name: `No Suitable ${mealType}`, description: 'Please adjust your dietary preferences for more options.', calories: 0 };
    };
    const breakfast = selectMeal('breakfast');
    const lunch = selectMeal('lunch');
    const dinner = selectMeal('dinner');
    const totalCalories = breakfast.calories + lunch.calories + dinner.calories;
    return {
        plan: {
            breakfast: { title: breakfast.name, description: breakfast.description, calories: `${breakfast.calories} kcal` },
            lunch: { title: lunch.name, description: lunch.description, calories: `${lunch.calories} kcal` },
            dinner: { title: dinner.name, description: dinner.description, calories: `${dinner.calories} kcal` },
        },
        nutritionTip: `This ${goal.toLowerCase()} plan for a ${gender.toLowerCase()} is about ${totalCalories} kcal. Remember to adjust portion sizes based on your activity level and specific needs. Staying hydrated is key!`
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
