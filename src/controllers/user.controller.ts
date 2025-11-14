import prisma from "../config/prisma";

export const createUser = async (req: any, res: any) => {
	try {
		const { email, name, password } = req.body;

		if (!email || !name || !password) {
			return res
				.status(400)
				.json({ message: "Please provide all the fields" });
		}
		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = await prisma.user.create({
			data: {
				email,
				name,
				password,
			},
		});

		return res.status(201).json(user);
	} catch (error) {		return res.status(500).json({ message: "Error creating user" });
	}
};

export const getUsers = async (req: any, res: any) => {
	try {
		const users = await prisma.user.findMany();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ message: "Error getting users" });
	}
};

export const getUserById = async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: "Error getting user by id" });
	}
};

export const updateUser = async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const { name, email, password } = req.body;

		if (!id || !name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Please provide all the fields" });
		}

		const user = await prisma.user.update({
			where: {
				id: parseInt(id),
			},
			data: {
				name,
				email,
				password,
			},
		});

		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: "Error updating user" });
	}
};

export const deleteUser = async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.delete({
			where: {
				id: parseInt(id),
			},
		});
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: "Error deleting user" });
	}
};
