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


function array_validation(value) 
{
    if (typeof value =="undefined" || value =="" || value == null || value == " " || value == "undefined" || value == "null") 
    {
        return [];
    }
    else 
    {
        return value;
    }
}
function undefined_numeric(numeric_val)
{
    var return_val = 0;

	if ((typeof numeric_val  == "undefined") || (numeric_val == null) || (numeric_val == "") || (numeric_val == "-") || (numeric_val  == " ")|| ( isNaN(numeric_val) ))
    {
        return_val = 0;
    }
    else
    {
        return_val = numeric_val;
    }
		
	return return_val;
}


// company details 

app.post('/company_master', (req, res) => 
{
    // add 
    if (req.body.key === "add") 
    {
        try 
        {
            var comp_code = req.body.comp_code;
            var comp_name = req.body.comp_name;
            var com_active_ind = req.body.com_active_ind !== undefined ? req.body.com_active_ind : 0;
            var comp_login_id = req.body.comp_login_id;

            var s1 = "SELECT * FROM company_details WHERE comp_name = '" + comp_name + "';";
            var s2 = "SELECT * FROM company_details WHERE comp_code = '" + comp_code + "';";
            var s3 = "";
            var s4 = "";

            var sqq = s1 + s2 + s3 + s4; // Concatenating 

            client.query(sqq, (err, result) => 
            {
                if (err) 
                {
                 res.json("Error in query: " + err);
                }
                else if (result[0].rows.length > 0) 
                {
                 res.json("Already exists: " + comp_name);
                }
                else if (result[1].rows.length > 0) 
                {
                 res.json("Already exists: " + comp_code);
                }
                // else if (result[2].rows.length > 0) 
                // {
                //  res.json("Already exists: " + com_active_ind);
                // }
                else if (result[3].rows.length > 0) 
                {
                 res.json("Already exists: " + comp_login_id);
                }
                else
                {
                    var sql = "INSERT INTO company_details (comp_code, comp_name, com_active_ind, comp_login_id) " +
                          "VALUES ('" + comp_code + "','" + comp_name + "','" + com_active_ind + "','" + comp_login_id + "') " + "RETURNING id;";

                    client.query(sql, (err, result2) => 
                    {
                        if (err)
                        {
                            return res.json("Query error: " + err);
                        } 
                        else 
                        {
                            res.json({ message: "Successfully viewed the data", data: result2.rows }); 
                        }
                    });
                }
            });
        } 
        catch (error) 
        {
            res.json("Catch error: " + error);
        }
    } 
    //update
    else if (req.body.key === "update") 
    {
        const comp_id = undefined_numeric(req.body.comp_id);
        const comp_code = req.body.comp_code;
        const comp_name = req.body.comp_name;
        const com_active_ind = req.body.com_active_ind !== undefined ? req.body.com_active_ind : 0;
        const comp_login_id = undefined_numeric(req.body.comp_login_id);

        console.log("company id : "+comp_id);

        var sql = "UPDATE company_details SET comp_code = '" + comp_code + "', comp_name = '" + comp_name + "', " +
                  "com_active_ind = '" + com_active_ind + "', comp_login_id = '" + comp_login_id + "' WHERE comp_id = '" + comp_id + "';";

        client.query(sql, (err, result) => 
        {
            if (err) 
            {
                console.error("Error updating order:", err);
                return res.json("Error updating order: " + err);
            } 
            else 
            {
                res.json("Order updated successfully.");
            }
        });
    }
    // list
    else if(req.body.key === "list")
    {

        var status_type = req.body.status_type;
        if ((typeof status_type   == "undefined") || (status_type  == null) || (status_type  == "") || (status_type  == " ") )
        {
            status_type  = "all";
        }
        else
        {
            status_type  = status_type ;
        }
        
        var status_value = array_validation(req.body.status_value);

        var err_flag = 0 ;
        var e_msg = "";


        if(err_flag == 0 && (status_type != "all" && status_value.length == 0))
        {
            err_flag = 1;
            e_msg = "Error Invaild 'Status Value' is passing. Please Contact Admin Regarding";
        }
        else if( (err_flag == 0 )  && ( status_type != "all" ) && ( status_value.length > 0 ))
        {
            for (var i=0; i<status_value.length; i++)
            {
                status_value[i].status_ind = undefined_numeric(status_value[i].status_ind);
                if(err_flag == 0 && ( status_value[i].status_ind != 0 && (status_value[i].status_ind != 1)))
                {
                     err_flag = 1;
                     e_msg = "Error Invaild 'Status Ind' is passing. Please Contact Admin Regarding";
                     break;
                }
                else
                {
                    err_flag = 0;
                    continue;
                }
            }
        }
        if(err_flag == 0 && (status_type != "all" && status_value.length == 0))
        {
            err_flag = 1;
            e_msg = "Error Invaild 'Status Value' is passing. Please Contact Admin Regarding";
        }
        else if( (err_flag == 0 )  && ( status_type != "all" ) && ( status_value.length > 0 ))
        {
            for (var i=0; i<status_value.length; i++)
            {
                // status_value[i].status_ind = undefined_numeric(status_value[i].status_ind);
                status_value[i].status_ind = undefined_numeric(status_value[i].status_ind);
                if(err_flag == 0 && ( status_value[i].status_ind != 0 && (status_value[i].status_ind != 1)))
                {
                     err_flag = 1;
                     e_msg = "Error Invaild 'Status Ind' is passing. Please Contact Admin Regarding";
                     break;
                }
                else
                {
                    err_flag = 0;
                    continue;
                }
            }
        }

        if(err_flag == 1)
        {
           res.json({ message: e_msg });
        }
        else
        { 
            var sql_first_part = "select comp_id,comp_code,comp_name,com_active_ind,comp_login_id from company_details ";
            var sql_where_end = "order by com_active_ind desc, comp_name asc";
            var sql_where_status ="";
            var status_text = "";
            

            
            if (status_type == "all")
            {
                sql_where_status = " "
            }
            else
            {
                sql_where_status = " where com_active_ind IN ("
            
                status_text = "'"+status_value[0].status_ind+"'";

                for (var i=1; i < status_value.length; i++)
                {
                    status_text = status_text + ", '"+status_value[i].status_ind+"'";
                }
                status_text = status_text + " ) ";
            }
                    
            var sql1 = sql_first_part + sql_where_status + status_text + sql_where_end + ";" ;  
            // var sql2 = sql_count_part + sql_where_status + status_text + ";" ;
            console.log(sql1);


            client.query(sql1,(err,result3)=>
            {
                if(err)
                {
                    res.json("error the query l4"+err);
                }
                else
                {
                    res.json({ message: "Successfully viewed the data", data: result3.rows });
                }
            });

        }

    }
    else 
    {
        return res.json("Invalid request key.");
    }
});








