import relationControllers from '../controllers/relation-controllers';
import alertControllers from '../controllers/alert-controllers';
const requestFriend = async (req: any, res: any) => {
    try {
        const response: any = await relationControllers.getRelation({ from: req.id, to: req.body.id });
        const alert = await alertControllers.createAlert(req.id, req.body.id, 'request');
        if (response === undefined) {
            const create = await relationControllers.createRelation(req.id, req.body.id, 'FRIEND');
            res.status(201).json({ success: true, data: create });
        } else {
            const update = await relationControllers.updateRelation(response.relationId, 'FRIEND');
            res.status(201).json({ success: true, data: update });
        }
    } catch (error: any) {
        console.error('requestFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'requestFriend failed : server error' } });
    }
};

const acceptFriend = async (req: any, res: any) => {
    try {
        const response: any = await relationControllers.getRelation({ from: req.id, to: req.body.id });
        if (response === undefined) {
            const create = await relationControllers.createRelation(req.id, req.body.id, 'FRIEND');
        } else {
            const update = await relationControllers.updateRelation(response.id, 'FRIEND');
        }
        res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('acceptFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'acceptFriend failed : server error' } });
    }
};

const getFriend = async (req: any, res: any) => {
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

const hateUser = async (req: any, res: any) => {
    try {
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
