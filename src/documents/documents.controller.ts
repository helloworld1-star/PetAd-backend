import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { DocumentsService } from './documents.service';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(':id/download')
  async downloadDocument(
    @Param('id') id: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user = req.user;
    const document = await this.documentsService.getDocumentForDownload(
      id,
      user.sub || user.userId,
      user.role,
    );

    const filePath = path.join(process.cwd(), 'uploads', `${document.id}-${document.fileName}`);
    if (fs.existsSync(filePath)) {
      return res.download(filePath, document.fileName);
    }

    throw new NotFoundException('File binary not found on server');
  }
}
