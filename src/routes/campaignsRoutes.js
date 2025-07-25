import express from 'express';
import { getCampaigns, getCampaign, addCampaign, updateCampaign, deleteCampaign } from '../controller/campaignsController.js';


const campaignsRouter = express.Router();



campaignsRouter.get('/campaigns', getCampaigns);
campaignsRouter.get('/campaigns/:id', getCampaign);
campaignsRouter.post('/campaigns', addCampaign);
campaignsRouter.put('/campaigns/:id', updateCampaign);
campaignsRouter.delete('/campaigns/:id', deleteCampaign);

export default campaignsRouter;