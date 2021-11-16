import mongoose from 'mongoose';
// An interface that describes the properties
// that are requried to create a new User
interface MealAttrs {
  dishName: string;
  price: string;
  Description: string;
  userId: string;
  storeId: string;
}
  
// An interface that describes the properties
// that a User Model has
interface MealModel extends mongoose.Model<MealDoc> {
    build(attrs: MealAttrs): MealDoc;
}

interface MealDoc extends mongoose.Document {
    dishName: string;
    price: string;
    Description: string;
    storeId: string;
}
  
const mealSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  Description: {
    type: String,
    trim: true
  },
  storeId: {
    type: String,
    required: true
  }
});

  
mealSchema.statics.build = (attrs: MealAttrs) => {
    return new Meal(attrs);
};
  

const Meal = mongoose.model<MealDoc, MealModel>('Meal', mealSchema);
  
export { Meal };
