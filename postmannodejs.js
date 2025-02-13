// var express = require("express");
// var mysql = require("mysql");
// var app = express();

// app.use(express.json());

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Sabareesh_3936',
//     port: '3306',
//     database: 'amulmilk'
// });

// con.connect((err) => {
//     if (err) {
//         console.log("errorc: " + err);
//     } else {
//         console.log("connected !!");
//     }
// });

// app.post('/mytable', (req, res) => {
//     const { id, area_of_milk, cow_buffalow, cow_milk_liter, buffalow_milk_liter, no_of_milk_supply, no_of_cowmilk_supply, no_of_buffalowmilk_supply } = req.body;

//     const query = 'INSERT INTO milkdetails (id, area_of_milk, cow_buffalow, cow_milk_liter, buffalow_milk_liter, no_of_milk_supply, no_of_cowmilk_supply, no_of_buffalowmilk_supply) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

//     con.query(query, [id, area_of_milk, cow_buffalow, cow_milk_liter, buffalow_milk_liter, no_of_milk_supply, no_of_cowmilk_supply, no_of_buffalowmilk_supply], (err, result) => {
//         if (err) {
//             console.error("Error inserting the value: " + err);
//             res.status(500).json("Error inserting the value.");
//         } else {
//             console.log("Record inserted successfully.");
//             res.status(200).json("Record inserted successfully.");
//         }
//     });
// });

// // app.listen(3000, (err) => {
// //     if (err) {
// //         console.log("error: " + err);
// //     } else {
// //         console.log("Listening on port 3000!");
// //     }
// // });


// const express = require('express');
// const mysql = require('mysql');

// const app = express();
// app.use(express.json()); // Middleware to parse JSON body

// // Create MySQL connection
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     port: 3306, 
//     password: "Sabareesh_3936",
//     database: "day19_product"
// });

// // Connect to MySQL
// con.connect((err) => {
//     if (err) {
//         console.error("Error connecting to MySQL:", err);
//     } else {
//         console.log("Connected to MySQL!");
//     }
// });

// // Handle POST request
// app.post('/ordertable', (req, res) => {
//     var orderdate = req.body.orderdate;
//     var customer_name = req.body.customer_name;
//     var customer_id = req.body.customer_id;
//     var order_emp_name = req.body.order_emp_name;
//     var customer_address = req.body.customer_address;
//     var number = req.body.number;
//     var gst_tax = req.body.gst_tax;
//     var total_amount_with_tax = req.body.total_amount_with_tax;
//     var total_amount_without_tax = req.body.total_amount_without_tax;
//     var status = req.body.status;
//     var delivery_type = req.body.delivery_type;
//     var delivery_period = req.body.delivery_period;

//     var sql = "INSERT INTO order_table (orderdate, customer_id, customer_name, order_emp_name, customer_address, number, gst_tax, total_amount_with_tax, total_amount_without_tax, status, delivery_type, delivery_period) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//     con.query(sql, [
//         orderdate, customer_id, customer_name, order_emp_name, customer_address, number,
//         gst_tax, total_amount_with_tax, total_amount_without_tax, status, delivery_type, delivery_period
//     ], (err, result) => {
//         if (err) {
//             console.error("Error inserting the value:", err);
//             res.status(500).json({ error: "Error inserting the value.", details: err });
//         } else {
//             console.log("Record inserted successfully.");
//             res.status(200).json({ message: "Record inserted successfully." });
//         }
//     });
// });

// // Start server
// app.listen(3000, (err) => {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log("Listening on port 3000!");
//     }
// });




const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306, 
    password: "Sabareesh_3936",
    database: "day19_product"
});


con.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL!");
    }
});


// app.post('/ordertable', (req, res) => {

//     if(req.body.key == 'add') 
//     {
//         var orderdate = req.body.orderdate;
//         var customer_name = req.body.customer_name;
//         var customer_id = req.body.customer_id;
//         var order_emp_name = req.body.order_emp_name;
//         var customer_address = req.body.customer_address;
//         var number = req.body.number;
//         var gst_tax = req.body.gst_tax;
//         var total_amount_with_tax = req.body.total_amount_with_tax;
//         var total_amount_without_tax = req.body.total_amount_without_tax;
//         var status = req.body.status;
//         var delivery_type = req.body.delivery_type;
//         var delivery_period = req.body.delivery_period;
//         var item_array = req.body.item_array;

