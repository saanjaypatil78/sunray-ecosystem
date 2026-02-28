#!/usr/bin/env python3
"""
BRAVEECOM Bulk Product Generator
================================
Generates 15,000 products for the mall
"""

import json
import random
import os
from datetime import datetime
from typing import List, Dict

CATEGORIES = {
    "Electronics": ["earbuds", "smartwatch", "headphones", "mouse", "charger", "ipad", "smartphone", "speaker", "tablet", "laptop", "camera", "monitor", "keyboard", "powerbank", "cable", "pendrive", "ssd", "router", "webcam", "mic"],
    "Fashion": ["sneakers", "jeans", "sunglasses", "jacket", "wallet", "watch", "shoes", "shirt", "tshirt", "kurti", "saree", "lehenga", "dress", "top", "kurta", "sherwani", "blazer", "coat", "sandal", "slippers"],
    "Home & Kitchen": ["cooker", "purifier", "vacuum", "lunchbox", "fan", "flask", "pan", "pot", "blender", "mixer", "grinder", "toaster", "oven", "microwave", "fridge", "ac", "washing machine", "geyser", "heater", "iron"],
    "Health & Fitness": ["yogamat", "massage", "protein", "fitness", "football", "jersey", "dumbbell", "weight", "skipping rope", "exercise bike", "treadmill", "gym gloves", "sports shoes", "cycling", "swimming", "cricket", "badminton", "tennis", "boxing", "karate"],
    "Beauty & Personal Care": ["serum", "hair", "facewash", "makeup", "beard", "skincare", "moisturizer", "sunscreen", "lipstick", "mascara", "foundation", "compact", "perfume", "deodorant", "shampoo", "conditioner", "oil", "cream", "lotion", "nail polish"],
    "Automotive": ["dashcam", "car battery", "car paint", "tire", "oil", "filter", "helmet", "seat cover", "floor mat", "mobile holder", "charger", "cleaner", "polish", "wax", "light", "bulb", "wiper", "mirror", "cover", "jumper"],
    "Sports & Outdoors": ["backpack", "resistance band", "soccer", "badminton", "tent", "gloves", "bat", "ball", "racket", "net", "cycle", "helmet", "skates", "skateboard", "surfboard", "canoe", "hiking", "camping", "fishing", "climbing"],
    "Books": ["novel", "fiction", "non-fiction", "biography", "autobiography", "self-help", "business", "finance", "technology", "cooking", "travel", "history", "science", "philosophy", "psychology", "spirituality", "religion", "art", "photography", "comics"],
    "Toys & Games": ["lego", "scrabble", "hotwheels", "puzzle", "toy car", "barbie", "action figure", "board game", "card game", "video game", "remote control", "drone", "building blocks", "doll", "teddy bear", "educational", "outdoor", "indoor", "strategy", "puzzle"],
    "Grocery": ["rice", "dal", "coffee", "tea", "ghee", "oil", "spices", " flour", "sugar", "salt", "milk", "yogurt", "cheese", "butter", "bread", "egg", "chicken", "mutton", "fish", "vegetables", "fruits"],
    "Pet Supplies": ["dog food", "cat food", "pet carrier", "dog collar", "pet fountain", "bed", "toy", "bowl", "grooming", " leash", "treats", "litter", "shampoo", "medicine", "accessory", "coat", "blanket", "house", "cage", "aquarium"],
    "Office Products": ["standing desk", "pencil", "printer", "folder", "lightbulb", "chair", "lamp", "shelf", "cabinet", "organizer", "stapler", "notebook", "pen", "marker", "tape", "scissors", "calculator", "paper", "envelope", "calendar"],
    "Baby Products": ["diaper", "baby carrier", "baby bouncer", "baby powder", "baby food", "stroller", "crib", "bassinet", "bottle", "nipple", "teether", "toy", "clothes", "blanket", "pillow", "bath", "soap", "oil", "cream", "wipes"],
    "Musical Instruments": ["piano", "guitar", "drums", "keyboard", "violin", "flute", "trumpet", "saxophone", "mic", "speaker", "amplifier", "mixer", "headphones", "stand", "case", "string", "pick", "strap", "tuner", "metronome"],
    "Garden & Outdoors": ["plants", "lawnmower", "soil", "garden lights", "irrigation", "pot", "planter", "fertilizer", "seeds", "sprayer", "gloves", "tools", "hose", "pump", "fountain", "statue", "path", "fence", "shed", "barbecue"]
}

