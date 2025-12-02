import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

export default function OtherHydroponicPlants() {
  return (
    <ScrollView style={styles.container}>
      
      {/* INTRO SECTION */}
      <Text style={styles.title}>Hydroponic Farming Advantages</Text>
      <Text style={styles.text}>
        Hydroponic farming offers a reliable alternative that delivers:
        {"\n\n"}• 365 days of fresh harvests vs. 1-2 seasonal harvests from traditional farms
        {"\n\n"}• 98% less water usage compared to conventional agriculture
        {"\n\n"}• 99% less land required for the same yield
        {"\n\n"}• 48 hours from farm to store vs. 7-14 days with traditional supply chains
        {"\n\n"}• Zero pesticides needed in controlled environments
      </Text>

      <Text style={styles.sectionTitle}>Hydroponic Leafy Greens: The Foundation of Fresh</Text>
      <Text style={styles.text}>
        Leafy greens are the superstars of hydroponic produce. They grow quickly, require minimal space,
        and offer consistent quality that customers will notice immediately.
      </Text>

      {/* ============================== */}
      {/* ARUGULA */}
      {/* ============================== */}
      <Image source={require('../assets/Arugula.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Arugula</Text>
      <Text style={styles.text}>
        Arugula is more than just a salad green; it's a nutritional dynamo packed with calcium, folate,
        and vitamins A, C, and K. Its peppery kick makes it a versatile choice for salads, wraps, and
        even as a pizza topping.
        {"\n\n"}Optimal Growing Conditions: Arugula thrives in a hydroponic system with a pH level of 6.0-6.5 and prefers moderate light conditions.
        {"\n\n"}Shelf Life: When stored properly, arugula can last up to 10 days in the refrigerator.
        {"\n\n"}Health Benefits: Beyond its rich nutrient profile, arugula also contains antioxidants that may help improve eye health and reduce inflammation.
      </Text>

      {/* ============================== */}
      {/* BUTTERHEAD */}
      {/* ============================== */}
      <Image source={require('../assets/Butterhead.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Butterhead Lettuce</Text>
      <Text style={styles.text}>
        Butterhead lettuce is a hydroponic favorite, known for its buttery texture and rich nutritional profile, including antioxidants like beta-carotene and lutein. It's an excellent choice for salads and lettuce wraps, making it a versatile option for retailers looking to diversify their produce section.
        {"\n\n"}Optimal Growing Conditions: Butterhead thrives in a hydroponic environment with a pH level of 6.0-6.5 and moderate light conditions.
        {"\n\n"}Shelf Life: Properly stored, butterhead lettuce can last up to 10-14 days in the refrigerator.
        {"\n\n"}Health Benefits: In addition to its antioxidant content, butterhead lettuce is also a good source of iron.
      </Text>

      {/* ============================== */}
      {/* COLLARD GREENS */}
      {/* ============================== */}
      <Image source={require('../assets/Collard Greens.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Collard Greens</Text>
      <Text style={styles.text}>
        Collard greens are rich in nutrients and cultural history. They're a favorite in soul food kitchens and are gaining popularity among diverse foodies. Packed with vitamins and minerals, collard greens are a less trendy but equally nutritious alternative to kale.
        {"\n\n"}Optimal Growing Conditions: Collard greens prefer a slightly acidic hydroponic environment with a pH of 6.0-7.0.
        {"\n\n"}Shelf Life: When stored properly, collard greens can last up to 10 days in the refrigerator.
        {"\n\n"}Health Benefits: Collard greens are rich in fiber and contain compounds that may help lower cholesterol.
      </Text>

      {/* ============================== */}
      {/* GREEN & RED OAK */}
      {/* ============================== */}
      <Image source={require('../assets/Green & Red Oak.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Green & Red Oak</Text>
      <Text style={styles.text}>
        Green and red oak lettuces are unique options that are easy on the digestive system. The red variety is particularly rich in antioxidants. These lettuces are perfect for those looking to offer something different, whether in salads or as a sandwich topping.
        {"\n\n"}Optimal Growing Conditions: These lettuces thrive in a hydroponic system with a pH level of 6.0-6.5 and moderate to high light conditions.
        {"\n\n"}Shelf Life: Green and red oak lettuces can last up to 7-10 days when stored properly in the refrigerator.
        {"\n\n"}Health Benefits: The red oak variety is particularly rich in antioxidants that may help combat oxidative stress.
      </Text>

      {/* ============================== */}
      {/* KALE */}
      {/* ============================== */}
      <Image source={require('../assets/Kale.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Kale</Text>
      <Text style={styles.text}>
        Kale has become a staple in health-conscious diets, known for its high levels of antioxidants, vitamins, and minerals. It's a versatile green that can be used in everything from salads and smoothies to cooked dishes and kale chips. Retailers, this is a must-have for your organic section.
        {"\n\n"}Optimal Growing Conditions: Kale thrives in a hydroponic system with a pH level of 5.5-6.5 and moderate to high light conditions.
        {"\n\n"}Shelf Life: Properly stored, kale can last up to 7-10 days in the refrigerator.
        {"\n\n"}Health Benefits: Kale is credited with lowering cholesterol and may even help ward off certain types of cancer.
      </Text>

      {/* ============================== */}
      {/* MUSTARD GREENS */}
      {/* ============================== */}
      <Image source={require('../assets/Mustard Greens.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Mustard Greens</Text>
      <Text style={styles.text}>
        Mustard greens offer a spicy kick and are a staple in southern cooking. They're fast-growing and packed with nutrients beneficial for eye and heart health. These greens are perfect for consumers looking for a leafy green with a bit of a bite.
        {"\n\n"}Optimal Growing Conditions: Mustard greens prefer a hydroponic environment with a pH of 6.0-7.0 and moderate light conditions.
        {"\n\n"}Shelf Life: When stored properly, mustard greens can last up to 5-7 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Mustard greens are rich in antioxidants and have immune-boosting properties.
      </Text>

      {/* ============================== */}
      {/* LETTUCE EXPANDED */}
      {/* ============================== */}
      <Image source={require('../assets/Lettuce.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Hydroponic Lettuce</Text>
      <Text style={styles.text}>
        Hydroponic lettuce is grown in nutrient-rich water instead of soil, resulting in clean, fresh,
        and flavorful greens.
      </Text>

      <Text style={styles.sectionTitle}>Optimal Growing Conditions</Text>
      <Text style={styles.text}>
        • pH 5.5–6.5 {"\n"}• Water temp below 74°F {"\n"}• 10–14 hours of light {"\n"}• High nitrogen nutrients
      </Text>

      <Text style={styles.sectionTitle}>Shelf Life</Text>
      <Text style={styles.text}>
        With roots: 2–4 weeks {"\n"}Without roots: 32–35°F storage{"\n"}Avoid ethylene exposure
      </Text>

      <Text style={styles.sectionTitle}>Culinary Pairings</Text>
      <Text style={styles.text}>
        • Wraps {"\n"}• Salads {"\n"}• Sandwiches {"\n"}• Grilled romaine
      </Text>

      <Text style={styles.sectionTitle}>Expanded Health Benefits</Text>
      <Text style={styles.text}>
        High in vitamins A, C, K and antioxidants, pesticide-free, low contamination risk.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
      <Text style={styles.text}>
        Soak 2”x2” foam cube for 20-30 minutes in water or with weak nutrient solution at pH 5.5-5.8 before seeding. Cover for darkness until germination.
      </Text>

      <Text style={styles.sectionTitle}>Transplant:</Text>
      <Text style={styles.text}>
        10-21 days after sowing when true leaves appear; transplant when roots are visible for 1-2 cm.
      </Text>

      <Text style={styles.sectionTitle}>Nutrient, Water Level, pH, and Temperature & Humidity:</Text>
      <Text style={styles.text}>
        Nutrient: 0.8-1.6 cm. Start low for seedlings (0.6-0.8), increase during growth to 1.2-1.6.{"\n"}
        Water Level: &gt;5 mg/L is desirable.{"\n"}
        pH: 5.6-6.0{"\n"}
        Temperature & Humidity: Air 18-24°C ideal; roots prefer 18-22°C. RH: 50-70%.{"\n\n"}
        Tips: Avoid high EC and warm root temperature as it causes tip burn. Frequent partial nutrient changes and daily pH checks.
    </Text>

    <Image source={require('../assets/Pechay.jpg')} style={styles.image} />
<Text style={styles.subTitle}>Hydroponic Pechay/Bok Choy</Text>

<Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Rockwool or coco cubes; keep moist; germination 3-7 days.
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  10-21 days. Transplant when several true leaves appear and roots are not too bound.
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrient: 1.2-2.0 cm (start lower for seedlings; increase during fast vegetative growth).{"\n\n"}
  Water Level: Keep roots in nutrient flow (NFT) or oxygenated solution (raft systems). Avoid stagnant water to prevent root rot.{"\n\n"}
  pH: 6.0-7.0 (tolerates slightly higher pH).{"\n\n"}
  Temperature & Humidity: Air 18-24°C ideal; tolerates up to 28°C. RH: 50-70%.
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Frequent harvest or cut-and-come-again keeps plants tender. Some growers raise pH slightly during rapid brassica growth.
</Text>


<Image source={require('../assets/Chives.jpg')} style={styles.image} />
<Text style={styles.subTitle}>Chives & Spring Onion</Text>

<Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Sow seeds in foam cubes or start from sets/cuttings; pre-soak seeds for faster germination.
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  7-14 days (transplant when 2-3 leaves form or when sets sprout roots).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrient: 1.0-1.8 cm{"\n\n"}
  Water Level: Keep roots moist and aerated; in raft systems, roots submerged in oxygenated solution.{"\n\n"}
  pH: 6.0-6.8{"\n\n"}
  Temperature & Humidity: 14-24°C ideal; tolerates wider range. RH: 50-70%.
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Regular cutting encourages regrowth. Monitor for tip yellowing (often from nutrient imbalance).
</Text>

<Image source={require('../assets/Eggplant.jpg')} style={styles.image} />
<Text style={styles.subTitle}>Hydroponic Eggplant & Peppers</Text>

<Text style={styles.sectionTitle}>Eggplant</Text>

<Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Sow in rockwool at 24-29°C; germination 5-14 days.
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  21-35 days (robust rootball and 4+ true leaves).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients: 2.5-3.5 cm typical during fruiting; seedlings lower. Maintain balanced NPK with emphasis on K during fruiting.{"\n\n"}
  Water Level: Consistent moisture with good oxygenation; substrate drip or DWC (Deep Water Culture) works.{"\n\n"}
  pH: 5.5-6.5{"\n\n"}
  Temperature & Humidity: Warm: 24-30°C day; nights not lower than 18°C; RH 40-60% ideal to reduce fungal disease.
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Use compact varieties for small systems. Provide support for heavy fruits and prevent root temps from overheating in PH climate.
</Text>

<Text style={styles.sectionTitle}>Peppers</Text>

<Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Rockwool or plug trays at 24-30°C; germinate 7-14 days.
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  21-35 days (wait until sturdy stems and true leaves).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients: 0.8-1.2 cm; vegetative: 1.4-2.2; fruiting 2.0-3.0 cm (hot peppers tolerate higher EC up to 3.5).{"\n\n"}
  Water Level: Even moisture and oxygenation; avoid sudden EC spikes.{"\n\n"}
  pH: 5.5-6.5 (6.0 is common){"\n\n"}
  Temperature & Humidity: Day: 22-28°C; nights 16-18°C; RH 50-70%. Hot climate tolerance is good but very high temps (32°C) reduce fruit set.
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Provide Calcium and consistent K during fruiting; hand-pollinate in enclosed systems; monitor for blossom drop at high temps.
</Text>

      {/* ============================== */}
      {/* RAINBOW CHARD */}
      {/* ============================== */}
      <Image source={require('../assets/Rainbow Chard.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Rainbow Chard</Text>
      <Text style={styles.text}>
        Rainbow chard is not just visually appealing; it's also packed with dietary fiber, vitamins, and minerals. Its colorful stems and leaves can be used in a variety of dishes, from stir-fries to soups, making it a versatile choice for any retailer.
        {"\n\n"}Optimal Growing Conditions: Rainbow chard thrives in a hydroponic system with a pH level of 6.0-7.0 and moderate to high light conditions.
        {"\n\n"}Shelf Life: Properly stored, rainbow chard can last up to 7-10 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: In addition to its rich nutrient profile, rainbow chard is also high in antioxidants.
      </Text>

      {/* ============================== */}
      {/* ROMAINE */}
      {/* ============================== */}
      <Image source={require('../assets/Romaine.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Romaine</Text>
      <Text style={styles.text}>
        Romaine lettuce is a hydroponic staple, easy to grow and packed with minerals like phosphorous, calcium, and potassium. It's a versatile green, perfect for salads, grilling, or as a garnish, making it a must-have for any retailer or restaurant.
        {"\n\n"}Optimal Growing Conditions: Romaine thrives in a hydroponic environment with a pH level of 6.0-7.0 and moderate light conditions.
        {"\n\n"}Shelf Life: When stored properly, romaine can last up to 10 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Romaine is a good source of fiber and contains various antioxidants.
      </Text>

      {/* ============================== */}
      {/* SPINACH */}
      {/* ============================== */}
      <Image source={require('../assets/Spinach.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Spinach</Text>
      <Text style={styles.text}>
        Spinach is a hydroponic favorite, rich in vitamins and minerals. It's a versatile green, used in everything from salads and pizzas to casseroles and smoothies. Retailers and health influencers alike will find this leafy green to be a popular choice year-round.
        {"\n\n"}Optimal Growing Conditions: Spinach prefers a hydroponic environment with a pH of 6.0-7.0 and moderate to high light conditions.
        {"\n\n"}Shelf Life: Properly stored, spinach can last up to 7-10 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Spinach is high in dietary fiber and has been shown to improve eye health.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
    <Text style={styles.text}>
        Rockwool or coco cubes; keep moist and warm (20-24°C) until germination.
    </Text>

    <Text style={styles.sectionTitle}>Transplant:</Text>
    <Text style={styles.text}>
     7-14 days (transplant at 2-3 true leaves).
    </Text>

    <Text style={styles.sectionTitle}>Nutrient, Water Level, pH, and Temperature & Humidity:</Text>
    <Text style={styles.text}>
   Nutrient: 0.8-1.6 cm. Start at lower EC for seedlings. Nitrogen rich for green growth.{"\n"}
    Water Level: {"\n"}
     - NFT: 2-3 mm, just enough to wet the roots continuously but not flood them.{"\n"}
    - Raft System: Keep the bottom of the cube just touching or slightly above the nutrient solution (about 0.5-1 inch gap between the water surface and the bottom).{"\n"}
    pH: 5.5-6.5{"\n"}
    Temperature & Humidity: Best 15-24°C; in hot months spinaches bolt (consider partial shading/fast harvest cycles for local summer). RH: 50-70%.{"\n\n"}
     Tips: Choose bolt-resistant cultivars if growing in warmer months or run a faster rotation.
    </Text>


      {/* ============================== */}
      {/* HERB SECTION */}
      {/* ============================== */}
      <Text style={styles.title}>BEST HYDROPONIC PLANTS: HERBS</Text>

      {/* BASIL */}
      <Image source={require('../assets/Basil.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Basil</Text>
      <Text style={styles.text}>
        From Thailand to Italy, basil is a popular choice in dishes the world over. Grind your leaves to make a pesto, toss a few in a tomato ragu, or use them to top an avocado toast. It’s almost impossible to go wrong with this versatile and delicious herb.
        {"\n\n"}Optimal Growing Conditions: Basil thrives in hydroponic systems with a pH level of 5.5-6.5 and moderate light conditions.
        {"\n\n"}Shelf Life: Properly stored, basil can last up to 7 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Basil is rich in antioxidants and has anti-inflammatory properties.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
      <Text style={styles.text}>
        Rockwool/foam cubes; keep warm (22-27°C) and moist; germinate 3-7 days.
      </Text>

      <Text style={styles.sectionTitle}>Transplant:</Text>
      <Text style={styles.text}>
        10-21 days (transplant at 2-4 true leaves).
      </Text>

      <Text style={styles.sectionTitle}>Nutrient, Water Level, pH, and Temperature & Humidity:</Text>
      <Text style={styles.text}>
        Nutrient: 1.0-1.6 cm (seedlings lower). Some studies show good growth up to 2.5 cm, depending on variety.{"\n"}
        Water Level: NFT or raft systems work well; keep good oxygenation and avoid cold root zones.{"\n"}
        pH: 5.5-6.5{"\n"}
        Temperature & Humidity: 20-30°C air temperature; RH 50-70%. Prefers warmer than lettuce.
      </Text>


      {/* CILANTRO */}
      <Image source={require('../assets/Cilantro.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Cilantro</Text>
      <Text style={styles.text}>
        Cilantro is one of those herbs that most people either love or hate — and there’s some evidence that the preference may even be genetic! Spice up salad dressings, incorporate it in your favorite rice dish, or use it to flavor nachos and other tailgating favorites. It’s always a good idea to have some cilantro on hand.
        {"\n\n"}Optimal Growing Conditions: Cilantro prefers a hydroponic environment with a pH of 6.0-6.5 and moderate light conditions.
        {"\n\n"}Shelf Life: When stored properly, cilantro can last up to 5-7 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Cilantro is rich in vitamins A and K and has been shown to help lower bad cholesterol levels.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
      <Text style={styles.text}>
        Soak seeds for 12-24 hours and sow in cubes; germination 7-14 days.
      </Text>
      
      <Text style={styles.sectionTitle}>Transplant:</Text>
      <Text style={styles.text}>
        14-21 days (transplant carefully).
      </Text>
      
      <Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
      <Text style={styles.text}>
        Nutrients: 1.0-1.8 cm{"\n"}
        Water Level: Adequate but not specified{"\n"}
        pH: 5.8-6.4{"\n"}
        Temperature & Humidity: Best 15-22°C; in the Philippines, heat increases bolt risk. Grow in cooler periods or under shade. RH moderate.
        </Text>

      <Text style={styles.sectionTitle}>Tips:</Text>
      <Text style={styles.text}>
        For hot climates, consider succession sowing or growing in cooler microclimates to avoid bolting.
      </Text>

      {/* FENNEL */}
      <Image source={require('../assets/Fennel.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Fennel</Text>
      <Text style={styles.text}>
        While it might not seem like much at first, add a little heat and this tasty herb becomes mild and sweet. It’s used in all sorts of traditional recipes from risotto to pasta salad to Thanksgiving stuffing. And it’s a favorite of modern and fusion cooks too!
        {"\n\n"}Optimal Growing Conditions: Fennel thrives in a hydroponic system with a pH level of 6.0-7.0 and moderate to high light conditions.
        {"\n\n"}Shelf Life: Properly stored, fennel can last up to 7-10 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Fennel is rich in dietary fiber and has anti-inflammatory properties.
      </Text>

      {/* LAVENDER */}
      <Image source={require('../assets/Lavender.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Lavender</Text>
      <Text style={styles.text}>
        avender is as lovely to look at as it is to taste or smell. This herb has long been used to help people relax or drift off to sleep. It’s a popular scent for perfumes and bath products. And it’s also a fun herb to play with in the kitchen! 
        {"\n\n"}Optimal Growing Conditions: Lavender prefers a hydroponic environment with a pH of 6.5-7.5 and high light conditions.
        {"\n\n"}Shelf Life: When stored properly, lavender can last up to 10-14 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Lavender is known for its calming effects and may help with anxiety and insomnia.
      </Text>

      {/* OREGANO */}
      <Image source={require('../assets/Oregano.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Oregano</Text>
      <Text style={styles.text}>
        From flavoring your favorite pasta dishes to topping warm fresh focaccia, oregano is a powerhouse herb that cooks adore. You’ll find it featured in dishes from Italy, Mexico, Greece, and Turkey — and it’s no wonder. The subtle and bright flavor is as versatile as it is delicious.
        {"\n\n"}Optimal Growing Conditions: Oregano thrives in a hydroponic system with a pH level of 6.0-7.0 and moderate to high light conditions.
        {"\n\n"}Shelf Life: Properly stored, oregano can last up to 7-10 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Oregano is rich in antioxidants and has antimicrobial properties.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Rockwool/coco; rosemary & oregano germinate slowly (can also start from cuttings).
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  14-28 days (longer for woody herbs like rosemary).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients, EC, & pH:{"\n"}
  • Thyme & Oregano: pH 6.0-7.0; EC 1.2-2.3 cm{"\n"}
  • Rosemary: pH 6.0-7.0; EC 1.0-1.8 cm; prefers drier root zone{"\n"}
  • Parsley: pH 5.5-6.5; EC 0.8-1.8 cm{"\n\n"}
  Water Level: Avoid water-clogged roots for thyme, oregano, & rosemary; slightly more air in the medium helps{"\n\n"}
  Temperature & Humidity:{"\n"}
  • Thyme, Oregano, & Rosemary: warmer, drier air (20-28°C){"\n"}
  • Parsley: moderate temps (18-24°C)
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Use cuttings for rosemary and oregano for faster, more reliable starts. Do not overfeed woody herbs; they prefer leaner nutrition than leafy greens.
</Text>


      {/* PEPPERMINT */}
      <Image source={require('../assets/Peppermint.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Peppermint</Text>
      <Text style={styles.text}>
        Peppermint is an excellent herb to stock year-round with a wintery flavor and a taste that reminds many of the holidays. In addition to its popular uses in teas, candies, and baked goods, this little green leaf is also a popular choice for aromatherapy and folk medicine.
        {"\n\n"}Optimal Growing Conditions: Peppermint prefers a hydroponic environment with a pH of 6.0-7.0 and moderate light conditions.
        {"\n\n"}Shelf Life: When stored properly, peppermint can last up to 7-10 days in the refrigerator.
        {"\n\n"}Environmental Impact: Like other hydroponic herbs, peppermint requires less water and is often pesticide-free.
        {"\n\n"}Expanded Health Benefits: Peppermint is known for its digestive benefits and is often used in herbal remedies for nausea.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Start from cuttings (for faster growth) or seeds in cubes.
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  7-14 days (rooted cuttings can be transplanted earlier).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients: {"\n"}
  Water Level: {"\n"}
  pH: {"\n"}
  Temperature & Humidity: 18-24°C ideal; tolerates warmer temperatures. RH: 50-70%.
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Control spread to prevent clogging. Harvest leaves often to keep flavor strong.
</Text>


      {/* ROSEMARY */}
      <Image source={require('../assets/Rosemary.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Rosemary</Text>
      <Text style={styles.text}>
        For many, you simply can’t roast a chicken without a few sprigs of fresh rosemary. But its use doesn’t end there. This herb originated in the Mediterranean and is common in various cuisines from that part of the world. It’s also a popular choice for soaps and perfumes.
        {"\n\n"}Optimal Growing Conditions: Rosemary thrives in a hydroponic system with a pH level of 6.0-7.0 and high light conditions.
        {"\n\n"}Shelf Life: Properly stored, rosemary can last up to 14 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Rosemary is rich in antioxidants and has been shown to improve memory and concentration.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Rockwool/coco; rosemary & oregano germinate slowly (can also start from cuttings).
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  14-28 days (longer for woody herbs like rosemary).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients, EC, & pH:{"\n"}
  • Thyme & Oregano: pH 6.0-7.0; EC 1.2-2.3 cm{"\n"}
  • Rosemary: pH 6.0-7.0; EC 1.0-1.8 cm; prefers drier root zone{"\n"}
  • Parsley: pH 5.5-6.5; EC 0.8-1.8 cm{"\n\n"}
  Water Level: Avoid water-clogged roots for thyme, oregano, & rosemary; slightly more air in the medium helps{"\n\n"}
  Temperature & Humidity:{"\n"}
  • Thyme, Oregano, & Rosemary: warmer, drier air (20-28°C){"\n"}
  • Parsley: moderate temps (18-24°C)
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Use cuttings for rosemary and oregano for faster, more reliable starts. Do not overfeed woody herbs; they prefer leaner nutrition than leafy greens.
</Text>


      {/* THYME */}
      <Image source={require('../assets/Thyme.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Thyme</Text>
      <Text style={styles.text}>
        Thyme is a favorite for flavoring meats, soups, and stews, but can be equally effective in vegetarian dishes and sides. The miniature leaves are particularly popular in dishes containing tomatoes, potatoes, or eggs.
        {"\n\n"}Optimal Growing Conditions: Thyme prefers a hydroponic environment with a pH of 5.5-7.0 and moderate to high light conditions.
        {"\n\n"}Shelf Life: When stored properly, thyme can last up to 10-14 days in the refrigerator.
        {"\n\n"}Expanded Health Benefits: Thyme is rich in vitamins C and A and has antimicrobial properties.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Rockwool/coco; rosemary & oregano germinate slowly (can also start from cuttings).
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  14-28 days (longer for woody herbs like rosemary).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients, EC, & pH:{"\n"}
  • Thyme & Oregano: pH 6.0-7.0; EC 1.2-2.3 cm{"\n"}
  • Rosemary: pH 6.0-7.0; EC 1.0-1.8 cm; prefers drier root zone{"\n"}
  • Parsley: pH 5.5-6.5; EC 0.8-1.8 cm{"\n\n"}
  Water Level: Avoid water-clogged roots for thyme, oregano, & rosemary; slightly more air in the medium helps{"\n\n"}
  Temperature & Humidity:{"\n"}
  • Thyme, Oregano, & Rosemary: warmer, drier air (20-28°C){"\n"}
  • Parsley: moderate temps (18-24°C)
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Use cuttings for rosemary and oregano for faster, more reliable starts. Do not overfeed woody herbs; they prefer leaner nutrition than leafy greens.
</Text>


      {/* ============================== */}
      {/* FRUITING & INNOVATIVE */}
      {/* ============================== */}
      <Text style={styles.title}>BEST HYDROPONIC PLANTS: FRUITING & INNOVATIVE</Text>

      {/* CELERY */}
      <Image source={require('../assets/Celery.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Celery</Text>
      <Text style={styles.text}>
        These long crunchy stalks are an excellent and nutritious after-school snack, but also a favorite paired with buffalo wings and blue cheese. Cook them with a roast, use them to flavor a casserole, or puree them into a silky smooth soup.
        {"\n\n"}Optimal Growing Conditions: Prefers a pH level of 6.0-7.0 and moderate light conditions.
        {"\n\n"}Culinary Pairings: Excellent with buffalo wings, in soups, or as a crunchy snack.
        {"\n\n"}Expanded Health Benefits: Rich in antioxidants and provides a good source of dietary fiber.
      </Text>

      {/* CUCUMBERS */}
      <Image source={require('../assets/Cucumbers.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Cucumbers</Text>
      <Text style={styles.text}>
        Not just for pickling anymore, cucumbers are a delicious way to cool down on a hot day. Tossed in a salad or sliced in a simple glass of cucumber water, the fresh taste of this vine-grown garden favorite is an excellent addition to nearly any meal.
        {"\n\n"}Optimal Growing Conditions: Thrives in a pH level of 5.5-6.0 and high light conditions.
        {"\n\n"}Culinary Pairings: Perfect in salads, sandwiches, or infused water.
        {"\n\n"}Expanded Health Benefits: High in vitamins K and C and promotes hydration.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Pre-soak seeds 12-24 hours, sow in cubes; germinate 3-7 days at 20-25°C.
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  10-21 days (transplant when true leaves and roots are evident).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients: 1.5-2.5 cm early; increase to 2.0-3.5 cm during fruiting (keep EC appropriate for variety).{"\n\n"}
  Water Level: Maintain adequate moisture but ensure roots are well-oxygenated.{"\n\n"}
  pH: 5.8-6.4{"\n\n"}
  Temperature & Humidity:{"\n"}
  • Air: 22-28°C daytime{"\n"}
  • Root zone: 20-23°C{"\n"}
  • Humidity: 60-70% (watch for disease at high RH)
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Train vines vertically, remove lateral shoots as needed, provide consistent water to avoid bitter fruit.
</Text>


      {/* PEPPERS */}
      <Image source={require('../assets/Peppers.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Peppers</Text>
      <Text style={styles.text}>
        Surprisingly to some, peppers are actually a fruit. Part of the nightshade family, they come in an enormous variety of shapes and sizes, with flavors ranging from sweet and mild to burn your tastebuds off hot. 
        {"\n\n"}Optimal Growing Conditions: Prefers a pH level of 6.0-6.5 and high light conditions.
        {"\n\n"}Expanded Health Benefits: Rich in vitamins A and C, and capsaicin, which has anti-inflammatory properties.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Rockwool or plug trays at 24-30°C; germinate 7-14 days.
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  21-35 days (wait until sturdy stems and true leaves).
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients: 0.8-1.2 cm for seedlings; vegetative 1.4-2.2 cm; fruiting 2.0-3.0 cm (hot peppers tolerate higher EC up to 3.5).{"\n\n"}
  Water Level: Maintain even moisture and oxygenation; avoid sudden EC spikes.{"\n\n"}
  pH: 5.5-6.5 (6.0 is common).{"\n\n"}
  Temperature & Humidity:{"\n"}
  • Day: 22-28°C{"\n"}
  • Night: 16-18°C{"\n"}
  • RH: 50-70% (very high temps 32°C reduce fruit set)
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Provide calcium and consistent potassium during fruiting; hand-pollinate in enclosed systems; monitor for blossom drop at high temperatures.
</Text>


      {/* SNAP PEAS */}
      <Image source={require('../assets/Snap Peas.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Snap Peas</Text>
      <Text style={styles.text}>
        Snap peas are a delicious vegetable with an edible hull. Sometimes called sugar snap peas, these greens are delicious when paired with nearly any flavor. They offer plenty of nutritional benefits and can be eaten steamed, cooked, or even raw. 
        {"\n\n"}Optimal Growing Conditions: Thrives in a pH level of 6.0-7.0 and moderate to high light conditions.
        {"\n\n"}Expanded Health Benefits: High in fiber and vitamin C.
      </Text>

      {/* STRAWBERRIES */}
      <Image source={require('../assets/Strawberries.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Strawberries</Text>
      <Text style={styles.text}>
        A favorite berry for many, strawberries are a sweet taste of summer. But they don’t have to be. When you grow the plants indoors, they’re ripe for the harvest at any time of year. Enjoy a strawberry and spinach salad in January, or make chocolate-covered strawberries for your sweetheart on Valentine’s Day. The possibilities are endless when you’re not confined to a single harvest season.
        {"\n\n"}Optimal Growing Conditions: Prefers a pH level of 5.8-6.2 and high light conditions.
        {"\n\n"}OExpanded Health Benefits: Rich in antioxidants and vitamin C.
      </Text>

      {/* TOMATOES */}
      <Image source={require('../assets/Tomatoes.jpg')} style={styles.image}/>
      <Text style={styles.subTitle}>Tomatoes</Text>
      <Text style={styles.text}>
        Tomatoes are a favorite savory fruit for home gardeners because they’re easy to grow and offer a huge variety of uses. Eat them fresh, cook them into your favorite recipes, or turn them into a delicious sauce and can them for later use.
        {"\n\n"}Optimal Growing Conditions: Thrives in a pH level of 6.0-6.5 and high light conditions.
        {"\n\n"}Expanded Health Benefits: High in lycopene, an antioxidant that may reduce the risk of certain cancers.
      </Text>

      <Text style={styles.sectionTitle}>Seedling & Germination:</Text>
<Text style={styles.text}>
  Rockwool cubes are recommended; pre-soak cube, sow 1 seed. Germination 5-10 days at 22-28°C.
</Text>

<Text style={styles.sectionTitle}>Transplant:</Text>
<Text style={styles.text}>
  18-30 days. Transplant after 2-4 true leaves, with sturdy roots.
</Text>

<Text style={styles.sectionTitle}>Nutrients, Water Level, pH, Temperature & Humidity:</Text>
<Text style={styles.text}>
  Nutrients: Stage dependent.{"\n"}
  • Seedling: 0.8-1.2 cm{"\n"}
  • Vegetative: 1.2-2.5 cm{"\n"}
  • Flowering/Fruiting: 2.5-3.5 cm (monitor and increase as plant matures){"\n\n"}
  Water Level: Keep roots moist but oxygenated; substrate-grown with drip feed or NFT must be heavily oxygenated. EC fluctuations should be managed carefully.{"\n\n"}
  pH: 6.0-6.5 (slightly higher than leafy greens).{"\n\n"}
  Temperature & Humidity:{"\n"}
  • Air: Day 22-28°C, Night 20-25°C (fruit set optimal at night){"\n"}
  • RH: 60-70%; reduce high RH during flowering to prevent disease{"\n"}
  • Root Temp: 18-22°C
</Text>

<Text style={styles.sectionTitle}>Tips:</Text>
<Text style={styles.text}>
  Provide strong lighting, trellising, pruning, calcium for blossom-end rot prevention. Pollinate flowers manually if indoors. Monitor EC/pH daily.
</Text>


      {/* ============================== */}
      {/* BENEFITS FULL DETAIL */}
      {/* ============================== */}
      <Text style={styles.title}>BENEFITS OF HYDROPONICALLY GROWN PRODUCT</Text>
      <Text style={styles.text}>
        In today's competitive market, standing out is more important than ever. As a retailer, you're not just selling produce; you're selling an experience and a set of values. Hydroponically grown plants offer a unique selling point that can set your store apart from the rest. Here's why:

        {"\n\n"}Year-Round Availability: Unlike traditional farming, hydroponic systems allow for year-round cultivation. This means you can offer fresh, local produce to your customers no matter the season.

        {"\n\n"}Quality and Consistency: Hydroponic farming provides a controlled environment, ensuring that each batch of produce meets high-quality standards. This consistency is something your customers will appreciate and come back for.

        {"\n\n"}Sustainability: As consumers become more eco-conscious, sourcing sustainably grown produce can give your store an edge. Hydroponic systems use less water and land compared to traditional farming methods, aligning with the values of environmentally conscious shoppers.

        {"\n\n"}Space Efficiency: With vertical farming techniques, a small footprint can yield a large harvest. This means you can source from local hydroponic farms, reducing transportation costs and carbon footprint.

        {"\n\n"}Customization: Hydroponic farming allows for the cultivation of a wide variety of plants. This opens the door for you to offer unique and exotic produce that can't be found in every grocery store.

        {"\n\n"}Fast to Market: Our 48-hour delivery guarantee ensures that you'll have the freshest produce on your shelves, enhancing customer satisfaction and reducing waste.
      </Text>

      <View style={{height:50}}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#dbf7c5', padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#05542f', marginVertical: 15, fontFamily: 'Times New Roman' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e5405ff', marginTop: 15, fontFamily: 'Times New Roman' },
  subTitle: { fontSize: 20, fontWeight: 'bold', color: '#05542f',textAlign: 'center',  marginVertical: 10, fontFamily: 'Times New Roman' },
  text: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10
  }
});
