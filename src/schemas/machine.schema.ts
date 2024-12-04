import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MachineDocument = Machine & Document;

@Schema()
export class Machine {
  @Prop({ required: true })
  plate!: string; // Identificador único, puede ser la patente o equivalente.

  @Prop({ required: true, enum: ['Car', 'Truck', 'Motorcycle', 'Bus', 'Bicycle', 'Tractor', 'Excavator', 'Forklift', 'Drone'] })
  type!: 'Car' | 'Truck' | 'Motorcycle' | 'Bus' | 'Bicycle' | 'Tractor' | 'Excavator' | 'Forklift' | 'Drone';

  @Prop({ required: true })
  brand!: string; // Marca del vehículo o máquina, por ejemplo, "Toyota", "Caterpillar".

  @Prop({ required: true })
  model!: string; // Modelo específico, por ejemplo, "Corolla", "320D".

  @Prop()
  year?: number; // Año de fabricación, opcional.

  @Prop()
  description?: string; // Descripción opcional para detalles adicionales.

  @Prop()
  capacity?: string; // Capacidad de carga, pasajeros, etc. Ejemplo: "1 Ton", "5 Personas".

  @Prop()
  status?: string; // Estado actual, por ejemplo: "Active", "Inactive", "Under Maintenance".
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
