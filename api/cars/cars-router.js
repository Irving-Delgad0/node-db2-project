const Cars = require('./cars-model');
const router = require('express').Router();
const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware')

router.get('/', (req, res) => {
    Cars.getAll()
    .then(cars => {
        res.json(cars)
    })
})

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res) => {
    Cars.create(req.body)
    .then(car => {
        res.json(car)
    })
})

module.exports = router