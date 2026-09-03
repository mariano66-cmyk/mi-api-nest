import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return '¡Hola mundo! Bienvenido a tu primera API.';
  }

  @Get('saludo/:nombre')
  getPersonalizado(@Param('nombre') nombre: string): string {
    return `¡Hola ${nombre}! NestJS reconoce quién eres.`;
  }
}