import { Request, Response } from 'express';
import validator from 'validator';

import { User } from '../entities/User';


export const createUser = async(req:Request,res:Response)=> {

  try {

    const { firstName, lastName, email} = req.body;
  
    const user = new User();

    if(!validator.isEmail(email)){
      return res.status(400).json({
        ok: false,
        message: 'Email no es valido'
      });
    }
    if(!validator.isLength(firstName, {min: 3, max: 35})){
      return res.status(400).json({
        ok: false,
        message: 'Nombre no es valido'
      });
    }

    if(!validator.isLength(lastName, {min: 3, max: 35})){
      return res.status(400).json({
        ok: false,
        message: 'Apellido no es valido'
      });
    }
      
    
    user.firstName = firstName;
    user.lastName = lastName;
    user.email =  email.toLowerCase();

    await user.save();
  
    return res.json(user);
    
  } catch (error) {
    if(error instanceof Error) {
      return res.status(500).json({msg:error.message ,erro:'error al crear usuario' });
    }
  }
}

export const getUsers = async(req:Request,res:Response)=> {

  try {
    
    const users = await User.find();
    return res.json(users);

  } catch (error) {
    if(error instanceof Error) {
      return res.status(500).json({msg:error.message ,erro:'error al obtener usuarios' });
    }
  }
}

export const updateUser = async(req:Request,res:Response)=> {

  try {
    
    const  { id }  = req.params;
    const { firstName, lastName } = req.body;
  
    const user = await User.findOneBy({id:Number(id)});
  
    if(!user) {
      return res.status(404).json({msg:'usuario no encontrado'});
    }
  
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
  
    // return res.json(user);
    return res.sendStatus(204); // se realizo correctamente pero no se devuelve nada
  
  } catch (error) {
    if(error instanceof Error) {
      return res.status(500).json({msg:error.message ,erro:'error al actualizar usuario' });
    }
  }

}

export const deleteUser = async(req:Request,res:Response)=> {
  try {
    
    const { id }  = req.params;

    const user = await User.findOneBy({id:Number(id)});

    if(!user) {
      return res.status(404).json({msg:'usuario no encontrado'});
    }

    const result = await User.delete({id:Number(id)});

    if (result.affected === 0) {
      return res.status(404).json({msg:'existio un error al eliminar el usuario'});
    }
      
    return res.sendStatus(204); // se realizo correctamente pero no se devuelve nada   
      
    

  } catch (error) {
    if(error instanceof Error){

      return res.status(500).json({msg:error.message ,erro:'error al eliminar usuario' });
    }
  }
}

export const getUser = async(req:Request,res:Response)=> {

  try {
    
    const user = await User.findOneBy({id:Number(req.params.id)});

    if(!user) {
      return res.status(404).json({msg:'usuario no encontrado'});
    }

    return res.json(user);

  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({msg:error.message ,erro:'error al obtener usuario' });
    }
  }

}