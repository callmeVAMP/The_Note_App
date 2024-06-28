import Express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
const app =Express();
app.use(Express.json());
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;


mongoose.connect(MONGOURL).then(()=>{
  console.log("Data base connected")
  app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
  });
}).catch((error)=>{
  console.log(error);
})

const UserSchema  = new mongoose.Schema({
  title:String,
  content:String,
});

const UserModel = mongoose.model("users",UserSchema);

app.get("/api/notes",async(req,res)=>{
  const userData = await UserModel.find();
  res.json(userData)
})

app.post("/api/notes",async(req,res)=>{
  const {title,content} = req.body;
  const id = parseInt(req.params.id);
  if(!title || !content){
    return res.status(400).send("title and content field")

  }
  try{
    const note = await UserModel.create({
      title,content
    });
    res.json(note);
  } catch(error){
    res.status(500).send("Oops,soemthing wrong");
  }
})

app.put("/api/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;

  // Validate request body
  if (!title || !content) {
    return res.status(400).send("Title and content fields are required");
  }

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("ID must be a valid ObjectId");
  }

  try {
    const updatedNote = await UserModel.updateOne(
      { _id: id }, // Filter to find the document by _id
      { title, content } // Update object with the new data
    );

    if (updatedNote.nModified === 0) {
      return res.status(404).send("Note not found or no change in data");
    }

    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send("Oops, something went wrong");
  }
});



app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("ID must be a valid ObjectId");
  }

  try {
    const result = await UserModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send("Note not found");
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Oops, something went wrong");
  }
});
