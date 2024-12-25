'use server'
import {createLogMessage} from "@/lib/logger";
import {withErrorHandling} from "@/lib/request/withErrorHandling";
import {STP_SECRET_KEY} from "@/constants/stripe";
import { OpenAI } from 'openai';
import nlp from 'compromise';
import {extractCategoryKeywords} from "@/lib/utils";

// Create the OpenAIApi instance and pass the API key directly
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Make sure to use your API key from environment variable
});

// const products = [
// "    Amazon Basics AAA Alkaline High-Performance Batteries, 1.5 Volt, 10-Year Shelf Life, 36 count (Pack of 1)",
// "Rapid Relief Hot and Cold Therapy Slippers for Swollen and Painful Feet - Cooling Slippers for Neuropathy, Chemotherapy, and Diabetes Foot Pain Relief, Swollen Feet Remedy",
// "V-shine Acupressure Massage Slippers Therapeutic Reflexology Sandals for Foot Acupoint Massage Shiatsu Arch Pain Relief Non-Slip Massage Shoes for Bath Shower (Pink, 7.5-8)",
// "BYRIVER Acupressure Foot Massager Acupoint Stimulation Massage Slippers Shoes Reflexology Sandals Gift for Men Women, Reduce Feet Tension Promote Circulation, Father's Mother's Day Gift(02S)",
// "4 Pack Airtag Holder, Airtag case Waterproof Apple Air Tag Case with Keychain, Shockproof & Dustproof Airtag Holders for Pet Tracking, Bags, Kids, Keys, Luggage (4 Colors)",
// "Apple AirTag 4 Pack"
// ]

