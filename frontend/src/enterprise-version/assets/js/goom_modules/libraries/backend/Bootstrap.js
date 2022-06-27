'use strict';
import AdminController from "./controllers/AdminController"
import MenuRenderer from '../core/MenuTemplate';

const objData = {
 Menu: new MenuRenderer(),
 AdminRunner: new AdminController(),
 
};
export default objData;
