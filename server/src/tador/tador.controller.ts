import { Controller, Get } from '@nestjs/common';
import { TadorService } from './tador.service';
import { ReqUser } from '../decorators/user.decorator';
import { User } from 'shared/models';
import { Panel } from 'shared/models/tador/tador.model';

@Controller('tador')
export class TadorController {
    constructor(private service: TadorService) {}

    @Get('initialData')
    async initialData(@ReqUser() user: User): Promise<Panel[]> {
        return this.service.panelRepo.findMany({ userId: user.id });
    }
}
