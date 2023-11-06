import Category from "../models/category.model.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ ...categories });
};

export const postCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findOne({ name: name });
  if (!category) {
    const newCategory = await Category.create({ name: name });
    if (!newCategory) {
      res.status(500).json({ error: "Server Error: Something went wrong." });
    } else {
      res.status(201).json({ message: "Status 201: New category created." });
    }
  } else {
    res.status(400).json({ error: "Bad Request: Category exist" });
  }
};

export const updateCategory = async (req, res) => {
  const { id, name } = req.body;
  const categories = await Category.find({
    $or: [{ _id: id }, { name: name }],
  });
  if (
    categories.length == 1 &&
    id.toString() === categories[0]._id.toString() &&
    name.toString() !== categories[0].name.toString()
  ) {
    const newCategory = await Category.updateOne(
      { _id: id },
      { $set: { name: name } }
    );
    if (!newCategory) {
      res.status(500).json({ error: "Server Error: Something went wrong." });
    } else {
      res.status(200).json({ message: "Status 200: Category updated." });
    }
  } else {
    const response = { error: "Bad Request: Category not exist" };
    if (
      categories.length == 1 &&
      id.toString() === categories[0]._id.toString() &&
      name.toString() === categories[0].name.toString()
    ) {
      response.error = `Bad Request: Please update with different name.`;
    } else if (
      categories.length == 1 &&
      id.toString() !== categories[0]._id.toString()
    ) {
      response.error = `Bad Request: You're tring to update a gategory that doesn't exist.`;
    } else {
      response.error = `Bad Request: Category ${name} already exist.`;
    }
    res.status(400).json(response);
  }
};
