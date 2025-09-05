import express from "express";
import {search} from "../controllers/searchController";
import {auth} from "../middleware/authMiddleware";

const router = express();
router.get('./',auth,search);

export default router;
