"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const validator_1 = __importDefault(require("validator"));
const User_1 = require("../entities/User");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email } = req.body;
        const user = new User_1.User();
        if (!validator_1.default.isEmail(email)) {
            return res.status(400).json({
                ok: false,
                message: 'Email no es valido'
            });
        }
        if (!validator_1.default.isLength(firstName, { min: 3, max: 35 })) {
            return res.status(400).json({
                ok: false,
                message: 'Nombre no es valido'
            });
        }
        if (!validator_1.default.isLength(lastName, { min: 3, max: 35 })) {
            return res.status(400).json({
                ok: false,
                message: 'Apellido no es valido'
            });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email.toLowerCase();
        yield user.save();
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ msg: error.message, erro: 'error al crear usuario' });
        }
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        return res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ msg: error.message, erro: 'error al obtener usuarios' });
        }
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName } = req.body;
        const user = yield User_1.User.findOneBy({ id: Number(id) });
        if (!user) {
            return res.status(404).json({ msg: 'usuario no encontrado' });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        yield user.save();
        // return res.json(user);
        return res.sendStatus(204); // se realizo correctamente pero no se devuelve nada
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ msg: error.message, erro: 'error al actualizar usuario' });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.findOneBy({ id: Number(id) });
        if (!user) {
            return res.status(404).json({ msg: 'usuario no encontrado' });
        }
        const result = yield User_1.User.delete({ id: Number(id) });
        if (result.affected === 0) {
            return res.status(404).json({ msg: 'existio un error al eliminar el usuario' });
        }
        return res.sendStatus(204); // se realizo correctamente pero no se devuelve nada   
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ msg: error.message, erro: 'error al eliminar usuario' });
        }
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOneBy({ id: Number(req.params.id) });
        if (!user) {
            return res.status(404).json({ msg: 'usuario no encontrado' });
        }
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ msg: error.message, erro: 'error al obtener usuario' });
        }
    }
});
exports.getUser = getUser;
