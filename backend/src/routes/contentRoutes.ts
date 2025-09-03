import express from "express";
import {getContent , addContent,deleteContent} from "../controllers/shareController";

const router =express();

router.get('./',auth,getContent);
router.post('./',auth,addContent);
router.delete('./:id',auth,deleteContent);
