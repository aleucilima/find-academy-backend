import { Request, Response} from 'express'
import { getRepository } from 'typeorm'
import Academy from '../models/Academy'
import academyView from '../views/academy_view'
import * as Yup from 'yup'

export default {
    async index(req: Request, res: Response){
        const academyRepository = getRepository(Academy)

        const academys = await academyRepository.find({
            relations: ['images']
        })

        return res.json(academyView.renderMany(academys))
    },
    async show(req: Request, res: Response){
        const { id } = req.params

        const academyRepository = getRepository(Academy)

        const academy = await academyRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(academyView.render(academy))
    },

    async create(req: Request, res: Response){
       
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body
    
        const academyRepository = getRepository(Academy)
    
        const requestImages = req.files as Express.Multer.File[]
        
        const images = requestImages.map(image => {
            return { path: image.filename}
        })

        const data = { 
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required('Latitude obrigatória'),
            longitude: Yup.number().required('Longitude obrigatória'),
            about: Yup.string().required('Campo obrigatório').max(300),
            instructions: Yup.string().required('Campo obrigatório'),
            opening_hours: Yup.string().required('Horário obrigatório'),
            open_on_weekends: Yup.boolean().required('Campo obrigatório'),
            images: Yup. array(
                Yup.object().shape({
                    path: Yup.string().required('Imagem obrigatória')
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const academy = academyRepository.create(data)
    
        await academyRepository.save(academy)
    
        return res.status(201).json(academy)
    }
}