import { model, Schema } from 'mongoose';

const musicaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
        minlength: [10, 'El titulo debe tener al menos 10 caracteres'],
        maxlength: [255, 'El titulo no puede tener más de 255 caracteres']
    },
    artista: {
        type: String,
        required: [true, 'El artista es obligatorio'],
        minlength: [10, 'El artista debe tener al menos 10 caracteres'],
        maxlength: [255, 'El artista no puede tener más de 255 caracteres']
    },

    genero: {
        type: String,
        required: [true, 'El género es obligatorio']
    },
    album: {
        type: String,
        required: [true, 'El album es obligatorio']
    }
});

const music = model('musica', musicaSchema);

export default music;