CREATE (c1:Customer {id: 1, name: "Stepan"}),
       	     (c2:Customer {id: 2, name: "Anna"})

CREATE (i1:Item {id: 1, name: "Laptop", price: 1000}),
      	     (i2:Item {id: 2, name: "Mouse", price: 50}),
      	     (i3:Item {id: 3, name: "Keyboard", price: 80})

CREATE (o1:Order {id: 101, date: date("2025-05-14")}),
       	     (o2:Order {id: 102, date: date("2025-05-15")}),
   	     (o3:Order {id: 103, date: date("2025-05-15")})

CREATE (c1)-[:BOUGHT]->(o1),
       	    (o1)-[:CONTAINS]->(i1),
      	    (o1)-[:CONTAINS]->(i2),
    	    (c1)-[:BOUGHT]->(o2),
     	    (o2)-[:CONTAINS]->(i2),
   	    (o2)-[:CONTAINS]->(i3),
   	    (c2)-[:BOUGHT]->(o3),
   	    (o3)-[:CONTAINS]->(i3)

CREATE (c1)-[:VIEWED]->(i1),
   	    (c2)-[:VIEWED]->(i1),
   	    (c2)-[:VIEWED]->(i3)


MATCH (o:Order {id: 101})-[:CONTAINS]->(i:Item)
RETURN i.name, i.price

MATCH (o:Order {id: 101})-[:CONTAINS]->(i:Item)
RETURN SUM(i.price) AS total_order_price

MATCH (c:Customer {id: 1})-[:BOUGHT]->(o:Order)
RETURN o.id, o.date

MATCH (c:Customer {id: 1})-[:BOUGHT]->(:Order)-[:CONTAINS]->(i:Item)
RETURN DISTINCT i.name

MATCH (c:Customer {id: 1})-[:BOUGHT]->(:Order)-[:CONTAINS]->(i:Item)
RETURN COUNT(i) AS total_items_bought

MATCH (c:Customer {id: 1})-[:BOUGHT]->(:Order)-[:CONTAINS]->(i:Item)
RETURN SUM(i.price) AS total_spent

MATCH (:Order)-[:CONTAINS]->(i:Item)
RETURN i.name, COUNT(*) AS times_purchased
ORDER BY times_purchased DESC

MATCH (c:Customer {id: 1})-[:VIEWED]->(i:Item)
RETURN i.name

MATCH (o:Order)-[:CONTAINS]->(target:Item {id: 1})
MATCH (o)-[:CONTAINS]->(other:Item)
WHERE other <> target
RETURN DISTINCT other.name

MATCH (c:Customer)-[:BOUGHT]->(:Order)-[:CONTAINS]->(i:Item {id: 2})
RETURN DISTINCT c.name

MATCH (c:Customer {id: 1})-[:VIEWED]->(i:Item)
WHERE NOT EXISTS {
  MATCH (c)-[:BOUGHT]->(:Order)-[:CONTAINS]->(i)
}
RETURN i.name