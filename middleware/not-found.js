const notFound = (req, res) => {
    res.status(404).send(`${req.originalUrl} does not exist 👻`)
}
module.exports = notFound
