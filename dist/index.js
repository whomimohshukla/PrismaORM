"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
async function main() {
    // Create User
    await prisma.user.create({
        data: { email: "test@gmail.com", name: "Mimoh" }
    });
    // Create Post
    await prisma.post.create({
        data: {
            title: "Hello Post",
            content: "Demo",
            authorId: 1
        }
    });
    // Read Users
    console.log(await prisma.user.findMany());
    // Update User
    await prisma.user.update({
        where: { id: 1 },
        data: { name: "Updated Name" }
    });
    // Delete Post
    await prisma.post.delete({ where: { id: 1 } });
}
main()
    .then(() => prisma.$disconnect())
    .catch(e => {
    console.error(e);
    return prisma.$disconnect();
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map