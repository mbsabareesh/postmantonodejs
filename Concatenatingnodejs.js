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

app.post('/emp-master', (req, res) => 
{
    if (req.body.key === "add") 
    {
        try 
        {
            var name = req.body.name;
            var address = req.body.address;
            var emp_company_login_id  = req.body.emp_company_login_id;

            var a1 = "select * from empdetails where name = '"+name+"';";
            var a2 = "select * from empdetails where address = '"+address+"';";
            var a3 = "select * from empdetails where emp_company_login_id = '"+emp_company_login_id+"';";

            var sql = a1 + a2 + a3 ;

            client.query(sql,(err,result)=>
            {
                try 
                {
                  if (err)
                  {
                    res.json("error query 1 :"+err);
                  }  
                  else if (result[0].rows.length>0)
                  {
                    res.json("already exists :  '"+name+"';");
                  }
                  else if (result[1].rows.length>0)
                  {
                    res.json("already exists : '"+address+"'; ");
                  }
                  else if (result[2].rows.length>0)
                  {
                    res.json("already exists  :  '"+emp_company_login_id+"';");
                  }
                  else
                    {
                        var insert = "insert into empdetails (name,address,emp_company_login_id)"+" values ('"+name+"','"+address+"','"+emp_company_login_id+"') "+" RETURNING id ;";

                        client.query(insert,(err,result2)=>
                        {
                            try 
                            {
                            if (err)
                            {
                            res.json("error the 2 query:"+err); 
                            } 
                            else 
                            {
                            res.json("order insert sucessfully");  
                            }    
                            } 
                            catch (error) 
                            {
                                res.json("catch error 3 ")
                            }
                        });
                    }
                } 
                catch (error) 
                {
                 res.json("catch error 2 ")     
                }
            });   
        } 
        catch (error) 
        {
          res.json("catch error 1");    
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