const products = [
    "Every Man Jack Amber + Sandalwood Men's Deodorant - Stay Fresh with Aluminum Free Deodorant For all Skin Types - Odor Crushing, Long Lasting, with Naturally Derived Ingredients - 3oz (2 Pack)",
    "Maxi Health - Relax to The Max Stress Relief Formula (60 Count) Capsules with Vitamin C, Calcium, L-Theanine, L-Taurine & Amino Acids - All Natural Calming & Relaxation Supplements",
    "LET'S RESIN UV Resin with Light,Upgraded 200g Crystal Clear&Low Odor UV Resin Kit,UV Light,Silicone Mat,Ultraviolet Epoxy Resin Hard,UV Resin Starter Kit for Jewelry,Craft Decor",
    // "HARDELL Mini Cordless Rotary Tool Kit, 5-Speed and USB Charging with 61 Accessories, Multi-Purpose 3.7V Power Rotary Tool for Sanding, Polishing, Drilling, Etching, Engraving, DIY Crafts",
    // "Good Laundry - Lavender Scented Booster Beads for Washer - Eco-Friendly Laundry Scent Booster Beads, 7oz - Based in the USA",
    // "Full Size Hot Glue Gun, 150 Watts with 6 Copper Nozzles Temperature Adjustable Craft Repair Tool Professional Melting Glue Gun DIY Thermo Tool Include 5Pcs Highly Viscous Glue Sticks Luxury Set",
    // "Wood Burning Kit, 110 Pieces Wood Burning Tool with Adjustable Temperature 200~420°C, Professional Wood Burner Pen for Embossing Carving Soldering",
    // "Dr Scholl's CLEAR AWAY PLANTAR WART REMOVER // 24 Discs/24 Cushions, Clinically Proven, Maximum Strength without a Prescription, Cushioning Pad Relieves Pain, 24 Treatments",
    // "Solgar Vitamin B1 (Thiamin) 500 mg, 100 Tablets - Energy Metabolism, Healthy Nervous System, Overall Well-Being - Super Potency - Non-GMO, Vegan, Gluten/Dairy Free - 100 Servings",
    // "GE Ultrabrite LED Light Bar Night Light, 100 Lumens, 1 Pack, Dusk-to-Dawn Sensor, Auto/On/Off Switch, Plug-in, Ideal for Dark Spaces, Bedroom, Bathroom, Kitchen, Hallway, Garage, White, 12498",
    // "Bamboo Cheese Board Set by Tretappi. Includes Large Charcuterie Board Set. Perfect House Warming Gift, Must-Have Kitchen Essentials or Serving Platter for Housewarming. Ideal Gift for New Home Owners.",
    // "Pure Encapsulations Magnesium (Glycinate) - Supplement to Support Stress Relief, Sleep, Heart Health, Nerves, Muscles, and Metabolism* - with Magnesium Glycinate - 90 Capsules",
    // "NOW Supplements, Probiotic-10TM, 25 Billion, with 10 Probiotic Strains, Dairy, Soy and Gluten Free, Strain Verified, 50 Veg Capsules",
    // "Coppertone SPORT Sunscreen Spray SPF 100, Water Resistant, Continuous Spray Sunscreen, Broad Spectrum SPF 100 Sunscreen, 5.5 Oz Spray",
    // "BUG BITE THING Suction Tool - Bug Bites and Bee/Wasp Stings, Natural Insect Bite Relief - White 2-Pack",
    // "Super Nail Pure Acetone, AS SHOWN 16 Fl Oz",
    // "CROOUTN Kids Little Boys Girls Cartoon Hooded Bathrobe Toddler Robe Pajamas Sleepwear ((4-5T),Pink Unicorn robe)",
    // "Amazon Basics 2-Ply Toilet Paper, 30 Rolls = 120 Regular Rolls, Unscented, 350 Sheet, (Pack of 30)",
    // "Amazon Brand - Presto! Flex-a-Size Paper Towels, 158 Sheet Huge Roll, 12 Rolls (2 Packs of 6), Equivalent to 38 Regular Rolls, White",
    // "Pull-Ups Girls' Potty Training Pants, Size 3T-4T Training Underwear (32-40 lbs), 112 Count (4 Packs of 28)",
    // "Tea Light Candles in Metal Cups - 4.5 Hours Clean, Long Burning White Unscented Tea Candles - 250 Candles - Votive Candles Bulk for Romantic Dinner, Wedding, Spa & Hotels by PARNOO",
    // "Brother Printer LC2033PKS Multi Pack Ink Cartridge, Cyan/Magenta/Yellow",
    // "Amazon Elements Baby Wipes, Unscented, Hypoallergenic, 810 Count, Flip-Top Packs, Pack of 9",
    // "Lion Nardo White Dress Shirts for Men Men's White Dress Shirt Long Sleeve White Button Down Shirt Men Button Up Shirts",
    // "ACT Made Simple: An Easy-to-Read Primer on Acceptance and Commitment Therapy (The New Harbinger Made Simple Series)",
    // "HealthA2Z Sleep Aid, Diphenhydramine Softgels, 50mg, Supports Deeper, Restful Sleeping, Non Habit-Forming (250 Counts)",
    // "FITLY Soft Flask - 5 oz (150 ml)- Shrink As You Drink Pocket Soft Water Bottle for Hydration Pack/Running Vest- Folding Water Bottle for Running, Hiking, Cycling - Ski Water Bottles (FLASK150)",
    // "Maxi Health Extra-Strength Mel-O-Chew 5 MG Kosher Chewable Melatonin, Berry Flavor (200 Count (Pack of 1))",
    // "ForPro Embossed Foil Sheets 900S, Aluminum Foil, Pop-Up Dispenser, for Hair Color Application and Highlighting, Food Safe, 9\" W x 10.75\" L, 500-Count",
    // "Don't Believe Everything You Think: Why Your Thinking Is The Beginning & End Of Suffering (Beyond Suffering)",
    // "Stop Overthinking: 23 Techniques to Relieve Stress, Stop Negative Spirals, Declutter Your Mind, and Focus on the Present (The Path to Calm)",
    // "LOL Surprise Tweens Fashion Doll Ellie Fly with 10+ Surprises and Fabulous Accessories - Great Gift for Kids Ages 4+",
    // "Proctor Silex Electric Tea Kettle, Water Boiler & Heater Auto-Shutoff & Boil-Dry Protection, 1000 Watts for Fast Boiling, 1 Liter, Black (K2071PS)",
    // "Amazon Basics Daily Pantiliner, Regular Length, Unscented, 50 Count, 1 Pack (Previously Solimo)",
    // "ED_Products Rolling Carts with Wheels, Versatile Kitchen Rolling Carts, Utility Rolling Organizer with Shelves for Office, Black 3 Tier Rolling Cart 360° (Black)",
    // "Go Healthy Multivitamin Gummies for Kids, Vegetarian Gummy Vitamins, Non-GMO, Gluten Free, Kosher & Halal - 30 Servings",
    // "Dr Scholl's Clear Away Plantar WART Remover // 24 Discs/24 Cushions, Clinically Proven, Maximum Strength Without a Prescription, Cushioning Pad Relieves Pain, 24 Treatments",
    // "Scotch Desktop Tape Dispenser, Black, 2.7 in. x 2.7 in. x 6.4 in., 1 Tape Dispenser",
    // "Native Whole Body Deodorant Spray Contains Naturally Derived Ingredients, Deodorant for Women & Men | 72 Hour Odor Protection, Aluminum Free with Coconut Oil and Shea Butter | Lilac & White Tea",
    // "Juna Chlorophyll Liquid Drops, 3X Potency Concentration - Detox, Debloat, Cleanse, Internal Deodorant, Energy & Immune Support - Antioxidant Supplement - Fresh Minty Lemon Taste",
    // "Get Your House Right: Architectural Elements to Use & Avoid",
    // "MEXAU 1Pcs Spring Tension Curtain Rod 26-39 inch Spring Tension Rods White Tension Rods Adjustable Spring Rod Extendable Tension Rod For Kitchen, Bathroom, Window, Bookshelf,Closet.",
    // "R-fun for AirPods 2nd Generation 2019,1st Gen 2016 Charging Case Cover, Full Drop Protection Auto Pop-Up Lid Design for Apple Airpods Case with Cleaner Kit & Keychain,White",
    // "Amlanpin Rolling Storage Cart 3-Tier Metal Mesh Basket Shelves Kitchen Organizer with Wheels(White)",
    // "TOOLF Foldable 3-Tier Storage Shelving Unit with Lockable Wheels, Space-Saving Organizer Rack for Home and Office, Freestanding Metal Rack, 1 Piece, White",
    // "NOW Supplements, Magnesium Citrate, Enzyme Function*, Nervous System Support*, 120 Veg Capsules",
    // "REGILLER 6 Wire Shelving Steel Storage Rack Adjustable Unit Shelves for Laundry Bathroom Kitchen Pantry Closet (Black, 16.8L x 11.7W x 63H)",
    // "1000 mg Vitamin C - 1000mg Tablets Ultra High Absorption Formula - Gluten Free Kosher Dietary Non GMO Vitamin C Supplement for Immune Support - VIT C Vitamin C Tablets from Ascorbic Acid, 100 Count",
    // "High Accuracy Professional Diamond Tester Pen Jeweler Tool for Novice and Expert - Diamond Selector II 9V Battery Included(Black)",
    // "Get Your House Right: Architectural Elements to Use & Avoid",
    // "The Architecture Reference & Specification Book updated & revised: Everything Architects Need to Know Every Day",
    // "Boudreaux's Butt Paste with Natural* Aloe Diaper Rash Cream, Ointment for Baby, 4 oz Tube, 2 Pack",
    // "Cascade Platinum Plus ActionPacs Dishwasher Detergent Pods, Mountain, 62 Count",
    // "Batiste Dry Shampoo Spray 4 Pack Variety Mix, Original Clean And Classic, and Tropical Fragrance, 2 Each 6.73 oz.",
    // "Life Extension Cardio Peak - Hawthorn Extract (Leaf, Flower, Stem) Supplement with Arjuna Extract for Heart Health Support - Twice Daily - Gluten Free, Non-GMO, Vegetarian - 120 Capsules",
    // "Good Laundry - Lavender Scented Booster Beads for Washer - Eco-Friendly Laundry Scent Booster Beads, 7oz - Based in the USA",
    // "Arm & Hammer Clean Burst, 170 Loads Liquid Laundry Detergent, 170 Fl oz",
    // "Noverlife 3PCS Barber Salon Face Shield, Plastic Hairdressing Haircut Face Mask, with Sponge Handle, Reusable Hairspray Face Shield, Clear Hair Spray Face Protector Shield Mask for Hairdressing Makeup",
    // "Pampers Swaddlers Diapers - Size 7, One Month Supply ,Ultra Soft Disposable Baby Diapers , 88 Count (Pack of 1)",
    // "Microblading Needles 60pcs S7,S12,U18 Assorted Permanent Makeup Manual Eyebrow Tattoo Needle Microblading Blades Microblading Kits",
    // "FoxyBae Revive Me Baby Non Aerosol Dry Shampoo 6oz",
    // "Amazon Elements Baby Wipes, Unscented, 810 Count, Flip-Top Packs, Pack of 9",
    // "Westmon Works Idaho Keychain Acrylic Souvenir Key Ring Chain Retro State Place Map Accessory",
    // "Vera Creation Women's Chunky Platform Loafers with Chain or Buckle Patent Leather Casual Business Work Shoes Comfort Slip-on (Black+Gold Chain 6.5)",
    // "NairSnow Collapsible Laundry Baskets, 2 Pack Mesh Pop Up Laundry Hampers with Handles, Portable Travel Laundry Basket, Dirty Clothes Hamper Light Breathable, Fold Compact, Large Hold, Green. 2H",
    // "Dr Scholl's Clear Away Plantar WART Remover // 24 Discs/24 Cushions, Clinically Proven, Maximum Strength Without a Prescription, Cushioning Pad Relieves Pain, 24 Treatments",
    // "VACRONA Cubic Zirconia Huggie Earrings 14k Gold Plated Tiny Earrings Small Huggie Hoop Earrings Simple Lightweight Hoops Gift for Women",
    // "HelloBaby Upgrade Monitor, 5''Sreen with 30-Hour Battery, Pan-Tilt-Zoom Video Baby Monitor with Camera and Audio, Night Vision, VOX, 2-Way Talk, 8 Lullabies and 1000ft Range No WiFi, Ideal Gifts",
    // "Kolcraft Cloud Plus Lightweight Easy Fold Compact Toddler Stroller and Baby Stroller for Travel, Large Storage Basket, Multi-Position Recline, Convenient One-hand Fold, 13 lbs - Slate Gray",
    // "FVION 2 in 1 Eye Lash Lift Tool - Stainless Steel Eyelash Separator Tool for Eyelash Eyebrow Perming Tinting, Metal Lash Lift Rods Tools for Curling Extensions, Precision Lash Comb - Silver",
    // "Yogasleep Dohm Classic (White) The Original White Noise Sound Machine, Soothing Natural Sounds from a Real Fan, Sleep Therapy for Adults & Baby, Noise Cancelling for Office Privacy & Meditation",
    // "AICOC Building Toys STEM Toys for Kids 260 Pieces Blocks Educational Discs Sets Interlocking Solid Plastic for Preschool Boys and Girls Aged 3+",
    // "Yetonamr Baby Sensory Montessori Toy for 6-12-18 Months, Pull String Silicone Teething Toy, Birthday Gift Travel Toy for 1 2 Year Old Boy Girl Infant Toddlers 8 9 10 Months Old",
    // "Toshiba Canvio Basics 1TB Portable External Hard Drive USB 3.0, Black - HDTB510XK3AA",
    // "Vanicream Moisturizing Skin Cream with Pump Dispenser - 16 fl oz (1 lb) - Moisturizer Formulated Without Common Irritants for Those with Sensitive Skin",
    // "Ceramic Soap Dispenser Green with Gold Pump,Simple Design Cylindrical Lotion Dispenser Bottle,Refillable Liquid Hand Soap Dispenser for Kitchen,Bathroom,Washroom",
    // "Amazon Elements Baby Wipes, Unscented, 810 Count, Flip-Top Packs, Pack of 9",
    // "Pampers Swaddlers Diapers - Size 7, One Month Supply, Ultra Soft Disposable Baby Diapers 88 Count, (Pack of 1)",
    // "[ 2 Mill Thick ] - Clear Plastic Tablecloth ROLL- W/ SELF Cutter -Wide Thick Disposable Table Cover Protects from Spills, Water, Oil, Stains.",
    // "Preparation H Hemorrhoid Cream with Aloe for Multi-Symptom Relief - 1.8 Oz Tube",
    // "Elite Gourmet ETO2530M Double French Door Countertop Toaster Oven, Bake, Broil, Toast, Keep Warm, Fits 12\" pizza, 25L capacity, Stainless Steel & Black",
    // "1000 mg Vitamin C - 1000mg Tablets Ultra High Absorption Formula - Gluten Free Kosher Dietary Non GMO Vitamin C Supplement for Immune Support - VIT C Vitamin C Tablets from Ascorbic Acid, 100 Count",
    // "Unicorn Kids Fidget Game Toys: Pop Quick Push Handheld Games for Kid Ages 6-8-12 Girls Easter Birthday Gifts Autism Sensory Toy for 5 6 7 8 9 Year Old Girl Toddler Gift",
    // "Colgate Optic White Advanced Hydrogen Peroxide Toothpaste, Teeth Whitening Toothpaste Pack, Enamel-Safe Formula, Helps Remove Tea, Coffee, and Wine Stains, Sparkling White, 3 Pack, 3.2 oz",
    // "NOW Supplements, L-Glutamine 500 mg, Nitrogen Transporter*, Amino Acid, 120 Veg Capsules",
    // "ZESICA Women's 2024 Long Sleeve Dress Crewneck Casual Loose Pleated Tiered Swing Maxi Dresses with Pockets,Dim,Large",
    // "TradMall 2 Pack Travel Umbrella Windproof 46 Inches Large Canopy Reinforced Fiberglass Ribs Auto Open & Close, Black",
    // "250 Pieces Braces Flossers Interdental Brush for Cleaner Tooth Toothpick Dental Teeth Flossing Head Oral Dental Hygiene Cleaning Tool Soft Dental Picks Refill Toothpick Cleaners (Bright Color)",
    // "MEROKEETY Women's 3/4 Balloon Sleeve Striped High Waist T Shirt Midi Dress with Pockets, KhakiYellow, Large",
    // "Mieazom Women's Long Sleeves Maxi Dress Casual Loose Tiered Flowy Swing Beach Long Dresses with Pockets Dark Green L",
    // "MITILLY Girls Floral Print 3/4 Sleeve Casual Pocket Ruffle Swing Long Maxi Dress with Belt 10 Years Navy",
    // "MEROKEETY Women's 3/4 Balloon Sleeve Striped High Waist T Shirt Midi Dress with Pockets, Black, X-Large",
    // "Umenlele Women's Casual Boho Puff 3/4 Sleeve Crewneck Flowy Loose A Line Tunic Maxi Dress Black Large",
    // "Mieazom Women's Long Sleeves Maxi Dress Casual Loose Tiered Flowy Swing Beach Long Dresses with Pockets Brown L",
    // "Jemis Women's Baggy Slouchy Beanie Chemo Cap for Cancer Patients (2 Pack Black & White)",
    // "EINSKEY Cotton Slouchy Beanie Hat for Men/Women, Lightweight Oversize Large Thin Skull Cap Chemo Cap Night Sleeping Cap",
    // "EINSKEY Cotton Slouchy Beanie Hat for Men/Women, Lightweight Oversize Large Thin Skull Cap Chemo Cap Night Sleeping Cap",
    // "Aisha's Design Printed High Quality Combed Cotton Instant Turban Head Wrap Scarf for Women Fashionable%95 Cotton Pre tied Headwear with Unique Handmade Rose Detail at the Back, Black - Pink"
]





const handler = async (request: Request) => {
    createLogMessage({
        messageType: 'testing',
        message: 'testing logger',
        request
    })
    /*TODO: replace with products from request
    *   const { products } = req.body;
    * */
    const prompt = `You are an assistant that categorizes product names into categories like 'Toys', 'Electronics', 'Hobby', etc.
Here is a list of product names:
${JSON.stringify(products.map(extractCategoryKeywords))}
Provide the result in valid JSON format (not as a string) as:
{
    "products": [
        {"name": "product_name", "category": "category"},
        ...
    ]
}
Ensure the response is valid JSON, not stringified JSON.`

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0,
        });

        const result = response;
        //res.status(200).json(JSON.parse(result));
        return Response.json({
            status: 'ok',
            result
        })
    } catch (error) {
        console.error(error);
        return Response.json({
            status: 'error',
            code: 500,
            error: 'Failed to process request'
        })
        //res.status(500).json({ error: 'Failed to process the request.' });
    }

    //return Response.json({products: products.map(extractCategoryKeywords)})
}

export const GET = withErrorHandling(handler)