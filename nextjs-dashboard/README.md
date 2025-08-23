## Data scheme

### Retailers 

{
  "_id": "store123",
  "name": "Al-Faisal Store",
  "ownerName": "Ahmed",
  "phone": "0300-1234567",
  "address": {
    "street": "Main Market",
    "city": "Rawalpindi",
    "province": "Punjab"
  },
  "createdAt": "2025-08-23T12:00:00Z"
}

### Bookers

{
  "_id": "bk99",
  "name": "Rashid",
  "phone": "0321-9876543",
  "cnic": "12345-6789012-3",
  "assignedRegion": "North Punjab",
  "joinedAt": "2025-01-01T12:00:00Z"
}

### Products

{
  "_id": "prd01",
  "name": "Washing Powder 1kg",
  "sku": "WP-1KG",
  "category": "Detergent",
  "unitPrice": 250,
  "unit": "kg",
  "active": true,
  "companyId": "cmp01",
  "createdAt": "2025-08-01T12:00:00Z"
}

### Producer Companies

{
  "_id": "cmp01",
  "name": "Unilever Pakistan",
  "address": "Karachi, Pakistan",
  "contact": "021-1234567",
  "country": "Pakistan"
}

### Schemes

{
  "_id": "sch01",
  "productId": "prd01",
  "type": "bonus",          // could be "bonus", "discount", "bundle"
  "buyQty": 12,
  "getQty": 3,
  "effectiveFrom": "2025-08-01",
  "effectiveTo": "2025-08-31",
  "region": "Punjab",       // optional
  "retailerId": null        // optional (target a specific retailer)
}

{
  "_id": "sch01",
  "name": "August Bonus Offer",
  "productIds": ["prd01"],   // can be 1 or multiple products
  "type": "bonus",           // "bonus" | "discount" | "bundle"
  
  "rules": {
    "buyQty": 12,            // for bonus
    "getQty": 3,             // for bonus
    "discountPercent": null, // for discount schemes
    "discountAmount": null,  // fixed discount per unit
    "bundleProducts": []     // for bundle deals
  },

  "applicableTo": {
    "companyId": "cmp01",    // optional scope
    "retailerIds": [],       // restrict to specific retailers
    "region": "Punjab",      // or city-based
    "bookerIds": []          // restrict to specific sales reps
  },

  "effectiveFrom": "2025-08-01",
  "effectiveTo": "2025-08-31",
  "active": true,
  "createdAt": "2025-07-15T12:00:00Z"
}

{
  "type": "bonus",
  "rules": { "buyQty": 12, "getQty": 3 }
}

{
  "type": "discount",
  "rules": { "discountPercent": 10 }
}

{
  "type": "discount",
  "rules": { "discountAmount": 50 }
}

{
  "type": "bundle",
  "productIds": ["prd01", "prd02"],
  "rules": { "discountPercent": 20 }
}

### Bookings

{
  "_id": "inv_2025-08-23_0001",
  "date": "2025-08-23",
  "retailerId": "store123",
  "bookerId": "bk99",
  "lineItems": [
    {
      "productId": "prd01",
      "quantity": 12,
      "price": 1200,
      "schemeApplied": {
        "schemeId": "sch01",
        "bonusQty": 3,
        "effectiveUnitPrice": 1200 / 15
      },
      "total": 1200
    }
  ],
  "grandTotal": 1200
}

# Bookings

{
  "_id": "bk_2025_00001",

  "retailerId": "ret01",
  "retailerSnapshot": {
    "name": "Hafiz General Store",
    "owner": "Hafiz Imran",
    "phone": "03001234567",
    "address": "Main Bazar, Lahore"
  },

  "bookerId": "bk01",
  "bookerSnapshot": {
    "name": "Ali Ahmed",
    "phone": "03123456789",
    "region": "Lahore Zone 1"
  },

  "bookingDate": "2025-08-23T10:15:00Z",
  "status": "confirmed",  // draft | confirmed | delivered | cancelled

  "items": [
    {
      "productId": "prd01",
      "productSnapshot": {
        "name": "Washing Powder 1kg",
        "sku": "WP-1KG",
        "company": "ABC Detergents",
        "category": "Detergent",
        "unit": "piece"
      },

      "schemeId": "sch01",
      "schemeSnapshot": {
        "type": "bonus",
        "buyQty": 12,
        "freeQty": 3,
        "description": "Buy 12 Get 3 Free"
      },

      "orderedQty": 30,       // retailer requested 30
      "billableQty": 24,      // charged units after scheme
      "freeQty": 6,           // bonus/free units
      "unitPrice": 250,
      "totalPrice": 6000      // billableQty * unitPrice
    },
    {
      "productId": "prd02",
      "productSnapshot": {
        "name": "Soap Pack (3x100g)",
        "sku": "SP-3PK",
        "company": "XYZ Soaps",
        "category": "Soap",
        "unit": "pack"
      },

      "schemeId": null,       // no scheme
      "schemeSnapshot": null,

      "orderedQty": 20,
      "billableQty": 20,
      "freeQty": 0,
      "unitPrice": 150,
      "totalPrice": 3000
    }
  ],

  "financials": {
    "subTotal": 9000,
    "discount": 500,
    "tax": 720,
    "grandTotal": 9220,
    "paid": 5000,
    "balance": 4220
  },

  "meta": {
    "createdAt": "2025-08-23T10:15:05Z",
    "createdBy": "bk01",
    "updatedAt": "2025-08-23T10:20:12Z"
  }
}
