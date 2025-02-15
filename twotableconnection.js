const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json());

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Sabareesh_3936",
    database: "companydetails"
});

client.connect((err) => {
    if (err) {
        console.error("Error connecting to PostgreSQL:", err);
    } else {
        console.log("Connected to PostgreSQL!");
    }
});

app.post('/empl-master', (req, res) => 
{
    if (req.body.key === "add") 
    {
        try 
        {
            var name = req.body.name;
            var address = req.body.address;
            var emp_company_login_id  = req.body.emp_company_login_id;
            var item_array = req.body.item_array;

            var a1 = "select * from empdetails where name = '"+name+"';";
            var a2 = "select * from empdetails where address = '"+address+"';";
            var a3 = "select * from empdetails where emp_company_login_id = '"+emp_company_login_id+"';";

            var sql = a1 + a2 + a3 ;

            client.query(sql, (err, result) =>
            {
                try 
                {
                    if (err)
                    {
                        res.json("error query 1 :"+err);
                    }  
                    else if (result[0].rows.length > 0)
                    {
                        res.json("already exists :  '"+name+"';");
                    }
                    else if (result[1].rows.length > 0)
                    {
                        res.json("already exists : '"+address+"'; ");
                    }
                    else if (result[2].rows.length > 0)
                    {
                        res.json("already exists  :  '"+emp_company_login_id+"';");
                    }
                    else
                    {
                        var insert = "insert into empdetails (name, address, emp_company_login_id) values ('"+name+"', '"+address+"', '"+emp_company_login_id+"') RETURNING id;";
                        client.query(insert, (err, result2) =>
                        {
                            try 
                            {
                                if (err)
                                {
                                    res.json("error the 2 query:"+err); 
                                } 
                                else 
                                {
                                    var emp_company_login_id = result2.rows[0].id;
                                    console.log("Order inserted with ID:", emp_company_login_id);
                                    if (!item_array || item_array.length === 0) 
                                    {
                                        res.json( "Order inserted successfully without items." );
                                    }

                                    item_array.forEach(item => 
                                    {
                                        var fathername = item.fathername;
                                        var mothername = item.mothername;
                                        var salary = item.salary;

                                        var itemsql = "insert into emppersonal (fathername, mothername, salary, emp_company_login_id) values ('"+fathername+"', '"+mothername+"', '"+salary+"', '"+emp_company_login_id+"');";

                                        client.query(itemsql, function(err, result)
                                        {
                                            try 
                                            {
                                                if (err) 
                                                {
                                                    res.json("itemsql query error: "+err);  
                                                } 
                                                else 
                                                {
                                                    res.json("itemsql successfully inserted") 
                                                }
                                            } 
                                            catch (error)
                                            {
                                                res.json("catch error in itemsql: " + error)
                                            }
                                        });
                                    });
                                }    
                            } 
                            catch (error) 
                            {
                                res.json("catch error 3: " + error)
                            }
                        });
                    }
                } 
                catch (error) 
                {
                    res.json("catch error 2: " + error)     
                }
            });   
        } 
        catch (error) 
        {
            res.json("catch error 1: " + error);    
        }    
    }
    else if (req.body.key === "update")
    {
        try 
        {
            var id = req.body.id;
            var name = req.body.name;
            var address = req.body.address;
            var emp_company_login_id  = req.body.emp_company_login_id;

            var sql1 = "update empdetails set name = '"+name+"',address ='"+address+"', emp_company_login_id = '"+emp_company_login_id+"' where id = '"+id+"';";

            client.query(sql1, (err, result) => 
            {
                if (err) 
                {
                    return res.json("Error updating order: " + err);
                } 
                else 
                {
                    res.json("Order updated successfully.");
                }
            });
               
        } 
        catch (error) 
        {
          res.json("catch error 1 in update key ");    
        }
    } 
    else 
    {
       return res.json("Invalid request key."); 
    }

});


app.listen(3000, () => 
{
    console.log('Server is running on port 3000');
});
