const notFoundHandler = (req, res) => {
    res.status(404).render('404.ejs')
}

const errorHandler = (error, req, res, next) => {
    res.status(500).send(`Error: ${error}`)
    console.log(error)
}

module.exports = {
    notFoundHandler,
    errorHandler
}