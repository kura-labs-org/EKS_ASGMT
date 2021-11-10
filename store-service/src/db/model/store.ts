import mongoose from 'mongoose';
// An interface that describes the properties
// that are requried to create a new User
interface StoreAttrs {
    chefName: string;
    bio: string;
    careerHighlights: string;
    address: string;
    location: string;
    operatingHours: string;
    website: string;
}
  
// An interface that describes the properties
// that a User Model has
interface StoreModel extends mongoose.Model<StoreDoc> {
    build(attrs: StoreAttrs): StoreDoc;
}

interface StoreDoc extends mongoose.Document {
    chefName: string;
    bio: string;
    careerHighlights: string;
    address: string;
    location: string;
    operatingHours: string;
    website: string;
}
  
const storeSchema = new mongoose.Schema({
    chefName: {
        type: String,
        required: true
      },
    bio: {
        type: String,
        required: true,
        maxlength: 250
    },
    careerHighlights: {
        type: String
    },
    address: { type: String },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: { type: String },
      street: { type: String },
      city: { type: String },
      state: {
        type: String
      },
      zipcode: { type: Number },
      Country: { type: String }
    },
    operatingHours: {
      type: String
    },
    website: {
      type: String
    }
});

storeSchema.pre<StoreDoc>('save', async function (next) {
    const geoloc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [geoloc[0].longitude, geoloc[0].latitude],
      formattedAddress: geoloc[0].formattedAddress,
      street: geoloc[0].streetName,
      city: geoloc[0].city,
      state: geoloc[0].state,
      zipcode: geoloc[0].zipcode,
      country: geoloc[0].country
    };
  
    this.address = undefined;
    next();
});
  
storeSchema.statics.build = (attrs: StoreAttrs) => {
    return new Store(attrs);
};
  

const Store = mongoose.model<StoreDoc, StoreModel>('Store', storeSchema);
  
export { Store };
