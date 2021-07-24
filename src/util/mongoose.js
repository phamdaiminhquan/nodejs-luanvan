module.exports = {
    multipleMongooseToOject: function(mongooses){
        return mongooses.map(mongooses => mongooses.toObject())
    },
    mongooseToOject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose
    }
}