BRANDS = {
    "Electronics": ["Apple", "Samsung", "Sony", "LG", "OnePlus", "Realme", "Xiaomi", "boAt", "JBL", "Bose", "Noise", "Fire-Boltt", "Ambrane", "Portronics", "zebronics"],
    "Fashion": ["Nike", "Adidas", "Puma", "Levi's", "Raymond", "Peter England", "Van Heusen", "Louis Philippe", "UCB", "Gap", "HRX", "Campus", "Bata", "Liberty", "Red Chief"],
    "Home & Kitchen": ["Prestige", "Hawkins", "Philips", "Bajaj", "Syska", "Eureka", "Borosil", "Milton", "Pigeon", "Stovekraft", "Panasonic", "Samsung", "LG", "Whirlpool", "Godrej"],
    "Health & Fitness": ["Boldfit", "HealthViva", "MuscleBlaze", "Optimum Nutrition", "Dymatize", "MusclePharm", "MyProtein", "OneAid", "GNC", "HealthKart", "Nivia", "Cosco", "Stag", "Yonex", "Li-Ning"],
    "Beauty & Personal Care": ["Minimalist", "The Ordinary", "Mamaearth", "Wow", "L'Oreal", "Maybelline", "Nykaa", "Forest Essentials", "Kama Ayurveda", "Lotus", "Patanjali", "Himalaya", "VLCC", "Jovees", "Beardo"],
    "Automotive": ["3M", "Bosch", "Michelin", "Apollo", "Ceat", "MRF", "Bridgestone", "Castrol", "Motul", "Shell", "Bajaj", "TVS", "Hero", "Honda", "Suzuki"],
    "Sports & Outdoors": ["Wildcraft", "Decathlon", "Quechua", "Yonex", "Cosco", "Nivia", "Stag", "Li-Ning", "Babolat", "Head", "Wilson", "Adidas", "Nike", "Puma", "Under Armour"],
    "Books": ["Penguin", "HarperCollins", "Random House", "Jaico", "Manjul", "Oxford", "Cambridge", "Arihant", "Dhanpat Rai", "Vikas", "S Chand", "McGraw Hill", "Pearson", "Cengage", "Bloomsbury"],
    "Toys & Games": ["LEGO", "Mattel", "Hasbro", "Funskool", "Hot Wheels", "Barbie", "Fisher-Price", "Playmobil", "Ravensburger", "Bandai", "Nintendo", "Sony", "Microsoft", "Electronic Arts", "Activision"],
    "Grocery": ["Amul", "Nestle", "Tata", "Parle", "Britannia", "ITC", "MTR", "Basmati", "Daawat", "Fortune", "Dabur", "Patanjali", "Organic India", "Twinings", "Lipton"],
    "Pet Supplies": ["Royal Canin", "Pedigree", "Whiskas", "Purina", "Farmina", "Brit", "Orijen", "Acana", "Hill's", "Drools", "Petsafe", "Kong", "Zee", "Mikki", "Trixie"],
    "Office Products": ["Classmate", "Camlin", "Faber-Castell", "Staedtler", "Pentel", "Pilot", "PaperMate", "Brother", "Epson", "HP", "Canon", "Dell", "Lenovo", "Wipro", "Artistic"],
    "Baby Products": ["Pampers", "Huggies", "MamyPoko", "Luvs", "Chicco", "Fisher-Price", "Philips Avent", "Tommee Tippee", "Dr. Brown's", "MAM", "Burt's Bees", "Mothercare", "Sebamed", "Himalaya", "Mee Mee"],
    "Musical Instruments": ["Yamaha", "Fender", "Gibson", "Casio", "Roland", "Korg", "Pearl", "Zildjian", "Sabian", "Donn", "Sennheiser", "Shure", "Behringer", "Focusrite", "M-Audio"],
    "Garden & Outdoors": ["Gardena", "Bosch", "Black+Decker", "Makita", "Worx", "Ugaoo", "Trust Basket", "Fischer", "Rootex", "Agripro", "Jiffy", "Hydroponics", "GreenMyLife", "Bisa", "Nirvaan"]
}

IMAGES = {
    "Electronics": [
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=500",
        "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?w=500",
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?w=500",
    ],
    "Fashion": [
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=500",
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=500",
    ],
    "Home & Kitchen": [
        "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?w=500",
        "https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?w=500",
    ],
    "Health & Fitness": [
        "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?w=500",
        "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?w=500",
    ],
    "Beauty & Personal Care": [
        "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?w=500",
        "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?w=500",
    ],
    "Automotive": [
        "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=500",
    ],
    "Sports & Outdoors": [
        "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?w=500",
    ],
    "Books": [
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=500",
    ],
    "Toys & Games": [
        "https://images.pexels.com/photos/163036/mario-luigi-yoshi-figures-163036.jpeg?w=500",
    ],
    "Grocery": [
        "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?w=500",
    ],
    "Pet Supplies": [
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=500",
    ],
    "Office Products": [
        "https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?w=500",
    ],
    "Baby Products": [
        "https://images.pexels.com/photos/1620647/pexels-photo-1620647.jpeg?w=500",
    ],
    "Musical Instruments": [
        "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?w=500",
    ],
    "Garden & Outdoors": [
        "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?w=500",
    ]
}

