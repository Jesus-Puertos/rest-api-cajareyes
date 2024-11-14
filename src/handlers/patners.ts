import { Request, Response } from "express";
import Patner from "../models/Patner.model";


export const getPatners = async  (req: Request, res: Response) => {
    try {
        const patners = await Patner.findAll({
           order: [
                ['numero_socio', 'ASC']
            ],
            attributes: {exclude:['createdAt', 'updatedAt']}
        });
        res.json({ data: patners });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los socios' });
    }
}

export const getPatnersById = async  (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const patner = await Patner.findByPk(id);
        if(!patner){
            res.status(404).json({ error: 'Socio no encontrado' });
            return;
        }

        res.json({ data: patner });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el socio' });
    }
}



export const createPatner = async (req: Request, res: Response): Promise<void> => {
 
    try {
        const patner = await Patner.create(req.body);
        res.status(201).json({ data: patner });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el socio' });
    }
};


export const updatePatner = async (req: Request, res:Response) => {
    const {id} = req.params
    const patner = await Patner.findByPk(id);
    if(!patner){
        res.status(404).json({ error: 'Socio no encontrado' });
        return;
    }

    //Actualizar el socio
    await patner.update(req.body);
    await patner.save();

    res.json({ data: patner });
}


export const updatePatnerName = async (req: Request, res:Response) => {
    const {id} = req.params
    const patner = await Patner.findByPk(id);
    if(!patner){
        res.status(404).json({ error: 'Socio no encontrado' });
        return;
    }

    //Actualizar el socio
    patner.nombre = req.body.nombre;
    await patner.save();

    res.json({ data: patner });
}


export const deletePatner = async (req: Request, res:Response) => {
    const {id} = req.params
    const patner = await Patner.findByPk(id);
    if(!patner){
        res.status(404).json({ error: 'Socio no encontrado' });
        return;
    }

    await patner.destroy();

    res.json({ data: patner });

}