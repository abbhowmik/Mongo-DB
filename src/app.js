const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/matta", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection was successfull...."))
  .catch((err) => console.log(err));

// scema == structure of your data queries and your document

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ctype: String,
  clones: Number,
  email: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// collection creation (here mattadata is the collection)
const Playlist = new mongoose.model("Mattadata", playlistSchema);

// create document or insert

const createDocument = async () => {
  try {
    const expressPlaylist = new Playlist({
      name: "Express Js",
      ctype: "Back End",
      clones: 0,
      active: false,
    });
    const jsPlaylist = new Playlist({
      name: "Javascript",
      ctype: "Front End",
      clones: 7,
      active: true,
    });
    const reactPlaylist = new Playlist({
      name: "React Js",
      ctype: "Front End",
      clones: 10,
      email: "matta@matta.com",
      active: true,
    });
    // const result = await Playlist.insertMany([
    //   expressPlaylist,
    //   jsPlaylist,
    //   reactPlaylist,
    // ]);
    const result = await reactPlaylist.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

const getDocument = async () => {
  const result = await Playlist.find({ ctype: "Front End" })
    .select({
      name: 1,
    })
    .limit(1);
  console.log(result);
};

// getDocument();
