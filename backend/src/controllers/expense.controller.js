import Expense from "../models/expense.model.js";

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.status(200).json(expenses);
};

export const postExpense = async (req, res) => {
  const { name, amount, notes, categoryId, userId } = req.body;
  //   const expenses = await Expense.find();
  if (!name || !amount || !notes || !categoryId) {
    res.status(400).json({
      error: "Some fields are empty.",
    });
  } else {
    const expenseData = {
      name,
      amount,
      notes,
      category: categoryId,
      owner: userId,
    };
    const newExpense = await Expense.create(expenseData);
    if (newExpense) {
      res.status(201).json({
        message: "Status Code 201: New expense created.",
        ...newExpense._doc,
      });
    } else {
      res.status(500).json({
        error: "Server Error 500: Something went wrong.",
      });
    }
  }
};

export const updateExpense = async (req, res) => {
  const { id, name, amount, notes } = req.body;
  const updatedExpense = await Expense.updateOne(
    { _id: id },
    { $set: { name: name, amount: amount, notes: notes } }
  );

  if (updatedExpense) {
    res.status(200).json({ message: "Status 200: Expense updated." });
  } else {
    res.status(500).json({ error: "Server Error 500: Something went wrong." });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.body;
  const deletedExpense = await Expense.deleteOne({ _id: id });

  if (deletedExpense) {
    res.status(200).json({ message: "Status 200: Expense Deleted." });
  } else {
    res.status(500).json({ error: "Server Error 500: Something went wrong." });
  }
};
