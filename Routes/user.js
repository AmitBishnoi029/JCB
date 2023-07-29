import express  from "express";
import formidable from "express-formidable";
import { BookBoth, BookOnlyJcb, BookOnlyTrolly, Combined_deshboard, OnlyJcb_deshBoard, OnlyTrolly_deshboard, getDashboard, getHistory } from "../controller/user.js";

const router = express.Router()

router.route("/bookOnlyJcb").post(BookOnlyJcb);
router.route("/bookOnlyTrolly").post(BookOnlyTrolly);
router.route("/bookBoth").post(BookBoth);
router.route("/getHistory/:id").get(getHistory);

//Dashboard routes
router.route("/getDashboard").get(getDashboard);
router.route("/OnlyJcb_deshBoard").post(OnlyJcb_deshBoard);
router.route("/OnlyTrolly_deshboard").post(OnlyTrolly_deshboard);
router.route("/Combined_deshboard").post(Combined_deshboard);



export default router