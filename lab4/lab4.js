// 1.	Створіть декілька товарів з різним набором властивостей Phone/TV/Smart Watch/ 
[
    {
      "category": "Phone",
      "model": "iPhone 16",
      "producer": "Apple",
      "price": 600
    },
    {
      "category": "Phone",
      "model": "Galaxy S21",
      "producer": "Samsung",
      "price": 750
    },
    {
      "category": "Smart Watch",
      "model": "Mi Band 7",
      "producer": "Xiaomi",
      "price": 50,
      "waterproof": true
    },
    {
      "category": "Smart Watch",
      "model": "Apple Watch SE",
      "producer": "Apple",
      "price": 290,
      "color": "white"
    },
    {
      "category": "TV",
      "model": "Samsung QLED 55",
      "producer": "Samsung",
      "price": 1100,
      "resolution": "4K"
    },
    {
      "category": "TV",
      "model": "LG OLED 65",
      "producer": "LG",
      "price": 1500,
      "resolution": "4K",
      "smart_tv": true
    },
    {
      "category": "Laptop",
      "model": "MacBook Air M1",
      "producer": "Apple",
      "price": 999,
      "ram": "8GB",
      "storage": "256GB SSD"
    },
    {
      "category": "Laptop",
      "model": "Lenovo Legion 5",
      "producer": "Lenovo",
      "price": 1200,
      "ram": "16GB",
      "gpu": "RTX 3060"
    },
    {
      "category": "Headphones",
      "model": "Sony WH-1000XM4",
      "producer": "Sony",
      "price": 300,
      "wireless": true,
      "noise_cancelling": true
    },
    {
      "category": "Headphones",
      "model": "AirPods Pro",
      "producer": "Apple",
      "price": 250,
      "wireless": true
    },
    {
      "category": "Tablet",
      "model": "iPad 9th Gen",
      "producer": "Apple",
      "price": 330,
      "screen_size": "10.2\""
    },
    {
      "category": "Tablet",
      "model": "Samsung Galaxy Tab S6",
      "producer": "Samsung",
      "price": 450,
      "screen_size": "10.5\""
    }
  ]

// 2.Напишіть запит, який виводить усі товари (відображення у JSON)
db["items"].find()

// 3.	Підрахуйте скільки товарів у певної категорії
db.items.countDocuments({ category: "Phone" })
// 4.	Підрахуйте скільки є різних категорій товарів 
db.items.distinct("category").length
// 5.	Виведіть список всіх виробників товарів без повторів 
db.items.distinct("producer")
// 6.	Напишіть запити, які вибирають товари за різними критеріям і їх сукупності:
//      a.	категорія та ціна (в проміжку) - конструкція $and, 
db.items.find({
    $and: [
      { category: "Phone" },
      { price: { $gte: 650, $lte: 1000 } }
    ]
  }).pretty()
//      b.  модель чи одна чи інша - конструкція $or,
db.items.find({
    $or: [
      { model: "LG OLED 65" },
      { model: "Galaxy S21" }
    ]
  }).pretty()
//      c.  виробники з переліку - конструкція $in
db.items.find({
    producer: { $in: ["Sony", "Xiaomi", "LG"] }
  }).pretty()
// 7.	Оновіть певні товари, змінивши існуючі значення і додайте нові властивості (характеристики) усім товарам за певним критерієм
db.items.updateMany(
    { category: "Phone", producer: "Samsung" },
    { $set: { producer: "Samsung Electronics" } }
  )
db.items.find({ _id: ObjectId('680c0dd20cc5af4ce54de831') }).pretty()

db.items.updateMany(
    { category: "Smart Watch" },
    { $set: { bluetooth: true } }
  )
db.items.find({ category: "Smart Watch" }).pretty()
// 8.	Знайдіть товари у яких є (присутнє поле) певні властивості
db.items.find({ wireless: { $exists: true } }).pretty()
// 9.	Для знайдених товарів збільшіть їх вартість на певну суму  
db.items.updateMany(
    { wireless: { $exists: true } },
    { $inc: { price: 55 } }
  )
