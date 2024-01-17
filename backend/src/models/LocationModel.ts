import { model, Schema } from 'mongoose';
import { ILocation } from '../types';

const LocationSchema: Schema = new Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
    }
);

LocationSchema.pre('save', function(next) {
    this.updated_at = new Date;
    next();
});

export default model<ILocation>('users', LocationSchema)