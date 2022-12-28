import { nextTick } from "process";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

async function createNewUser(req, res, next) {
    try {
        // How would we validate the input here?
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            },
        });
        // What information do we send in this token? is password also present?
        // We send `id`, `username`, and `iat`. That's becaus on `createJWT` we only return `id` and `username`
        const token = createJWT(user);
        res.json({ token });
    } catch (error) {
        error.type = "input"; // We are not handlding different types of errors, just blaming the user always
        next(error);
    }
}

async function signIn(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            // Wouldn't it be better to compare the id?
            username: req.body.username,
        }
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401)
            .json({ message: "Invalid credentials" });
        return;
    }

    const token = createJWT(user);
    res.json({ token });
}

export {
    createNewUser,
    signIn,
};