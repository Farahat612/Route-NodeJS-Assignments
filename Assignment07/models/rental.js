import mongoose from 'mongoose'

const rentalSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  rentalDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
})

const Rental = mongoose.model('Rental', rentalSchema)

export default Rental
