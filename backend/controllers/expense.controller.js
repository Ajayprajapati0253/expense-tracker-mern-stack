import { Expense } from '../models/expense.model.js'

/* ===================== ADD EXPENSE ===================== */
export const addExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;

        // ✅ userId comes from auth middleware
        const userId = req.id;

        if (!description || !amount || !category) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId // ✅ link expense to logged-in user
        });

        return res.status(201).json({
            message: "New Expense Added.",
            expense,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


/* ===================== GET ALL EXPENSE ===================== */
export const getAllExpense = async (req, res) => {
    try {
        const userId = req.id;
        let category = req.query.category || "";
        let done = req.query.done || "";

        // ✅ ALWAYS filter by logged-in user
        const query = { userId };

        // ✅ safer category handling
        if (category && category.toLowerCase() !== "all") {
            query.category = { $regex: category, $options: 'i' };
        }

        if (done === "done") {
            query.done = true;
        } else if (done === "undone") {
            query.done = false;
        }

        // ✅ sort latest first
        const expense = await Expense.find(query).sort({ createdAt: -1 });

        // ❌ DO NOT return 404 for new users
        // ✅ return empty array instead
        return res.status(200).json({
            expense,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


/* ===================== MARK DONE / UNDONE ===================== */
export const markAsDoneOrUndone = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { done } = req.body;
        const userId = req.id;

        // 🔐 SECURITY FIX:
        // Only update expense that belongs to logged-in user
        const expense = await Expense.findOneAndUpdate(
            { _id: expenseId, userId }, // ✅ ownership check
            { done },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found or unauthorized",
                success: false
            });
        }

        return res.status(200).json({
            message: `Expense marked as ${expense.done ? 'done' : 'undone'}`,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


/* ===================== REMOVE EXPENSE ===================== */
export const removeExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const userId = req.id;

        // 🔐 SECURITY FIX:
        // Prevent deleting other users' expenses
        const expense = await Expense.findOneAndDelete({
            _id: expenseId,
            userId
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found or unauthorized",
                success: false
            });
        }

        return res.status(200).json({
            message: "Expense removed",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


/* ===================== UPDATE EXPENSE ===================== */
export const updateExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const expenseId = req.params.id;
        const userId = req.id;

        // 🔐 SECURITY FIX:
        // Update only user's own expense
        const expense = await Expense.findOneAndUpdate(
            { _id: expenseId, userId },
            { description, amount, category },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found or unauthorized",
                success: false
            });
        }

        return res.status(200).json({
            message: "Expense Updated",
            expense,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};
