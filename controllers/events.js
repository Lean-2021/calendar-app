import {response,request} from 'express';
import {Event} from '../models/index.js';


export const getEvents= async(req,res = response)=>{
    
    try {
        const events = await Event.find().populate('user','name');
  
        res.status(200).json({
            ok:true,
            events,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    };
};

export const createEvent= async(req = request ,res = response)=>{

    const event = new Event(req.body);
    
    try {
        event.user = req.uid;
        const eventSave = await event.save();
      
        res.status(200).json({
            ok:true,
            eventSave,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    };
};

export const updateEvent= async(req= request ,res = response)=>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:`No existe un evento con el id ${eventId}`
            })
        };

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para editar este evento'
            })
        };

        const newEvent = {
            ...req.body,
            user:uid,
        };

        const eventUpdate = await Event.findByIdAndUpdate(eventId,newEvent,{new:true});

        res.status(200).json({
            ok:true,
            event:eventUpdate,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    };
};

export const deleteEvent= async(req,res = response)=>{

    const eventId = req.params.id;

    try {
        
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:`No existe un evento con el id ${eventId}`
            })
        };

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para editar este evento'
            })
        };

        const eventDelete = await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok:true,
            msg:'Evento eliminado correctamente',
            event:eventDelete,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
};