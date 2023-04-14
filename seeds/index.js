const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "643090c24f22de456afe6ca5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        coordinates: [-93.24243874999999, 44.85436575],
        type: "Point",
      },
      images: [
        {
          url: "https://res.cloudinary.com/dh3v7ydsi/image/upload/v1681406541/YelpCamp/nltxflh6pf8bwont7lxe.jpg",
          filename: "YelpCamp/nltxflh6pf8bwont7lxe",
        },
        {
          url: "https://res.cloudinary.com/dh3v7ydsi/image/upload/v1681406542/YelpCamp/uwk1fcazdk8bxxymrdmq.jpg",
          filename: "YelpCamp/uwk1fcazdk8bxxymrdmq",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
