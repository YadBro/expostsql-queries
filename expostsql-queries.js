import pkg from "pg";

const IdT = "Your id request, it doesn't exist!";

export class SetUp{
    /**
     *Set Up your database postgresql
    *  
    *  @param {string} dbname
    *  @param {number} port 5432
    *  @param {string} user postgres
    *  @param {string} password *****
    */
    constructor(dbname, port, user, password){
        const {Pool} = pkg;
        this.dbname = dbname;
        this.port = 5432 || port;
        this.user = 'postgres' || user;
        this.password = password;
        this.client = new Pool({
                    database: dbname,
                    port: 5432 || port,
                    user: 'postgres' || user,
                    password: password
        });
        this.client.connect((err, client, done) => {
            if (err) throw err;
            done()
        });
    }
    /**
     * Checking rowCount data
     * @param {string} table_name your table name database
     * @param {number} id your id database
     * @param {()} callback
     */
    checking(table_name, id, callback){
        if(id){
            let query = `SELECT * FROM ${table_name} WHERE id=${id}`;
            this.client.query(query, (err, result)=>{
                if(result.rowCount === 0){
                    callback(true);
                }
                else{
                    callback(false);
                }
            });
        }else{
            callback(false)
        }
    }
    /**
     * Select all rows in your table database
     * @param {string} table_name your table name database
     * @param {()} callback
     * @param {boolean} stop stopping the client requiring
     */
    selectAll(table_name, callback, stop=false){
        let query = `SELECT * FROM ${table_name}`;
        this.client.query(query, (err, result)=>{
            if(err) throw err
            if(stop === true){
                this.client.end();
            }
            callback(result.rows);
        });
        
    }

    /**
     * Select single data in your table database
     * @param {string} table_name your table name database
     * @param {number} id your id database
     * @param {()} callback
     * @param {boolean} stop stopping the client requiring
     */
    selectOneById(table_name, id, callback, stop=false){
        let query = `SELECT * FROM ${table_name} WHERE id=${id}`;
        this.client.query(query, (err, result)=>{
            if(result.rowCount === 0){
                if(err) throw err
                this.client.end()
                return console.log(`SELECTING ERROR: ${IdT}`)
            }else{
                if(stop === true){
                    this.client.end();
                }
                callback(result.rows);
            }
        });
    }

    /**
     * Create or Update your field database
     * @param {string} table_name your table name database
     * @param {()} callback
     * @param {boolean} stop stopping the client requiring
     */
    save(table_name, data, stop=false){
        let query = ``;
        let a= ``;
        let d= ``;
        const dataID = data[0].id;
        this.checking(table_name, dataID, checked=>
        {
            // CHECK APAKAH ID ADA ATAU TIDAK
            if(checked === true){
                this.client.end();
                return console.log(`SAVING ERROR: ${IdT}`);
            }else if(checked === false){
                data.map(m => {
                    const b = Object.keys(m);
                    const c = Object.values(m);
                    
                    if(b[0] === 'id'){
                        for(let i = 1; i < b.length; i++){
                            a += `${b[i]} = '${c[i]}', `;
                        };
                        const slicing = a.slice(0, -2); // menghapus koma di belakang
                        query += `UPDATE ${table_name} SET ${slicing} WHERE id='${c[0]}'`;
                    }else{
                        for(let i = 0; i < b.length; i++){
                            a += `${b[i]}, `
                            d += `'${c[i]}', `
                        }
                        const slicing = a.slice(0, -2); // menghapus koma di belakang
                        const slicingc = d.slice(0, -2); // menghapus koma di belakang
                        query += `INSERT INTO ${table_name}(${slicing}) VALUES(${slicingc})`;
                    }
                });
                this.client.query(query, (err, result)=>{
                    if(err) throw err
                    if(stop === true){
                        this.client.end();
                    }
                });
            }
        });
    }
    /**
     * Remove your field database
     * @param {string} table_name your table name database
     * @param {number} id your id database
     * @param {boolean} stop stopping the client requiring
     */
    remove(table_name, id, stop=false){
        this.checking(table_name, id, checked =>{
            // CHECK APAKAH ID ADA ATAU TIDAK
            if(checked === true){
                this.client.end();
                return console.log(`DELETING ERROR: ${IdT}`);
            }else if(checked === false){
                let query = `DELETE FROM ${table_name} WHERE id=${id}`;
                this.client.query(query, (err, result)=>{
                    if(err) throw err
                    if(stop === true){
                        this.client.end();
                    }
                });
            }
        });
    }


}