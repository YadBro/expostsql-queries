import { SetUp } from "../expostsql-queries.js";
import express from 'express';


const client = new SetUp('b34s_chapter2', 5432, 'postgres', 'mypassword');
const table_name = 'tb_project';

// READ
// client.selectAll(table_name, (data)=>{
//     console.log(data);
// }, true);


// CREATE OR UPDATE
// client.save(table_name, [{
//     name: "NEW DATA",
//     start_date: "2022-08-12",
//     end_date: "2022-08-13",
//     description: "ANJAY 99 baru",
//     image: "tes_baru99.jpg",
//     technologies: "{nodeJsTechnology, reactJsTechnology}"
// }], true);


// GET SINGLE DATA
// client.selectOneById(table_name, 6, (data)=>{
//     console.log(data);
// }, true);


// REMOVING DATA
// client.remove(table_name, 9, true);


const app = express();


app.set('view engine', 'hbs');



app.get('/', (req, res)=>{
    // READ
    client.selectAll(table_name, (data)=>{
        res.render('index', {data});
    }, true);
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server running on port : ${port}`);
});