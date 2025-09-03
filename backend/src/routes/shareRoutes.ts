import express from "express";
import {getContent,shareContent} from "../controllers/shareController";
import {auth} from "../middleware/authMiddleware";