//         const orderSql = "INSERT INTO order_table (orderdate, customer_id, customer_name, order_emp_name, customer_address, number, gst_tax, total_amount_with_tax, total_amount_without_tax, status, delivery_type, delivery_period) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//         con.query(orderSql, [
//             orderdate, customer_id, customer_name, order_emp_name, customer_address, number,
//             gst_tax, total_amount_with_tax, total_amount_without_tax, status, delivery_type, delivery_period
//         ], (err, result) => {
//             if (err) {
//                 console.error("Error inserting order:", err);
//                 return res.status(500).json({ error: "Error inserting order.", details: err });
//             }

//             const orderid = result.insertId;
//             console.log("Order inserted with ID:", orderid);

//             if (!item_array || item_array.length === 0) {
//                 return res.status(200).json({ message: "Order inserted successfully without items." });
//             }

//             const itemSql = "INSERT INTO item_table (orderid, customer_id, product_name, product_id, amount_with_tax, amount_without_tax, gst, gst_amount, CGST, SGST, IGST) VALUES ?";
//             const itemValues = item_array.map(item => [
//                 orderid, customer_id, item.product_name, item.product_id, item.amount_with_tax,
//                 item.amount_without_tax, item.gst, item.gst_amount, item.CGST, item.SGST, item.IGST
//             ]);

//             con.query(itemSql, [itemValues], (err, result) => {
//                 if (err) {
//                     console.error("Error inserting items:", err);
//                     return res.status(500).json({ error: "Error inserting items.", details: err });
//                 }

//                 console.log("Items inserted successfully:", result.affectedRows);
//                 res.status(200).json({ message: "Order and items inserted successfully." });
//             });
//         });
//     }
//     else if(req.body.key == 'update')
//     {
        
//     } 
// });



// app.listen(3000, (err) => {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log("Listening on port 3000!");
//     }
// });



