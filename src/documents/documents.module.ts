import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentsScanModule } from './scan/documents-scan.module';
import { DocumentScanProcessor } from './scan/document-scan.processor';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, DocumentsScanModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentScanProcessor],
  exports: [DocumentsService],
})
export class DocumentsModule {}
