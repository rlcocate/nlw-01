import { Request, Response } from 'express';
import knex from '../database/connection';

class PointController {

    async index(request: Request, response: Response) {
        // city, uf, items: Query Params
        const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('point')
            .join('point_item', 'point_item.point_id', '=', 'point.id')
            .whereIn('point_item.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('point.*')

        if (!points) {
            response.status(400).json({ message: 'Nenhum ponto de coleta localizado com estes filtros...' });
        }

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://localhost:3333/uploads/${point.image}`
            }
        });

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const point = await knex('point').where('id', id).first();
        if (!point) {
            response.status(400).json({ message: 'Ponto de Coleta não localizado!' });
        }
        const items = await knex('item')
            .join('point_item', 'point_item.item_id', '=', 'item.id')
            .where('point_item.point_id', id)
            .select('item.title');

        const serializedPoint = {
            ...point,
            image_url: `http://localhost:3333/uploads/${point.image}`
        };

        response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            longitude,
            latitude,
            city,
            uf,
            items
        } = request.body;

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            longitude,
            latitude,
            city,
            uf
        };

        const trx = await knex.transaction()

        const insertedIds = await trx('point').insert(point);

        const pointId = insertedIds[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((itemId: number) => {
                return {
                    point_id: pointId,
                    item_id: itemId
                };
            })

        await trx('point_item').insert(pointItems);

        await trx.commit();

        const serializedPoint = {
            pointId,
            ...point,
            image_url: `http://localhost:3333/uploads/${point.image}`
        };

        return response.json(serializedPoint);
    }

}

export default PointController;