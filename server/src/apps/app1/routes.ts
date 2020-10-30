import express = require('express');
import {DummyClass} from './models.js';

const router = express.Router();
const dummy = new DummyClass(1);

router.get('/', dummy.do());

export = router;