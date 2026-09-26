require("dotenv").config();

const express=require("express");
const cors=require("cors");
const mysql=require("mysql2/promise");

const app=express();
const PORT=Number(process.env.PORT)||10000;

app.use(cors({
  origin:true,
  methods:["GET","POST","OPTIONS"],
  allowedHeaders:["Content-Type"]
}));
app.use(express.json());

const pool=mysql.createPool({
  host:process.env.DB_HOST,
  port:Number(process.env.DB_PORT)||3306,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME||"defaultdb",
  waitForConnections:true,
  connectionLimit:5,
  queueLimit:0,
  ssl:process.env.DB_SSL==="true"?{rejectUnauthorized:false}:undefined
});

const menu=[
  [1,"Benne Masala Dosa","Vidyarthi Bhavan","Legendary crispy, thick dosa roasted in rich butter with spicy potato filling.",85,"breakfast","veg",4.9,"./assets/dosa.png"],
  [2,"Meghana Special Biryani","Meghana Foods","Aromatic basmati rice cooked with tender chicken and secret spices.",320,"biryani","non-veg",4.8,"./assets/biryani.png"],
  [3,"Butter Masala Dosa","CTR","Crisp dosa served with signature coconut chutney and sambar.",75,"breakfast","veg",4.8,"./assets/dosa.png"],
  [4,"Mutton Ghee Roast","Empire Restaurant","Spicy and tangy Mangalorean style mutton roasted in pure ghee.",380,"curries","non-veg",4.7,"./assets/biryani.png"],
  [5,"Idli Vada Sambar Dip","MTR","Soft idlis and crispy vada submerged in flavorful lentil sambar.",90,"breakfast","veg",4.6,"./assets/idli.png"],
  [6,"Chicken Kabab","Empire Restaurant","Crispy, deep-fried chicken marinated in a blend of South Indian spices.",210,"snacks","non-veg",4.7,"./assets/biryani.png"],
  [7,"Paneer Butter Masala","Meghana Foods","Rich and creamy curry made with fresh cottage cheese.",240,"curries","veg",4.5,"./assets/dosa.png"],
  [8,"Gobi Manchurian","Empire Restaurant","Indo-Chinese style crispy cauliflower tossed in a spicy sauce.",150,"snacks","veg",4.4,"./assets/idli.png"],
  [9,"Andhra Chicken Meal","Nagarjuna","Spicy Andhra style chicken served with rice, pappu, and rasam.",290,"biryani","non-veg",4.9,"./assets/biryani.png"],
  [10,"Death By Chocolate","Corner House","Iconic DBC with vanilla ice cream, chocolate sponge, peanuts and hot fudge.",260,"dessert","veg",5.0,"./assets/dessert.png"]
];

async function initializeDatabase(){
  await pool.query(`
    CREATE TABLE IF NOT EXISTS menu_items(
      id INT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      restaurant VARCHAR(150) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      category VARCHAR(50) NOT NULL,
      type VARCHAR(20) NOT NULL,
      rating DECIMAL(2,1),
      image VARCHAR(255)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders(
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      total DECIMAL(10,2) NOT NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'PLACED',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_items(
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      order_id BIGINT NOT NULL,
      menu_item_id INT NOT NULL,
      item_name VARCHAR(150) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      quantity INT NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
    )
  `);

  await pool.query(
    `INSERT INTO menu_items(id,name,restaurant,description,price,category,type,rating,image)
     VALUES ? ON DUPLICATE KEY UPDATE
       name=VALUES(name),restaurant=VALUES(restaurant),description=VALUES(description),
       price=VALUES(price),category=VALUES(category),type=VALUES(type),rating=VALUES(rating),image=VALUES(image)`,
    [menu]
  );
}

app.get("/",(_req,res)=>{
  res.json({name:"CraveBite API",status:"running"});
});

app.get("/health",(_req,res)=>{
  res.status(200).json({status:"ok"});
});

app.get("/ready",async(_req,res)=>{
  try{
    await pool.query("SELECT 1");
    res.json({status:"ready",database:"connected"});
  }catch(error){
    res.status(503).json({status:"not_ready",database:"disconnected"});
  }
});

app.get("/api/menu",async(_req,res)=>{
  try{
    const [rows]=await pool.query("SELECT id,name,restaurant,description,price,category,type,rating,image FROM menu_items ORDER BY id");
    res.json(rows);
  }catch(error){
    console.error(error);
    res.status(500).json({message:"Unable to load menu"});
  }
});

app.post("/api/orders",async(req,res)=>{
  const {items,total}=req.body;

  if(!Array.isArray(items)||items.length===0){
    return res.status(400).json({message:"Order must contain at least one item"});
  }

  const connection=await pool.getConnection();
  try{
    await connection.beginTransaction();

    const [orderResult]=await connection.query(
      "INSERT INTO orders(total,status) VALUES(?,?)",
      [Number(total)||0,"PLACED"]
    );

    const orderId=orderResult.insertId;

    for(const item of items){
      await connection.query(
        "INSERT INTO order_items(order_id,menu_item_id,item_name,price,quantity) VALUES(?,?,?,?,?)",
        [orderId,Number(item.id),String(item.name),Number(item.price),Number(item.quantity)]
      );
    }

    await connection.commit();

    res.status(201).json({
      message:"Order placed successfully",
      orderId,
      status:"PLACED"
    });
  }catch(error){
    await connection.rollback();
    console.error(error);
    res.status(500).json({message:"Unable to place order"});
  }finally{
    connection.release();
  }
});

async function start(){
  try{
    await initializeDatabase();
    app.listen(PORT,"0.0.0.0",()=>{
      console.log(`CraveBite API listening on 0.0.0.0:${PORT}`);
    });
  }catch(error){
    console.error("Database initialization failed:",error);
    process.exit(1);
  }
}

start();