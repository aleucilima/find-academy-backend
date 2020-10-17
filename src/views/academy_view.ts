import Academy from '../models/Academy'
import imagesView from './images_view'

export default {
    render(academy: Academy) {
        return {
            id: academy.id,
            name: academy.name,
            latitude: academy.latitude,
            longitude: academy.longitude,
            about: academy.about,
            instructions: academy.instructions,
            opening_hours: academy.opening_hours,
            open_on_weekends: academy.open_on_weekends,
            images: imagesView.renderMany(academy.images)
        }
    },

    renderMany(academys: Academy[]){
        return academys.map(academy => this.render(academy))
    }
}