app.post('/ordertable', (req, res) => 
{

    if (req.body.key == 'add') 
    {
        var orderdate = req.body.orderdate;
        var customer_name = req.body.customer_name;
        var customer_id = req.body.customer_id;
        var order_emp_name = req.body.order_emp_name;
        var customer_address = req.body.customer_address;
        var number = req.body.number;
        var gst_tax = req.body.gst_tax;
        var total_amount_with_tax = req.body.total_amount_with_tax;
        var total_amount_without_tax = req.body.total_amount_without_tax;
        var status = req.body.status;
        var delivery_type = req.body.delivery_type;
        var delivery_period = req.body.delivery_period;
        var item_array = req.body.item_array;

        const orderSql = "INSERT INTO order_table (orderdate, customer_id, customer_name, order_emp_name, customer_address, number, gst_tax, total_amount_with_tax, total_amount_without_tax, status, delivery_type, delivery_period) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        con.query(orderSql, [orderdate, customer_id, customer_name, order_emp_name, customer_address, number,
            gst_tax, total_amount_with_tax, total_amount_without_tax, status, delivery_type, delivery_period], (err, result) => 
        {
            if (err) {
                console.error("Error inserting order:", err);
                return res.status(500).json({ error: "Error inserting order.", details: err });
            }

            const orderid = result.insertId;
            console.log("Order inserted with ID:", orderid);

            if (!item_array || item_array.length === 0) {
                return res.status(200).json({ message: "Order inserted successfully without items." });
            }

            const itemSql = "INSERT INTO item_table (orderid, customer_id, product_name, product_id, amount_with_tax, amount_without_tax, gst, gst_amount, CGST, SGST, IGST) VALUES ?";

            const itemValues = item_array.map(item => [
                orderid, customer_id, item.product_name, item.product_id, item.amount_with_tax,
                item.amount_without_tax, item.gst, item.gst_amount, item.CGST, item.SGST, item.IGST
            ]);

            con.query(itemSql, [itemValues], (err, result) => {
                if (err) {
                    console.error("Error inserting items:", err);
                    return res.status(500).json({ error: "Error inserting items.", details: err });
                }else{
                console.log("Items inserted successfully:", result.affectedRows);
                res.status(200).json({ message: "Order and items inserted successfully." });
                }
            });
        });
    } 
    else if (req.body.key == 'update') 
    {
        var orderid = req.body.orderid;
        var orderdate = req.body.orderdate;
        var customer_name = req.body.customer_name;
        var customer_id = req.body.customer_id;
        var order_emp_name = req.body.order_emp_name;
        var customer_address = req.body.customer_address;
        var number = req.body.number;
        var gst_tax = req.body.gst_tax;
        var total_amount_with_tax = req.body.total_amount_with_tax;
        var total_amount_without_tax = req.body.total_amount_without_tax;
        var status = req.body.status;
        var delivery_type = req.body.delivery_type;
        var delivery_period = req.body.delivery_period;
        var item_array = req.body.item_array;
    
        const updateOrderSql = `UPDATE order_table 
            SET orderdate=?, customer_id=?, customer_name=?, order_emp_name=?, 
            customer_address=?, number=?, gst_tax=?, total_amount_with_tax=?, 
            total_amount_without_tax=?, status=?, delivery_type=?, delivery_period=? 
            WHERE orderid=12`;
    
        con.query(updateOrderSql, [orderdate, customer_id, customer_name, order_emp_name, customer_address, number,
            gst_tax, total_amount_with_tax, total_amount_without_tax, status, delivery_type, delivery_period, orderid ], (err, result) => 
        {
            if (err) {
                console.error("Error updating order:", err);
                return res.status(500).json({ error: "Error updating order.", details: err });
            }
            
            const orderid = result.insertId;
            console.log("Order updated successfully:", result.affectedRows);
    
            if (!item_array || item_array.length === 0) {
                return res.status(200).json({ message: "Order updated successfully without item updates." });
            }
    
         
            const updateItemSql = `UPDATE item_table 
                SET amount_with_tax=?, amount_without_tax=?, gst=?, gst_amount=?, CGST=?, SGST=?, IGST=? 
                WHERE orderid=13 AND product_id= 'md-11'`;

                // console.log("update query : "+updateItemSql);
    
            item_array.forEach(item => {
                con.query(updateItemSql, [
                    item.amount_with_tax, item.amount_without_tax, item.gst, item.gst_amount, 
                    item.CGST, item.SGST, item.IGST, orderid, item.product_id
                ], (err, result) => {
                    if (err) {
                        console.error("Error updating item:", err);
                    } else {
                        console.log("item table update successfully"+JSON.stringify(result));
                    }
                });
            });
    
            res.status(200).json({ message: "Order and existing items updated successfully." });
        });
    }    
    else 
    {
        res.status(400).json({ error: "Invalid request key." });
    }
});

app.listen(3000, (err) => 
{
    if (err) 
    {
        console.log("Error:", err);
    } else 
    {
        console.log("Listening on port 3000!");
    }
});




// postman concepts

{
    "key":"update",
    "orderid":15,
    "orderdate": "2024-10-09",
    "customer_name": "iphone",
    "customer_id": "mag-24",
    "order_emp_name": "Banu",
    "customer_address": "Namakkal, Tamil Nadu",
    "number": "9701056130",
    "gst_tax": 18,
    "total_amount_with_tax": 800000,
    "total_amount_without_tax": 190000,
    "status": "placed",
    "delivery_type": "van",
    "delivery_period": "19 days",
    "item_array": [
        {
            "itemid":23,
            "product_name": "13 pro max",
            "product_id": "md-31",
            "amount_with_tax": 20000,
            "amount_without_tax": 76000,
            "gst": 15,
            "gst_amount": 1050,
            "CGST": 100,
            "SGST": 100,
            "IGST": 98
        },
        {
            "itemid":21,
            "orderid":12,
            "product_name": "laptop",
            "product_id": "md-05",
            "amount_with_tax": 12000,
            "amount_without_tax": 60000,
            "gst": 20,
            "gst_amount": 2160,
            "CGST": 9,
            "SGST": 9,
            "IGST": 90
        }
    ]
}