db.items.find({ wireless: { $exists: true } }).pretty()
// 1.	Створіть кілька замовлень з різними наборами товарів, але так щоб один з товарів був у декількох замовленнях
db.orders.insertMany([
    {
      "order_number": 1001,
      "date": ISODate("2025-04-25"),
      "total_sum": 1850,
      "customer": {
        "name": "Vladyslav",
        "surname": "Shevchenko",
        "phones": [380987654321],
        "address": "Kyiv, Ukraine"
      },
      "payment": {
        "card_owner": "Vladyslav Shevchenko",
        "cardId": 1234123412341234
      },
      "items_id": [
        ObjectId("680c0dd20cc5af4ce54de831"),
        ObjectId("680c0dd20cc5af4ce54de834")
      ]
    },
    {
      "order_number": 1002,
      "date": ISODate("2025-04-26"),
      "total_sum": 2400,
      "customer": {
        "name": "Olena",
        "surname": "Bondarenko",
        "phones": [380931234567],
        "address": "Lviv, Ukraine"
      },
      "payment": {
        "card_owner": "Olena Bondarenko",
        "cardId": 9876987698769876
      },
      "items_id": [
        ObjectId("680c0dd20cc5af4ce54de831"),
              ObjectId("680c0dd20cc5af4ce54de837"),
              ObjectId("680c0dd20cc5af4ce54de83b")
      ]
    }
  ])
// 2.	Виведіть всі замовлення 
db.orders.find({})
// 3.	Виведіть замовлення з вартістю більше певного значення 
db.orders.find({ total_sum: { $gt: 2000 } })
// 4.	Знайдіть замовлення зроблені одним замовником 
db.orders.find({ "customer.name": "Vladyslav" })
// 5.	Знайдіть всі замовлення з певним товаром (товарами) (шукати можна по ObjectId) 
db.orders.find({ items_id: ObjectId("680c0dd20cc5af4ce54de831") })
// 6.	Додайте в усі замовлення з певним товаром ще один товар і збільште існуючу вартість замовлення на деяке значення Х
db.orders.updateMany(
    { items_id: ObjectId("680c0dd20cc5af4ce54de831") },
    {
      $push: { items_id: ObjectId("680c0dd20cc5af4ce54de838") },
      $inc: { total_sum: 300 }
    }
  )
db.orders.find({ items_id: ObjectId("680c0dd20cc5af4ce54de831") })
// 7.	Виведіть кількість товарів в певному замовленні 
db.orders.aggregate([
    { $match: { order_number: 1001 } },
    { $project: { items_count: { $size: "$items_id" } } }
  ])
// 8.	Виведіть тільки інформацію про кастомера і номери кредитної карт, для замовлень вартість яких перевищує певну суму 
db.orders.find(
    { total_sum: { $gt: 2500 } },
    { "customer": 1, "payment.cardId": 1 }
  )
// 9.	Видаліть товар з замовлень, зроблених за певний період дат
db.orders.updateMany(
    {
      date: { $gte: ISODate("2025-04-01"), $lte: ISODate("2025-04-30") }
    },
    {
      $pull: { items_id: ObjectId("680c0dd20cc5af4ce54de831") }
    }
  )
db.orders.find({})
// 10.	Перейменуйте у всіх замовлення ім'я (прізвище) замовника
db.orders.updateMany(
    {},
    { $set: { "customer.name": "Pavlo" } }
  )
db.orders.find({})
// 11.	Знайдіть замовлення зроблені одним замовником, і виведіть тільки інформацію про кастомера та товари у замовлені підставивши замість ObjectId("***") назви товарів та їх вартість (аналог join-а між таблицями orders та items).
db.orders.aggregate([
    {
      $match: {
        "customer.name": "Pavlo",
        "customer.surname": "Shevchenko"
      }
    },
    {
      $lookup: {
        from: "items",
        localField: "items_id",
        foreignField: "_id",
        as: "items_info"
      }
    },
    {
      $project: {
        customer: 1,
        items_info: { model: 1, price: 1 }
      }
    }
  ])
// 1.	Перевірте що при досягненні обмеження старі відгуки будуть затиратись
b.createCollection("reviews", {
    capped: true,
    size: 4096,
    max: 5
  })

db.reviews.insertMany([
  { review_text: "Все супер!", author: "Ivan", rating: 5 },
  { review_text: "Швидка доставка!", author: "Olga", rating: 4 },
  { review_text: "Якість на висоті", author: "Petro", rating: 5 },
  { review_text: "Товар не відповідав опису", author: "Anna", rating: 2 },
  { review_text: "Дуже задоволений покупкою", author: "Serhii", rating: 5 },
  { review_text: "Поганий сервіс", author: "Dmytro", rating: 1 },
  { review_text: "Рекомендую всім!", author: "Oksana", rating: 5 }
])  

db.reviews.find().pretty()