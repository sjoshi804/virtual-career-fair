import express = require('express');
import {DummyClass} from './class.js';

const router = express.Router();
const dummy = new DummyClass(1);

router.get('/', dummy.do());

export = router;
