const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
  .then(car => {
    if(car){
      req.car = car
      next()
    } else { 
        res.status(404).json({message: `car with id ${req.params.id} is not found`})
        return;
    }
  })
}


const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body;
  if (vin == null) {
    res.status(400).json({ message: "vin is missing" })
    return
  }
  if (make == null) {
    res.status(400).json({ message: "make is missing" })
    return
  }
  if (model == null) {
    res.status(400).json({ message: "model is missing" })
    return 
  }
  if (mileage == null || typeof(parseInt(mileage)) != 'number') {
    res.status(400).json({ message: "mileage is missing" })
    return
  }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  var isValid = vinValidator.validate(req.body.vin)
  if(!isValid){
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
    return
  }
  next()
}

const checkVinNumberUnique = (req, res, next) => {
  const {vin} = req.body
  Cars.findByValue('vin', vin)
  .then(result => {
    if(result.length > 0){
      res.status(400).json({message: `vin ${vin} already exists`})
      return
    }
    next()
  })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid, 
  checkVinNumberUnique
}