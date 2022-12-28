import { validationResult } from "express-validator";

function handleInputErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400)
            .json({ errors: errors.array() });
    } else {
        next();
    }

}

export {
    handleInputErrors
};
