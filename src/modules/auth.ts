import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const {
    JWT_SECRET,
    "SALT_ROUNDS": saltRounds
} = process.env;

function comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
}

function hashPassword(password) {
    return bcrypt.hash(password, Number(saltRounds));
}

function createJWT(user) {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
        JWT_SECRET
    );
    return token;
}

function protect(req, res, next) {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401)
            .json({ message: "Not authorized" });
        return;
    }

    const [token] = /(?<=^Bearer )(\S*)$/.exec(bearer);

    if (!token) {
        res.status(401)
            .json({ message: "Invalid token" });
        return;
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next()
    } catch (error) {
        console.error({ error });
        res.status(401)
            .json({ message: "Invalid token" });
        return
    }
}
export {
    comparePasswords,
    createJWT,
    hashPassword,
    protect
};
