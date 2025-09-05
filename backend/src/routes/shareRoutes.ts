import express from "express";
import {shareBrain,getBrainByShareLink } from "../controllers/shareController";
import {auth} from "../middleware/authMiddleware";

const router =express();

router.get('./',auth,shareBrain);
router.get("/:shareLink",auth,getBrainByShareLink );