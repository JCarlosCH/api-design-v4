import prisma from "../db";

async function getUpdates(req, res) {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []);

    res.json({ data: updates });
}

async function getOneUpdate(req, res) {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    });

    res.json({ date: update });
}


async function createUpdate(req, res) {

    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if (!product) {
        // Does not belong to user
        return res.json({ message: "Product not found" });
    }

    const update = await prisma.update.create({
        data: req.body
    });

    res.json({ data: update });
}

async function updateUpdate(req, res) {
    const product = await prisma.product.findFirst({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: {
                where: {
                    id: req.params.id
                }
            }
        }
    });

    if (!product) {
        return res.json({ message: "Update not found." });
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });

    res.json({ data: updatedUpdate });
}

async function deleteUpdate(req, res) {
    const product = await prisma.product.findFirst({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: {
                where: {
                    id: req.params.id
                }
            }
        }
    });

    if (!product) {
        return res.json({ message: "Update not found." });
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: deleted });
}

export {
    getUpdates,
    getOneUpdate,
    createUpdate,
    updateUpdate,
    deleteUpdate
}