PRICE_RANGES = {
    "Electronics": (299, 50000),
    "Fashion": (199, 15000),
    "Home & Kitchen": (199, 25000),
    "Health & Fitness": (99, 10000),
    "Beauty & Personal Care": (49, 5000),
    "Automotive": (199, 10000),
    "Sports & Outdoors": (99, 15000),
    "Books": (99, 1500),
    "Toys & Games": (99, 5000),
    "Grocery": (29, 2000),
    "Pet Supplies": (99, 3000),
    "Office Products": (49, 10000),
    "Baby Products": (99, 8000),
    "Musical Instruments": (499, 50000),
    "Garden & Outdoors": (99, 10000)
}

def generate_product(index: int, category: str, keyword: str) -> Dict:
    brand = random.choice(BRANDS.get(category, ["Generic"]))
    
    # Generate product name
    color = random.choice(["Black", "White", "Blue", "Red", "Green", "Silver", "Gold", "Grey", "Navy", "Beige"])
    size = random.choice(["S", "M", "L", "XL", "XXL", "Free Size", "1L", "500ml", "1kg", "500g"])
    
    name_templates = [
        f"{brand} {keyword.title()} {color}",
        f"{brand} {keyword.title()} Pro {color}",
        f"{brand} {keyword.title()} Premium {color}",
        f"{brand} {keyword.title()} {size}",
        f"{brand} {keyword.title()} Ultimate {color}",
        f"{brand} {keyword.title()} Elite {color}",
        f"{brand} {keyword.title()} Plus {color}",
        f"{brand} {keyword.title()} Smart {color}",
        f"{brand} {keyword.title()} {color} {size}",
    ]
    
    name = random.choice(name_templates)
    
    # Generate price
    min_price, max_price = PRICE_RANGES.get(category, (100, 5000))
    price = round(random.uniform(min_price, max_price), -1)  # Round to nearest 10
    if price < 100:
        price = round(price, -1)
    
    original_price = round(price * random.uniform(1.2, 2.0), -1)
    
    # Generate rating and reviews
    rating = round(random.uniform(3.5, 5.0), 1)
    reviews = random.randint(10, 50000)
    
    # Image
    image = random.choice(IMAGES.get(category, IMAGES["Electronics"]))
    
    # Generate description
    descriptions = [
        f"Premium quality {keyword} from {brand}. Perfect for everyday use.",
        f"High-performance {keyword} designed for maximum comfort and durability.",
        f"Best-in-class {keyword} with advanced features and sleek design.",
        f"{brand}'s signature {keyword} - combining style with functionality.",
        f"Upgrade your experience with this premium {keyword} from {brand}.",
    ]
    
    description = random.choice(descriptions)
    
    # Bullet points
    bullet_points = [
        f"Premium quality from {brand}",
        f"Durable and long-lasting",
        f"Modern design",
        f"Easy to use",
        f"Best value for money"
    ]
    
    product = {
        "id": f"MALL-PRD-{index:05d}",
        "name": name,
        "brand": brand,
        "category": category,
        "price": int(price),
        "originalPrice": int(original_price),
        "image": image,
        "rating": rating,
        "reviews": reviews,
        "isValuePick": random.random() < 0.3,
        "description": description,
        "bulletPoints": bullet_points[:random.randint(3, 5)],
        "features": random.sample(["Premium", "Durable", "Lightweight", "Waterproof", "Wireless", "Smart", "Portable", "Compact"], k=random.randint(2, 5)),
        "seoKeywords": [keyword, brand.lower(), f"{keyword} {category.lower()}"],
        "seller": f"{brand} Official",
        "stock": random.randint(5, 500)
    }
    
    # Add discount badge for products with good discount
    discount = ((original_price - price) / original_price) * 100
    if discount >= 20:
        product["badge"] = f"-{int(discount)}%"
    elif random.random() < 0.1:
        product["badge"] = random.choice(["Trending", "Bestseller", "New Launch", "Value Pick"])
    
    return product


def generate_all_products(count: int = 15000) -> List[Dict]:
    products = []
    
    # Calculate products per category
    category_list = list(CATEGORIES.keys())
    products_per_category = count // len(category_list)
    
    product_index = 1
    
    for category in category_list:
        keywords = CATEGORIES[category]
        
        # Distribute products across keywords
        products_per_keyword = products_per_category // len(keywords)
        
        for keyword in keywords:
            # Generate variations for each keyword
            num_variations = products_per_keyword
            
            for i in range(num_variations):
                product = generate_product(product_index, category, keyword)
                products.append(product)
                product_index += 1
                
                if product_index > count:
                    break
            
            if product_index > count:
                break
        
        if product_index > count:
            break
    
    print(f"Generated {len(products)} products")
    return products


def save_products(products: List[Dict], output_file: str):
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(products)} products to {output_file}")


if __name__ == "__main__":
    print("Generating 15,000 products...")
    products = generate_all_products(15000)
    
    output_path = "./sunray_system/data/products.json"
    save_products(products, output_path)
    
    print("\nGeneration complete!")
    print(f"Total products: {len(products)}")
    
    # Print category distribution
    categories = {}
    for p in products:
        cat = p["category"]
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\nCategory distribution:")
    for cat, count in sorted(categories.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")