// client master

app.post('/client_master',(req,res)=>
{
    if(req.body.key === "addclient")
    {
        try 
        {
            var client_comp_id = req.body.client_comp_id;
            var client_name = req.body.client_name;
            var client_code = req.body.client_code;
            var client_active_ind = req.body.client_active_ind != undefined? req.body.client_active_ind :1;

            var s5 = "select * from client_master where client_name = '"+client_name+"'and client_comp_id = '"+client_comp_id+"';";
            var s6 = "select * from client_master where client_code = '"+client_code+"'and client_comp_id = '"+client_comp_id+"';";
           
            var sq = s5+s6;

            console.log(sq);
            client.query(sq, function(err,result5)
            {
               try 
               {
                if (err) 
                {
                  res.json("error query sq :"+err)  
                }
                else if (result5[0].rows.length > 0)
                {
                    console.log("result 0 :")
                    res.json("already '"+client_name+"' exixts ");
                }
                else if (result5[1].rows.length > 0)
                {
                    console.log("result 1 :")
                    res.json("already '"+client_code+"' exixts ");
                }
                else 
                {
                    var sql4 = "insert into client_master (client_comp_id,client_name,client_code,client_active_ind)values ('"+client_comp_id+"','"+client_name+"','"+client_code+"','"+client_active_ind+"') returning client_id";

                    client.query(sql4,function(err,result4)
                    {
                        if(err)
                        {
                            res.json("error query sql4 :"+err);
                        }
                        else
                        {
                            res.json({ message: "Successfully viewed the data", data: result4.rows }); 
                        }
                    });   
                }
                
               } 
               catch (error) 
               {
                res.json("catch error in sq query ?")
               }
            });    
        } 
        catch (error) 
        {
            res.json("catch error client 1")    
        }
    }
    else if(req.body.key === "updateclient")
    {
        try 
        {
            var client_id = req.body.client_id;
            var client_comp_id = req.body.client_comp_id;
            var client_name = req.body.client_name;
            var client_code = req.body.client_code;
            var client_active_ind = req.body.client_active_ind != undefined? req.body.client_active_ind :1;

            var sql5 = "update client_master set client_name = '"+client_name+"',client_code = '"+client_code+"',client_active_ind = '"+client_active_ind+"' where client_id = '"+client_id+"'and client_comp_id = '"+client_comp_id+"';";

            client.query(sql5, (err, result) => 
            {
                if (err) 
                {
                    console.error("Error updating order:", err);
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
            res.json("catch error client 2")    
        }
    }
    else if (req.body.key === "listclient")
    {
        var status_type = req.body.status_type;
        if ((typeof status_type   == "undefined") || (status_type  == null) || (status_type  == "") || (status_type  == " ") )
        {
            status_type  = "all";
        }
        else
        {
            status_type  = status_type ;
        }

        var status_value = array_validation(req.body.status_value);
        var err_flag = 0;
        var err_msg = "";
        if(err_flag == 0 && (status_type != "all" && status_value.length == 0))
        {
            err_flag = 1;
            err_msg = "error invaild status values client side "
        }
        else if ((err_flag == 0) && (status_type != "all") && (status_value.length>0))
        {
            for(var i=0; i<status_value.length; i++)
            {
                status_value[i].status_ind = undefined_numeric(status_value[i].status_ind);
                if(err_flag == 0 && (status_value[i].status_ind != 0 && (status_value[i].status_ind != 1)))
                {
                    err_flag = 1;
                    err_msg = "error invalid statusvalie client side ind";
                    break;
                }
                else
                {
                    err_flag = 0;
                    continue;
                }
            }
        }
        if(err_flag == 1)
        {
            res.json({ message: err_msg });
        }

        else
        {
            var client_comp_id = req.body.client_comp_id;

            var sql_first_part = "select client_id,client_comp_id,client_name,client_code,client_active_ind from client_master ";
                var sql_where_end = " and client_comp_id = '"+client_comp_id+"';";
                var sql_where_status =" ";
                var status_text = "";

                if (status_type == "all")
                {
                    sql_where_status = " "
                }
                else
                {
                    sql_where_status = " where client_active_ind IN ("
                
                    status_text = "'"+status_value[0].status_ind+"'";

                    for (var i=1; i < status_value.length; i++)
                    {
                        status_text = status_text + ", '"+status_value[i].status_ind+"'";
                    }
                    status_text = status_text + " ) ";
                }
                        
                var sql3 = sql_first_part + sql_where_status + status_text + sql_where_end + ";" ;  
                console.log(sql3);

                client.query(sql3,function(err,result4)
                {
                    if (err) 
                    {
                        res.json("error the sql3 query"+err);    
                    } 
                    else 
                    {
                        res.json({ message: "Successfully listed the data", data: result4.rows });    
                    }
                });
        }

    }
    else 
    {
        return res.json("Invalid request key.");
    }

})

app.listen(3000, () => 
{
    console.log('Server is running on port 3000');
});
