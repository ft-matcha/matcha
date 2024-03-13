import relationControllers from '../controllers/relation-controllers';
import roomControllers from '../controllers/room-controllers';
import alertControllers from '../controllers/alert-controllers';
import { Request, Response } from 'express';
const requestFriend = async (req: Request, res: Response) => {
    try {
        if (req.id === undefined) {
            res.status(400).json({ success: false, error: { message: 'Invalid id' } });
            return;
        }
        const response: any = await relationControllers.getRelation({ from: req.id, to: req.body.id });
        const alert = await alertControllers.createAlert(req.id, req.body.id, 'request');
        if (response === undefined) {
            const create = await relationControllers.createRelation(req.id, req.body.id, 'FRIEND');
        } else {
            const update = await relationControllers.updateRelation(response.relationId, 'FRIEND');
        }
        const relation = await relationControllers.getRelation(
            { from: req.body.id, to: req.id, duplex: true },
            'FRIEND'
        );
        if (relation) {
            await roomControllers.create(req.id, req.body.id);
        }
        res.status(201).json({ success: true });
    } catch (error: any) {
        console.error('requestFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'requestFriend failed : server error' } });
    }
};

const acceptFriend = async (req: Request, res: Response) => {
    try {
        if (req.id === undefined) {
            res.status(400).json({ success: false, error: { message: 'Invalid id' } });
            return;
        }
        const response: any = await relationControllers.getRelation({ from: req.id, to: req.body.id });
        const alert = await alertControllers.createAlert(req.id, req.body.id, 'request');
        if (response === undefined) {
            const create = await relationControllers.createRelation(req.id, req.body.id, 'FRIEND');
        } else {
            const update = await relationControllers.updateRelation(response.id, 'FRIEND');
        }
        const relation = await relationControllers.getRelation(
            { from: req.body.id, to: req.id, duplex: true },
            'FRIEND'
        );
        if (relation) {
            await roomControllers.create(req.id, req.body.id);
        }

        res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('acceptFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'acceptFriend failed : server error' } });
    }
};

const getFriend = async (req: Request, res: Response) => {
    try {
        const response = await relationControllers.getRelation({ from: req.id, duplex: true }, 'FRIEND');
        const friendList = response.map((relation: any) => {
            return relation.id;
        });
        res.status(200).json({ success: true, data: friendList });
    } catch (error: any) {
        console.error('getFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getFriend failed : server error' } });
    }
};

const hateUser = async (req: Request, res: Response) => {
    try {
        if (req.id === undefined) {
            res.status(400).json({ success: false, error: { message: 'Invalid id' } });
            return;
        }
        const relation = await relationControllers.getRelation({
            from: req.id,
            to: req.body.id,
        });
        if (relation === undefined) {
            await relationControllers.createRelation(req.id, req.body.id, 'HATE');
        } else {
            await relationControllers.updateRelation(relation.relationId, 'HATE');
        }
        res.status(201).json({ success: true });
    } catch (error: any) {
        console.error('hateUser failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'hateUser failed : server error' } });
    }
};

export default {
    requestFriend,
    acceptFriend,
    getFriend,
    hateUser,
};
